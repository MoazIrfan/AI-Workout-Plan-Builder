import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { workoutPlanSchema, WorkoutPlan } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

// Extract week count from the user's prompt If they mention a number of weeks, we use that. Otherwise, default to 2.
function getWeekCount(prompt: string): number {
  const lowerPrompt = prompt.toLowerCase()
  
  // Look for patterns like "4 week", "4-week", or "four week"
  const match = lowerPrompt.match(/(\d+)[\s-]?week/)
  if (match) {
    const weeks = parseInt(match[1])
    return Math.min(weeks, 12) // Cap at 12 weeks maximum
  }
  
  return 2
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body
    
    // Validate the incoming prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required and must be a non-empty string' },
        { status: 400 }
      )
    }
    
    // Figure out how many weeks to generate
    const weekCount = getWeekCount(prompt)
    
    // Set up the parser with our Zod schema
    const parser = StructuredOutputParser.fromZodSchema(workoutPlanSchema)
    const formatInstructions = parser.getFormatInstructions()
    
    // Create a simple, clear prompt template
    const promptTemplate = new PromptTemplate({
      template: `Create a {weekCount}-week workout program based on this request: {userPrompt}

    Generate a complete program with:
    - Exactly {weekCount} weeks
    - 3-7 days per week with rest days where appropriate
    - Exercises organized into circuits labeled A, B, C, D, E
    - For each exercise: name, number of sets, reps (like "12" or "12,10,8"), and brief helpful notes

    {formatInstructions}`,
      inputVariables: ['userPrompt', 'weekCount'],
      partialVariables: { formatInstructions },
    })
    
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
    
    // Chain everything together and run it
    const chain = promptTemplate.pipe(model).pipe(parser)
    const result = await chain.invoke({
      userPrompt: prompt,
      weekCount: weekCount.toString(),
    })
    
    // Return the validated workout plan
    return NextResponse.json({
      success: true,
      data: result as WorkoutPlan,
    })
    
  } catch (error) {
    console.error('Error generating workout plan:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to generate workout plan. Please try again.' 
      },
      { status: 500 }
    )
  }
}