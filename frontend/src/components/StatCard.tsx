import React from 'react';

interface StatCardProps {
  label: string;
  sublabel?: string;
  value: number;
  color: 'blue' | 'orange' | 'purple' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ label, sublabel, value, color }) => {
  const borderColorValues = {
    blue: '#3b82f6',
    orange: '#f97316',
    purple: '#8b5cf6',
    green: '#22c55e',
  };

  const barColors = {
    blue: '#93c5fd',
    orange: '#fdba74',
    purple: '#c4b5fd',
    green: '#86efac',
  };

  return (
    <div
      className="bg-white overflow-hidden animate-fade-in-up"
      style={{
        borderLeft: `3px solid ${borderColorValues[color]}`,
        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
      }}
    >
      <div className="flex justify-between items-start px-5 pt-5 pb-3">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          {sublabel && (
            <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="flex" style={{ height: '85px', gap: '1.5px' }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: '100%',
              backgroundColor: barColors[color],
              opacity: 0.65,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StatCard;
