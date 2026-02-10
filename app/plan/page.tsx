'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWorkoutStore } from '@/lib/store/workoutStore'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { WorkoutPlanSkeleton } from '@/components/ui/WorkoutPlanSkeleton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function PlanPage() {
  const router = useRouter()
  const { currentPlan, isGenerating, clearPlan, deleteCircuit } = useWorkoutStore()
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [circuitToDelete, setCircuitToDelete] = useState<{
    weekNumber: number
    dayNumber: number
    index: number
  } | null>(null)
  
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  useEffect(() => {
    if (isHydrated && !isGenerating && !currentPlan) {
      router.push('/')
    }
  }, [isHydrated, isGenerating, currentPlan, router])
  
  if (!isHydrated || isGenerating || !currentPlan) {
    return <WorkoutPlanSkeleton />
  }
  
  const currentWeekData = currentPlan.weeks.find(w => w.weekNumber === selectedWeek)
  
  const handleDeleteClick = (weekNumber: number, dayNumber: number, index: number) => {
    setCircuitToDelete({ weekNumber, dayNumber, index })
    setDeleteDialogOpen(true)
  }
  
  const handleConfirmDelete = () => {
    if (circuitToDelete) {
      deleteCircuit(circuitToDelete.weekNumber, circuitToDelete.dayNumber, circuitToDelete.index)
      setDeleteDialogOpen(false)
      setCircuitToDelete(null)
    }
  }
  
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
              <h2 className="font-medium">
                Day {day.dayNumber} - {day.isRestDay ? 'Rest' : day.dayName}
              </h2>
            </div>
            
            {!day.isRestDay && (
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left text-sm font-normal text-gray-600">
                        Circuits
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-normal text-gray-600">
                        Exercise
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-normal text-gray-600">
                        Sets
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-normal text-gray-600">
                        Reps
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-normal text-gray-600">
                        Notes
                      </th>
                      <th className="px-4 py-3 w-20"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.circuits?.map((circuit, index) => (
                      <tr key={index} className="bg-white border-gray-50 border-6">
                        <td className="px-4 py-3 text-sm border border-gray-50">
                          {circuit.circuitLetter}
                        </td>
                        <td className="px-4 py-3 text-sm border border-gray-50">
                          {circuit.exercise}
                        </td>
                        <td className="px-4 py-3 text-sm border border-gray-50">
                          {circuit.sets}
                        </td>
                        <td className="px-4 py-3 text-sm border border-gray-50">
                          {circuit.reps}
                        </td>
                        <td className="px-4 py-3 text-sm italic text-gray-600 border border-gray-50">
                          {circuit.notes}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteClick(selectedWeek, day.dayNumber, index)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete exercise"
                            >
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
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Exercise</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this exercise?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}