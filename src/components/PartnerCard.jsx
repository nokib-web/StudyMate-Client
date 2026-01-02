import React from 'react';
import { useNavigate } from 'react-router';
import { FaBook, FaUserGraduate, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const PartnerCard = ({ partner }) => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/find-partners/${partner._id}`);
    };

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 border border-base-200 h-full flex flex-col">
            <figure className="relative h-48 overflow-hidden">
                <img
                    src={partner.profileImage || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 badge badge-secondary text-white font-medium text-xs uppercase tracking-wide">
                    {partner.studyMode || "Online"}
                </div>
            </figure>

            <div className="card-body p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="card-title text-lg font-bold text-gray-800 line-clamp-1">
                            {partner.name}
                        </h2>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <FaMapMarkerAlt className="text-primary" /> {partner.location || "Global"}
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-2 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <FaBook size={14} />
                        </div>
                        <span className="font-medium truncate flex-1">{partner.subject || "General Studies"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                            <FaUserGraduate size={14} />
                        </div>
                        <span className="font-medium truncate flex-1">{partner.experienceLevel || "Beginner"}</span>
                    </div>
                </div>

                <div className="card-actions mt-6">
                    <button
                        onClick={handleViewProfile}
                        className="btn btn-primary btn-block text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PartnerCard;