export function WorkoutPlanSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-500">
      {/* Header skeleton */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 w-9 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Main content skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Week selector skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        
        {/* Generate 3 day skeletons to show typical structure */}
        {[1, 2, 3].map((dayNum) => (
          <div key={dayNum} className="mb-6">
            {/* Day header skeleton */}
            <div className="bg-indigo-100 px-4 py-3 rounded-lg mb-2">
              <div className="h-6 w-48 bg-indigo-200 rounded animate-pulse" />
            </div>
            
            {/* Exercise table skeleton */}
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </th>
                    <th className="px-4 py-3 text-left">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </th>
                    <th className="px-4 py-3 text-left">
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                    </th>
                    <th className="px-4 py-3 text-left">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </th>
                    <th className="px-4 py-3 text-left">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </th>
                    <th className="px-4 py-3 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Generate 5 exercise row skeletons */}
                  {[1, 2, 3, 4, 5].map((exerciseNum) => (
                    <tr key={exerciseNum} className="border-t">
                      <td className="px-4 py-3">
                        <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading indicator with message */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-3 border">
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 border-2 border-indigo-200 rounded-full" />
          <div className="absolute inset-0 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          Generating your personalized workout plan...
        </span>
      </div>
    </div>
  )
}