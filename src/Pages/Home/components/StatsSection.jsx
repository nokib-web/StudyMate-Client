import React from 'react';
import { FaUserFriends, FaBook, FaGlobe, FaStar } from 'react-icons/fa';

const stats = [
    { id: 1, name: 'Active Users', value: '5,000+', icon: FaUserFriends },
    { id: 2, name: 'Study Sessions', value: '12,000+', icon: FaBook },
    { id: 3, name: 'Countries', value: '100+', icon: FaGlobe },
    { id: 4, name: '5-Star Reviews', value: '2,500+', icon: FaStar },
];

const StatsSection = () => {
    return (
        <div className="bg-primary/5 py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center p-6 bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-gray-600 font-medium">{stat.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
