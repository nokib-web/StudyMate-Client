import React from 'react';

const PartnerCardSkeleton = () => {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
            <div className="h-56 bg-gray-100 w-full mb-6"></div>
            <div className="p-6 flex-grow space-y-6">
                <div className="space-y-3">
                    <div className="h-7 bg-gray-100 rounded-lg w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded-full w-1/4"></div>
                </div>

                <div className="space-y-3">
                    <div className="h-14 bg-gray-50 rounded-2xl w-full"></div>
                    <div className="h-14 bg-gray-50 rounded-2xl w-full"></div>
                </div>

                <div className="pt-2">
                    <div className="h-12 bg-gray-100 rounded-2xl w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default PartnerCardSkeleton;
