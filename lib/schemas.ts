import { z } from 'zod'

export const circuitSchema = z.object({
  circuitLetter: z.string(),
  exercise: z.string(),
  sets: z.number(),
  reps: z.string(),
  notes: z.string(),
})

export const daySchema = z.object({
  dayNumber: z.number(),
  dayName: z.string(),
  isRestDay: z.boolean(),
  circuits: z.array(circuitSchema).optional(),
})

export const weekSchema = z.object({
  weekNumber: z.number(),
  days: z.array(daySchema),
})

export const workoutPlanSchema = z.object({
  programName: z.string(),
  programDescription: z.string(),
  weeks: z.array(weekSchema),
})

export type Circuit = z.infer<typeof circuitSchema>
export type Day = z.infer<typeof daySchema>
export type Week = z.infer<typeof weekSchema>
export type WorkoutPlan = z.infer<typeof workoutPlanSchema>