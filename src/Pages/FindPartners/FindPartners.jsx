import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaSortAmountDown, FaChevronDown, FaTimes } from "react-icons/fa";
import PartnerCard from "../../components/PartnerCard";
import PartnerCardSkeleton from "../../components/PartnerCardSkeleton";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useSearchParams } from "react-router";

const FindPartners = () => {
    const [partners, setPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters from URL or default
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
    const [categoryFilter, setCategoryFilter] = useState(searchParams.get('subject') || "");
    const [experienceFilter, setExperienceFilter] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const axiosInstance = useAxios();
    const { loading: authLoading } = useAuth();

    useEffect(() => {
        setLoadingData(true);
        axiosInstance
            .get("/partners")
            .then((res) => {
                const data = res.data.partners || res.data;
                const partnersArray = Array.isArray(data) ? data : [];
                setPartners(partnersArray);
                setFilteredPartners(partnersArray);
                setLoadingData(false);
            })
            .catch((err) => {
                console.error("Error fetching partners:", err);
                setLoadingData(false);
            });
    }, [axiosInstance]);

    // Apply Filter & Search & Sort
    useEffect(() => {
        let result = [...partners];

        if (searchTerm) {
            result = result.filter(p =>
                (p.subject && p.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (categoryFilter) {
            result = result.filter(p => p.subject && p.subject.toLowerCase() === categoryFilter.toLowerCase());
        }

        if (experienceFilter) {
            result = result.filter(p => p.experienceLevel && p.experienceLevel.toLowerCase() === experienceFilter.toLowerCase());
        }

        if (sortBy === "name_asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "count_desc") {
            // Future logic for popularity if needed
        }

        setFilteredPartners(result);
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, experienceFilter, sortBy, partners]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPartners.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setCategoryFilter("");
        setExperienceFilter("");
        setSearchParams({});
    };

    const subjects = [...new Set(partners.map(p => p.subject))].filter(Boolean);

    return (
        <div className="bg-[#FAFBFF] min-h-screen pb-24 relative overflow-hidden">
            {/* Soft decorative background shapes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-400/2 rounded-full blur-[100px] -ml-40 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Modern Header Section */}
                <div className="pt-32 pb-16 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Directory</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 italic">Academic Match</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Connect with verified partners, synchronize your schedules, and master your subjects through collaborative intelligence.
                    </p>
                </div>

                {/* Refined Filter System */}
                <div className="bg-white p-3 md:p-4 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col lg:flex-row gap-4 items-center mb-12 relative">
                    {/* Search Field */}
                    <div className="relative w-full lg:flex-1">
                        <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search by name or subject expertise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-14 pr-6 rounded-3xl bg-[#F8FAFC] border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900 outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="relative inline-block w-full sm:w-auto">
                            <select
                                className="w-full sm:w-44 h-14 px-6 appearance-none rounded-3xl bg-[#F8FAFC] border-none font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Subjects</option>
                                {subjects.map((sub, idx) => (
                                    <option key={idx} value={sub}>{sub}</option>
                                ))}
                            </select>
                            <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                        </div>

                        <div className="relative inline-block w-full sm:w-auto">
                            <select
                                className="w-full sm:w-44 h-14 px-6 appearance-none rounded-3xl bg-[#F8FAFC] border-none font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                                value={experienceFilter}
                                onChange={(e) => setExperienceFilter(e.target.value)}
                            >
                                <option value="">Expertise Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                            <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
                        </div>

                        <button
                            onClick={clearFilters}
                            className="h-14 w-14 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                            title="Clear all filters"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Results Count & Sort Summary */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest">
                        Results Found: <span className="text-primary">{filteredPartners.length}</span>
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <FaSortAmountDown className="text-xs opacity-50" />
                        <span>Filter: {categoryFilter || 'All'} • Level: {experienceFilter || 'Any'}</span>
                    </div>
                </div>

                {/* Directory Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loadingData || authLoading ? (
                        [...Array(8)].map((_, i) => <PartnerCardSkeleton key={i} />)
                    ) : currentItems.length > 0 ? (
                        currentItems.map((partner) => (
                            <PartnerCard key={partner._id} partner={partner} />
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center bg-white border border-dashed border-gray-200 rounded-[3rem]">
                            <div className="w-24 h-24 bg-[#F8FAFC] rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-200">
                                <FaSearch size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">No partners located</h3>
                            <p className="text-gray-500 font-medium mb-8">Try adjusting your filters or expanding your search criteria.</p>
                            <button
                                onClick={clearFilters}
                                className="btn btn-primary rounded-2xl px-10 h-14 font-bold shadow-xl shadow-primary/20"
                            >
                                Reset Directory
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination System */}
                {!loadingData && filteredPartners.length > itemsPerPage && (
                    <div className="flex justify-center mt-20">
                        <div className="flex items-center gap-2 p-2 bg-white rounded-full shadow-lg shadow-black/5 border border-gray-100">
                            <button
                                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full font-black text-xs transition-all ${currentPage === index + 1 ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-500 hover:bg-gray-50'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </button>
                            ))}

                            <button
                                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'}`}
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindPartners;
