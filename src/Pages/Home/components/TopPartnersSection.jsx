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

    const PartnerCard = ({ partner }) => (
        <div key={partner._id} className="group bg-base-100 shadow-xl hover:shadow-2xl hover:border-primary/20 transition-all duration-500 border border-base-300 p-2 overflow-hidden rounded-[2rem] flex-shrink-0 w-[240px] md:w-[280px]">
            <figure className="pt-6 flex justify-center">
                <div className="avatar">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-2 ring-primary/20 ring-offset-4 ring-offset-base-100 group-hover:scale-110 transition-transform overflow-hidden relative">
                        <img
                            src={partner.profileImage || partner.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                            alt={partner.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>
            </figure>
            <div className="card-body items-center text-center px-4 py-6">
                <h3 className="text-lg font-bold text-base-content tracking-tight line-clamp-1">{partner.name}</h3>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-0.5 line-clamp-1">{partner.subject || "General Studies"}</p>

                <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-bold mt-2">
                    <FaMapMarkerAlt className="text-primary/70" /> {partner.location || "Online"}
                </div>

                <div className="flex items-center gap-1.5 text-amber-500 mt-4 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
                    <FaStar size={10} />
                    <span className="font-black text-[10px]">{partner.rating || "New"}</span>
                </div>

                <div className="card-actions mt-6 w-full px-2">
                    <button
                        onClick={() => handleViewProfile(partner._id)}
                        className="btn btn-primary btn-xs md:btn-sm w-full rounded-xl text-white border-none shadow-lg shadow-primary/20 h-10 min-h-10 hover:scale-105 transition-transform"
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="py-24 bg-base-200 border-b border-base-300 overflow-hidden relative">
            <style>{`
                @keyframes marquee-scroll-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .marquee-track-partners {
                    display: flex;
                    gap: 1.5rem;
                    animation: marquee-scroll-reverse 40s linear infinite;
                    width: max-content;
                }
                .marquee-track-partners:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="container mx-auto px-6 relative z-10 mb-16">
                <div className="text-center space-y-3">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Global Talent</div>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Featured Study Partners</h2>
                    <p className="text-lg opacity-70 font-medium leading-relaxed">Top-rated students ready to collaborate and grow together.</p>
                </div>
            </div>

            {loading ? (
                <div className="container mx-auto px-6">
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
                </div>
            ) : (
                <div className="relative">
                    {/* Dark gradient fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-60 bg-gradient-to-r from-base-200 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-60 bg-gradient-to-l from-base-200 to-transparent z-20 pointer-events-none"></div>

                    <div className="marquee-track-partners py-4">
                        {/* Render twice for seamless loop */}
                        {[...partners, ...partners].map((partner, idx) => (
                            <PartnerCard key={`${partner._id}-${idx}`} partner={partner} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopPartnersSection;
