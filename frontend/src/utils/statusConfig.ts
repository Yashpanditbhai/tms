export const statusLabels: Record<string, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const statusColors: Record<string, { text: string; bg: string; border: string }> = {
  pending: { text: 'text-orange-500', bg: 'bg-amber-50', border: 'border-orange-400' },
  'in-progress': { text: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-400' },
  completed: { text: 'text-green-500', bg: 'bg-green-50', border: 'border-green-400' },
};
