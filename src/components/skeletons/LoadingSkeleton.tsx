import React from 'react'

const LoadingSkeleton = () => {
 return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
    </div>
  );
}

export default LoadingSkeleton