import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import PartnerCard from "../../components/PartnerCard";
import useAxios from "../../hooks/useAxios";

const FindPartners = () => {
    const [partners, setPartners] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [experienceFilter, setExperienceFilter] = useState(""); 
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance
            .get("/partners")
            .then((res) => {
                setPartners(res.data);
            })
            .catch((err) => {
                console.error("Error fetching partners:", err);
            });
    }, [axiosInstance]);

    //  Filter by subject & experience
    const filteredPartners = partners.filter((partner) => {
        const matchesSubject = partner.subject
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesExperience = experienceFilter
            ? partner.experienceLevel?.toLowerCase() === experienceFilter.toLowerCase()
            : true;
        return matchesSubject && matchesExperience;
    });

    return (
        <div className="my-10 px-6">
            <h2 className="text-center text-3xl font-bold mb-8 text-primary">
                Find Your Study Partner
            </h2>

            {/*  Search & Filter Section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 bg-base-200 p-4 rounded-2xl shadow-sm max-w-4xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full md:w-1/2">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search by subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full pl-10 rounded-xl focus:outline-none"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full md:w-1/3">
                    <FaFilter className="absolute left-3 top-3 text-gray-400" size={16} />
                    <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="select select-bordered w-full pl-10 rounded-xl focus:outline-none"
                    >
                        <option value="">All Experience Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>
            </div>

            {/*  Partner Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner) => (
                        <PartnerCard key={partner._id} partner={partner} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">
                        No partners found matching your criteria.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FindPartners;
