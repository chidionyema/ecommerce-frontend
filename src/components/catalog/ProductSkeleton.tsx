// File: components/catalog/ProductSkeleton.tsx
import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Image skeleton */}
      <div className="bg-gray-200 rounded-lg h-96"></div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        {/* Title */}
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        
        {/* Price */}
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        
        {/* Rating */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded-full"></div>
          ))}
          <div className="h-5 bg-gray-200 rounded w-16 ml-2"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Quantity */}
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        
        {/* Buttons */}
        <div className="flex space-x-3">
          <div className="h-12 bg-gray-200 rounded w-40"></div>
          <div className="h-12 bg-gray-200 rounded w-12"></div>
        </div>
        
        {/* Additional info */}
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;