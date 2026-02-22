'use client'

import { GripVertical, Trash2 } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Circuit } from '@/lib/schemas'

interface SortableCircuitRowProps {
  circuit: Circuit
  index: number
  weekNumber: number
  dayNumber: number
  onDeleteClick: (weekNumber: number, dayNumber: number, index: number) => void
}

export function SortableCircuitRow({
  circuit,
  index,
  weekNumber,
  dayNumber,
  onDeleteClick,
}: SortableCircuitRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: String(index) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr ref={setNodeRef} style={style} className="bg-white border-gray-50 border-6">
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
      <td className="px-4 py-3 w-10">
        <button
          {...listeners}
          {...attributes}
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
      <td className="px-4 py-3 w-10">
        <button
          onClick={() => onDeleteClick(weekNumber, dayNumber, index)}
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Delete exercise"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}
