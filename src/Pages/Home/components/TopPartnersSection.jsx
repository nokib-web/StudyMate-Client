import React, { useEffect, useState } from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { useNavigate } from 'react-router';

const TopPartnersSection = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/partners')
            .then(res => {
                // Assuming the API returns an array. Slice the first 4 for display.
                setPartners(res.data.slice(0, 4));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch top partners:", err);
                setLoading(false);
            });
    }, [axiosInstance]);

    const handleViewProfile = (id) => {
        navigate(`/find-partners/${id}`);
    };

    return (
        <div className="py-24 bg-base-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">Featured Study Partners</h2>
                    <p className="text-lg text-gray-600">Top-rated students ready to collaborate</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card bg-base-100 shadow-md h-96 animate-pulse">
                                <div className="px-6 pt-6 flex justify-center">
                                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                                </div>
                                <div className="card-body items-center text-center space-y-2">
                                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
                                    <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {partners.map((partner) => (
                            <div key={partner._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 group">
                                <figure className="px-6 pt-6">
                                    <div className="avatar">
                                        <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 group-hover:scale-110 transition-transform overflow-hidden">
                                            <img
                                                src={partner.profileImage || partner.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                                                alt={partner.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h3 className="card-title text-lg font-bold">{partner.name}</h3>
                                    <p className="text-sm font-medium text-primary">{partner.subject || "General Studies"}</p>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                        <FaMapMarkerAlt /> {partner.location || "Online"}
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 mt-2">
                                        <FaStar /> <span className="font-bold text-gray-700">{partner.rating || "New"}</span>
                                    </div>
                                    <div className="card-actions mt-4">
                                        <button
                                            onClick={() => handleViewProfile(partner._id)}
                                            className="btn btn-sm btn-outline btn-primary rounded-full px-6"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopPartnersSection;
