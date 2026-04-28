import React from 'react';
import { statusLabels, statusColors } from '../utils/statusConfig';

interface StatusBadgeProps {
  status: 'pending' | 'in-progress' | 'completed';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors = statusColors[status] || statusColors.pending;
  const label = statusLabels[status] || 'Pending';

  return (
    <span
      className={`inline-flex items-center justify-center w-[75px] md:w-[90px] py-1 rounded-full text-[10px] md:text-xs font-medium border ${colors.border} ${colors.text} bg-white`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
