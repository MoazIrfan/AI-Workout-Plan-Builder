'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useWorkoutStore } from '@/lib/store/workoutStore'
import { WorkoutPlan } from '@/lib/schemas'

export default function PromptPage() {
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { setPlan, setGenerating, clearPlan } = useWorkoutStore()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      toast.error('Please enter a workout plan description')
      return
    }
    
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    // Clear any old plan data and set generating state to true
    clearPlan()
    setGenerating(true)
    
    // Navigate to the plan page to show skeleton
    router.push('/plan')
    
    // Make the API call
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      
      const data = await response.json()
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate workout plan')
      }
      
      const plan: WorkoutPlan = data.data
      
      // Save the plan to Zustand
      setPlan(plan, prompt)
      
      toast.success('Workout plan generated successfully!')
      
    } catch (error) {
      console.error(error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to generate workout plan. Please try again.'
      toast.error(errorMessage)
      
      // On error, clear the generating state and navigate back
      setGenerating(false)
      router.push('/')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">
            Smarter training starts here
          </h1>
          <p className="text-lg md:text-lg text-gray-600">
            Chat with AI to build custom fitness plans
          </p>
        </div>
        

        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-white rounded-lg shadow-sm border px-2 py-3">
            <Textarea
              placeholder="Describe what we are building today ..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] text-base resize-y focus-visible:ring-0 focus-visible:border-input"
              disabled={isSubmitting}
            />
            
            <div className="flex justify-end mt-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {prompt.length}/1000
                </span>

                <Button
                  type="submit"
                  disabled={isSubmitting || !prompt.trim()}
                  className="rounded-full w-12 h-12 p-0 bg-indigo-500"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isSubmitting ? 'opacity-50' : ''}
                  >
                    <path
                      d="M3 11.5L21 3L13 21L11 13L3 11.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>

          </div>
        </form>


      </div>
    </div>
  )
}