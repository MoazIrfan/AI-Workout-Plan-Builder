import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WorkoutPlan } from '../schemas'

interface WorkoutStore {
  currentPlan: WorkoutPlan | null
  currentPrompt: string | null
  isGenerating: boolean
  
  setPlan: (plan: WorkoutPlan, prompt: string) => void
  clearPlan: () => void
  setGenerating: (isGenerating: boolean) => void
  deleteCircuit: (weekNumber: number, dayNumber: number, circuitIndex: number) => void
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      currentPlan: null,
      currentPrompt: null,
      isGenerating: false,
      
      setPlan: (plan, prompt) => set({ 
        currentPlan: plan, 
        currentPrompt: prompt,
        isGenerating: false 
      }),
      
      clearPlan: () => set({ 
        currentPlan: null, 
        currentPrompt: null,
        isGenerating: false 
      }),
      
      setGenerating: (isGenerating) => set({ isGenerating }),
      
      deleteCircuit: (weekNumber, dayNumber, circuitIndex) => {
        const currentPlan = get().currentPlan
        if (!currentPlan) return
        
        const updatedPlan = {
          ...currentPlan,
          weeks: currentPlan.weeks.map(week => 
            week.weekNumber === weekNumber
              ? {
                  ...week,
                  days: week.days.map(day =>
                    day.dayNumber === dayNumber
                      ? {
                          ...day,
                          circuits: day.circuits?.filter((_, idx) => idx !== circuitIndex),
                        }
                      : day
                  ),
                }
              : week
          ),
        }
        
        set({ currentPlan: updatedPlan })
      },
    }),
    {
      name: 'workout-plan-storage',
    }
  )
)