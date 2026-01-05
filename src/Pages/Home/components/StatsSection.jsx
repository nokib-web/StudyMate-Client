import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaBook, FaGlobe, FaStar } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';

const StatsSection = () => {
    const axiosPublic = useAxios();
    const [statsData, setStatsData] = useState({
        users: 0,
        sessions: 0,
        partners: 0,
        reviews: 0
    });

    useEffect(() => {
        axiosPublic.get('/users/public-stats')
            .then(res => setStatsData(res.data))
            .catch(err => console.error("Stats fetch error:", err));
    }, [axiosPublic]);

    const stats = [
        { id: 1, name: 'Active Learners', value: statsData.users, icon: FaUserFriends, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 2, name: 'Study Sessions', value: statsData.sessions, icon: FaBook, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 3, name: 'Global Partners', value: statsData.partners, icon: FaGlobe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 4, name: 'Verified Reviews', value: statsData.reviews, icon: FaStar, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <section className="py-20 bg-white border-b border-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat) => (
                        <div key={stat.id} className="group flex flex-col items-center text-center p-6 hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <stat.icon size={28} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-gray-900 tracking-tight">
                                    {stat.value.toLocaleString()}<span className="text-primary text-2xl">+</span>
                                </h3>
                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
