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
                    <h1 className="text-3xl font-black text-base-content tracking-tight">
                        Welcome back, <span className="text-primary">{user?.displayName?.split(' ')[0] || "Student"}</span>! 👋
                    </h1>
                    <p className="opacity-60 font-medium text-sm md:text-base text-base-content">Here's what's happening with your studies today.</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-base-100 rounded-2xl border border-base-300 shadow-sm w-full md:w-auto">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                    <div className="text-right">
                        <p className="text-[10px] opacity-40 uppercase font-bold tracking-wider text-base-content">Current Session</p>
                        <p className="text-xs md:text-sm font-bold text-base-content">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="relative group overflow-hidden bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <FaClock size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest text-base-content">Study Hours</p>
                            <h3 className="text-2xl font-black text-base-content mt-1">{stats.studyHours}h</h3>
                            <p className="text-xs text-green-500 font-bold mt-2 flex items-center gap-1">
                                <span>↗︎ Live</span>
                                <span className="opacity-20 font-normal text-base-content">from sessions</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <FaUserGraduate size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest text-base-content">Partners</p>
                            <h3 className="text-2xl font-black text-base-content mt-1">{stats.partners}</h3>
                            <p className="text-xs text-blue-500 font-bold mt-2">Active connections</p>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                            <FaBook size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest text-base-content">Goals Met</p>
                            <h3 className="text-2xl font-black text-base-content mt-1">{stats.goalsMet}</h3>
                            <div className="w-full bg-base-200 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="bg-accent h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(stats.goalsMet * 10, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform"></div>
                    <div className="relative flex flex-col gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                            <FaRunning size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest text-base-content">Streak</p>
                            <h3 className="text-2xl font-black text-base-content mt-1">{stats.streak} Days</h3>
                            <p className="text-xs text-orange-600 font-bold mt-2">Keep it up!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Chart */}
                <div className="lg:col-span-2 bg-base-100 p-6 md:p-8 rounded-3xl border border-base-300 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-black text-base-content">Study Momentum</h3>
                            <p className="text-xs opacity-40 font-medium text-base-content">Hours dedicated per day</p>
                        </div>
                        <div className="px-3 py-1 bg-base-200 rounded-xl text-[10px] font-bold opacity-50 text-base-content border border-base-300 uppercase tracking-tighter shrink-0">
                            Last 7 Days
                        </div>
                    </div>
                    <div className="h-64 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-5" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700, className: 'opacity-30' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 700, className: 'opacity-30' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'currentColor', radius: 12, className: 'opacity-5' }}
                                    contentStyle={{
                                        backgroundColor: 'var(--b1)',
                                        borderRadius: '20px',
                                        border: '1px solid var(--b3)',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                        padding: '16px'
                                    }}
                                    itemStyle={{ color: 'var(--bc)' }}
                                    labelStyle={{ color: 'var(--bc)', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="hours" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subject Distribution */}
                <div className="bg-base-100 p-6 md:p-8 rounded-3xl border border-base-300 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-secondary/5 overflow-hidden">
                    <h3 className="text-lg font-black text-base-content mb-2">Focus Areas</h3>
                    <p className="text-xs opacity-40 font-medium mb-6 text-base-content">Subject distribution</p>
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
                                    contentStyle={{
                                        backgroundColor: 'var(--b1)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--b3)',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                    itemStyle={{ color: 'var(--bc)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-base-content opacity-80">{subjectData.length}</span>
                            <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest leading-tight text-base-content">Areas</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                        {subjectData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 p-2.5 rounded-2xl bg-base-200 border border-base-300">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[10px] font-bold text-base-content opacity-80 truncate">{entry.name}</span>
                                    <span className="text-[10px] opacity-40 font-medium text-base-content">
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
