import React from 'react';
import { useNavigate } from 'react-router';
import { FaBook, FaUserGraduate, FaStar, FaMapMarkerAlt, FaArrowRight, FaBolt } from 'react-icons/fa';

const PartnerCard = ({ partner }) => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/find-partners/${partner._id}`);
    };

    return (
        <div className="group relative bg-white rounded-[2.5rem] border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:border-primary/10 transition-all duration-500 overflow-hidden flex flex-col h-full">
            {/* Visual Header / Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={partner.profileImage || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Mode Badge */}
                <div className="absolute top-4 left-4 ">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                        <FaBolt className="text-[10px] text-amber-500" />
                        <span className="text-[10px] font-black uppercase text-gray-800 tracking-[0.1em]">{partner.studyMode || "Sync"}</span>
                    </div>
                </div>

                {/* Rating Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-900/80 backdrop-blur-md text-white rounded-full text-[10px] font-bold">
                        <FaStar className="text-amber-400" />
                        <span>4.9 (24 Reviews)</span>
                    </div>
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Active Now</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-grow flex flex-col space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                            {partner.name}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                        <FaMapMarkerAlt className="text-primary/60" />
                        <span>{partner.location || "Global Learning Hub"}</span>
                    </div>
                </div>

                {/* Subject & Experience Stats */}
                <div className="space-y-3 flex-grow">
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-50 group-hover:border-primary/5 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                            <FaBook size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Focus Subject</span>
                            <span className="text-sm font-bold text-gray-700 truncate">{partner.subject || "Academic Mastery"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-50 group-hover:border-primary/5 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                            <FaUserGraduate size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Skill Tier</span>
                            <span className="text-sm font-bold text-gray-700 truncate">{partner.experienceLevel || "Intermediate"}</span>
                        </div>
                    </div>
                </div>

                {/* Action Link */}
                <div className="pt-2">
                    <button
                        onClick={handleViewProfile}
                        className="w-full h-12 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-2xl font-bold hover:bg-primary shadow-lg shadow-black/5 hover:shadow-primary/20 transition-all duration-300"
                    >
                        <span>Analyze Profile</span>
                        <FaArrowRight className="text-xs opacity-50 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartnerCard;