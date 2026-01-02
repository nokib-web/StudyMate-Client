import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaUserGraduate, FaBook, FaRunning, FaClock } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardOverview = () => {
    const { user } = useAuth();

    // Mock Data for Charts
    const activityData = [
        { name: 'Mon', hours: 2 },
        { name: 'Tue', hours: 4 },
        { name: 'Wed', hours: 3 },
        { name: 'Thu', hours: 5 },
        { name: 'Fri', hours: 4 },
        { name: 'Sat', hours: 6 },
        { name: 'Sun', hours: 1 },
    ];

    const subjectData = [
        { name: 'Math', value: 400 },
        { name: 'Science', value: 300 },
        { name: 'History', value: 300 },
        { name: 'Art', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Hello, {user?.displayName || "Student"}! 👋</h1>
                    <p className="text-gray-500">Here's your study overview for this week.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-400">Today's Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-white shadow-sm rounded-2xl border border-gray-100">
                    <div className="stat-figure text-primary">
                        <FaClock size={24} />
                    </div>
                    <div className="stat-title">Study Hours</div>
                    <div className="stat-value text-primary">25.4</div>
                    <div className="stat-desc">↗︎ 14% more than last week</div>
                </div>

                <div className="stat bg-white shadow-sm rounded-2xl border border-gray-100">
                    <div className="stat-figure text-secondary">
                        <FaUserGraduate size={24} />
                    </div>
                    <div className="stat-title">Partners</div>
                    <div className="stat-value text-secondary">12</div>
                    <div className="stat-desc">Active connections</div>
                </div>

                <div className="stat bg-white shadow-sm rounded-2xl border border-gray-100">
                    <div className="stat-figure text-accent">
                        <FaBook size={24} />
                    </div>
                    <div className="stat-title">Goals Met</div>
                    <div className="stat-value text-accent">85%</div>
                    <div className="stat-desc">Keep it up!</div>
                </div>

                <div className="stat bg-white shadow-sm rounded-2xl border border-gray-100">
                    <div className="stat-figure text-gray-500">
                        <FaRunning size={24} />
                    </div>
                    <div className="stat-title">Streak</div>
                    <div className="stat-value">5 Days</div>
                    <div className="stat-desc">Don't break the chain</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Chart */}
                <div className="card bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold mb-4">Weekly Activity</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Bar dataKey="hours" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subject Distribution */}
                <div className="card bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold mb-4">Focus Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subjectData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {subjectData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 text-sm text-gray-500 mt-2">
                        {subjectData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
