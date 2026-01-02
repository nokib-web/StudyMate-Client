import React from 'react';

const PartnerCardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-sm border border-base-200 h-full flex flex-col animate-pulse">
            <div className="h-48 bg-gray-200 w-full"></div>
            <div className="card-body p-5">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>

                <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
            </div>
        </div>
    );
};

export default PartnerCardSkeleton;
