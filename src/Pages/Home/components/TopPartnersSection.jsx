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
        axiosInstance.get('/partners/top-partners')
            .then(res => {
                setPartners(Array.isArray(res.data) ? res.data : []);
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
        <div className="py-24 bg-base-200 border-b border-base-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-3">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Global Talent</div>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Featured Study Partners</h2>
                    <p className="text-lg opacity-70 font-medium">Top-rated students ready to collaborate and grow together.</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card bg-base-100 shadow-xl border border-base-300 h-96 animate-pulse p-8 items-center text-center space-y-6">
                                <div className="w-24 h-24 bg-base-300 rounded-full"></div>
                                <div className="space-y-3 w-full">
                                    <div className="h-5 bg-base-300 w-3/4 mx-auto rounded-full"></div>
                                    <div className="h-4 bg-base-300 w-1/2 mx-auto rounded-full"></div>
                                    <div className="h-4 bg-base-300 w-1/3 mx-auto rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {partners.map((partner) => (
                            <div key={partner._id} className="card bg-base-100 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group border border-base-300 p-2 overflow-hidden">
                                <figure className="pt-6">
                                    <div className="avatar">
                                        <div className="w-24 h-24 rounded-full ring-2 ring-primary/20 ring-offset-4 ring-offset-base-100 group-hover:scale-110 transition-transform overflow-hidden relative">
                                            <img
                                                src={partner.profileImage || partner.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                                                alt={partner.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                </figure>
                                <div className="card-body items-center text-center px-6">
                                    <h3 className="text-xl font-bold text-base-content tracking-tight">{partner.name}</h3>
                                    <p className="text-sm font-black text-primary uppercase tracking-widest mt-1">{partner.subject || "General Studies"}</p>

                                    <div className="flex items-center gap-1.5 opacity-60 text-xs font-bold mt-2">
                                        <FaMapMarkerAlt className="text-primary/70" /> {partner.location || "Online"}
                                    </div>

                                    <div className="flex items-center gap-1.5 text-amber-500 mt-4 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
                                        <FaStar size={12} />
                                        <span className="font-black text-xs">{partner.rating || "New"}</span>
                                    </div>

                                    <div className="card-actions mt-8 w-full">
                                        <button
                                            onClick={() => handleViewProfile(partner._id)}
                                            className="btn btn-primary btn-sm w-full rounded-xl text-white border-none shadow-lg shadow-primary/20"
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
