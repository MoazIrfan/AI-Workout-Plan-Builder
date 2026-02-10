'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWorkoutStore } from '@/lib/store/workoutStore'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { WorkoutPlanSkeleton } from '@/components/ui/WorkoutPlanSkeleton'

export default function PlanPage() {
  const router = useRouter()
  const { currentPlan, isGenerating, clearPlan } = useWorkoutStore()
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  useEffect(() => {
    // Only redirect if we're hydrated, not generating, and there's no plan
    if (isHydrated && !isGenerating && !currentPlan) {
      router.push('/')
    }
  }, [isHydrated, isGenerating, currentPlan, router])
  
  // Show skeleton while hydrating, generating, or if no plan exists yet
  if (!isHydrated || isGenerating || !currentPlan) {
    return <WorkoutPlanSkeleton />
  }
  
  const currentWeekData = currentPlan.weeks.find(w => w.weekNumber === selectedWeek)
  
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-start relative">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <img 
              src="/logo.png" 
              alt="Maxed Logo" 
              className="h-10 absolute left-1/2 -translate-x-1/2" 
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Week Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {currentPlan.weeks.map((week) => (
            <Button
              
              key={week.weekNumber}
              variant={selectedWeek === week.weekNumber ? 'default' : 'outline'}
              onClick={() => setSelectedWeek(week.weekNumber)}
              className={
                selectedWeek === week.weekNumber
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                  : 'bg-transparent hover:bg-gray-100'
              }
            >
              Week {week.weekNumber}
            </Button>
          ))}
        </div>
        
        {/* Days */}
        {currentWeekData?.days.map((day) => (
          <div key={day.dayNumber} className="mb-6">
            <div className={`px-4 py-3 rounded-md mb-2 ${day.isRestDay ? 'bg-gray-200' : 'bg-indigo-200'}`}>
              <h2 className="font-semibold">
                Day {day.dayNumber} - {day.isRestDay ? 'Rest' : day.dayName}
              </h2>
            </div>
            
            {!day.isRestDay && (
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Circuits
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Exercise
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Sets
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Reps
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Notes
                      </th>
                      <th className="px-4 py-3 w-20"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.circuits?.map((circuit, index) => (
                      <tr key={index} className="bg-white border-gray-50 border-6 rounded-bl-md rounded-br-md">
                        <td className="px-4 py-3 text-sm font-medium">
                          {circuit.circuitLetter}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {circuit.exercise}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {circuit.sets}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {circuit.reps}
                        </td>
                        <td className="px-4 py-3 text-sm italic text-gray-600">
                          {circuit.notes}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  )
}