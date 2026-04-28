import React from 'react';
import type { Task } from '../types';
import { formatDateTime } from '../utils/formatDate';

interface ActivityTimelineProps {
  task: Task;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ task }) => {
  const statusText =
    task.status === 'pending'
      ? 'Task not started'
      : task.status === 'in-progress'
      ? 'Task in progress'
      : 'Task completed';

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-400 mb-3">Activity History</h4>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-gray-800 mt-0.5" />
          <div className="w-0 flex-1 border-l-2 border-dashed border-gray-300 my-1" />
        </div>
        <div className="pb-3">
          <p className="text-sm text-gray-700">
            Task created by {task.createdBy?.name || 'Admin'}
          </p>
          <p className="text-xs text-gray-400">{formatDateTime(task.createdAt)}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white mt-0.5" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{statusText}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
