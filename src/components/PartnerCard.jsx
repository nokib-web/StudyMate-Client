import React from 'react';
import { useNavigate } from 'react-router';

const PartnerCard = ({ partner }) => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/find-partners/${partner._id}`);
    };
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Image */}
            <div className="">
                <img
                    src={
                        partner.profileImage ||
                        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={partner.name}
                    className="w-full h-48 object-cover"
                />

            </div>

            {/* Content */}
            <div className="p-5 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {partner.name}
                </h2>
                <span className=" my-bg-secondary text-white text-xs px-3 py-1 my-2 rounded-full shadow">
                    {partner.experienceLevel || "Beginner"}
                </span>


                <div className="flex justify-between gap-4 text-gray-600 text-sm mb-4">

                    <p> <span>Subject:</span> {partner.subject}</p>

                    <p> <span>Study Mode:</span> {partner.studyMode}</p>

                </div>

                <button
                    onClick={handleViewProfile}
                    className="btn  btn-sm my-btn-primary rounded-full px-6 py-2 shadow-sm hover:shadow-md transition hover:scale-105 hover:my-bg-primary text-white"
                    type="button"
                >
                    View Profile
                </button>
            </div>
        </div>
    );

};

export default PartnerCard;