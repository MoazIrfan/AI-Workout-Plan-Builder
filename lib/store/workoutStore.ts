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
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'workout-plan-storage', // localStorage key name
      // Only persist the plan and prompt, not the loading state
      partialPersist: {
        currentPlan: true,
        currentPrompt: true,
        isGenerating: false, // Never persist loading state
      },
    }
  )
)