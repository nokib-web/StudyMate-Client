import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserGraduate, FaBook, FaRunning, FaClock } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import LoadingSpinner from '../../components/LoadingSpinner';

const DashboardOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: dashboardData, isLoading } = useQuery({
        queryKey: ['dashboardStats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/stats/${user.email}`);
            return res.data;
        }
    });

    const COLORS = ['#2563EB', '#7C3AED', '#DB2777', '#EA580C'];

    if (isLoading) return <LoadingSpinner message="Fetching your progress..." />;

    const { stats, activityData, subjectData } = dashboardData || {
        stats: { studyHours: 0, partners: 0, goalsMet: 0, streak: 0 },
        activityData: [],
        subjectData: []
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        Welcome back, <span className="text-primary">{user?.displayName?.split(' ')[0] || "Student"}</span>! 👋
                    </h1>
                    <p className="text-gray-500 font-medium text-sm md:text-base">Here's what's happening with your studies today.</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Current Session</p>
                        <p className="text-xs md:text-sm font-bold text-gray-700">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="relative group overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <FaClock size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Study Hours</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.studyHours}h</h3>
                            <p className="text-xs text-green-500 font-bold mt-2 flex items-center gap-1">
                                <span>↗︎ Live</span>
                                <span className="text-gray-300 font-normal">from sessions</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <FaUserGraduate size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Partners</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.partners}</h3>
                            <p className="text-xs text-blue-500 font-bold mt-2">Active connections</p>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                            <FaBook size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Goals Met</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.goalsMet}</h3>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-accent h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(stats.goalsMet * 10, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                            <FaRunning size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Streak</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{stats.streak} Days</h3>
                            <p className="text-xs text-orange-600 font-bold mt-2">Keep it up!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Chart */}
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Study Momentum</h3>
                            <p className="text-xs text-gray-400 font-medium">Hours dedicated per day</p>
                        </div>
                        <div className="px-3 py-1 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 border border-gray-100 uppercase tracking-tighter shrink-0">
                            Last 7 Days
                        </div>
                    </div>
                    <div className="h-64 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc', radius: 12 }}
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                        padding: '16px'
                                    }}
                                />
                                <Bar dataKey="hours" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subject Distribution */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-secondary/5 overflow-hidden">
                    <h3 className="text-lg font-black text-gray-900 mb-2">Focus Areas</h3>
                    <p className="text-xs text-gray-400 font-medium mb-6">Subject distribution</p>
                    <div className="h-56 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subjectData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {subjectData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-gray-800">{subjectData.length}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Areas</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                        {subjectData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 p-2.5 rounded-2xl bg-gray-50/50 border border-gray-100/30">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[10px] font-bold text-gray-800 truncate">{entry.name}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {((entry.value / subjectData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
