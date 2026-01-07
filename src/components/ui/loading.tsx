import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = "md", 
  text = "Đang tải..." 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizeClasses[size]} border-gray-300 border-t-blue-500 rounded-full animate-spin`}
      />
      {text && (
        <p className="mt-4 text-gray-600 text-sm">{text}</p>
      )}
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 5 
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="p-2">
              <div 
                className={`h-4 bg-gray-200 animate-pulse rounded ${
                  colIndex === 0 ? 'w-6' : colIndex === columns - 1 ? 'w-20' : 'w-full'
                }`} 
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default Loading;
