# AI Workout Plan Builder

An intelligent fitness application that generates personalized workout plans using AI. Users can describe their fitness goals in natural language, and the app creates structured, multi-week workout programs tailored to their needs.

## Live Url

https://ai-workout-plan-builder.vercel.app/

[![📟](https://raw.githubusercontent.com/MoazIrfan/AI-Workout-Plan-Builder/main/.github/AI%20Workout%20Plan%20Builder.gif)](./../../)


## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project-directory>
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory
    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:3000` to start using the app.

## How It Works

1. **Enter Your Request**: Describe your desired workout plan in natural language (e.g., "4-week intermediate upper body strength program")
2. **AI Generation**: The app uses LangChain and OpenAI to generate a structured workout plan matching your requirements
3. **View & Customize**: Navigate through weeks, view daily exercises, and delete exercises as needed
4. **Auto-Save**: Your workout plan is automatically saved to localStorage for future reference

## Project Structure
```
├── app/
│   ├── api/
│   │   └── generate-plan/route.ts    # API endpoint for AI plan generation
│   ├── plan/page.tsx                 # Workout plan display page
│   ├── page.tsx                      # Home page with prompt input
│   └── layout.tsx                    # Root layout
├── components/
│   └── ui/                           # Shadcn UI components
│       └── WorkoutPlanSkeleton.tsx   # Loading skeleton component
├── lib/
│   ├── schemas.ts                    # Zod schemas for type validation
│   ├── store/
│       └── workoutStore.ts           # Zustand state management         
└── public/
```

## Technologies Used

- **Frontend**: Next.js 16 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **AI Integration**: OpenAI GPT-3.5 Turbo, LangChain, Zod
- **State Management**: Zustand with persist middleware
