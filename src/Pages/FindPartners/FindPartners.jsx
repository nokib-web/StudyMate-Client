import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import PartnerCard from "../../components/PartnerCard";
import PartnerCardSkeleton from "../../components/PartnerCardSkeleton";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const FindPartners = () => {
    const [partners, setPartners] = useState([]);
    const [filteredPartners, setFilteredPartners] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [experienceFilter, setExperienceFilter] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const axiosInstance = useAxios();
    const { loading: authLoading } = useAuth(); // If auth loading is needed

    useEffect(() => {
        setLoadingData(true);
        axiosInstance
            .get("/partners")
            .then((res) => {
                setPartners(res.data);
                setFilteredPartners(res.data);
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

        // Search by subject or name
        if (searchTerm) {
            result = result.filter(p =>
                (p.subject && p.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by Category (Subject) - Assuming 'subject' acts as category
        if (categoryFilter) {
            result = result.filter(p => p.subject && p.subject.toLowerCase() === categoryFilter.toLowerCase());
        }

        // Filter by Experience
        if (experienceFilter) {
            result = result.filter(p => p.experienceLevel && p.experienceLevel.toLowerCase() === experienceFilter.toLowerCase());
        }

        // Sort
        if (sortBy === "newest") {
            // Assuming _id or created_at logic. For now, reverse for semblance of newest if logic absent
            // result.reverse(); // If data is already newest first? 
        } else if (sortBy === "name_asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredPartners(result);
        setCurrentPage(1); // Reset to page 1 on filter
    }, [searchTerm, categoryFilter, experienceFilter, sortBy, partners]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPartners.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Extract unique subjects for filter dropdown
    const subjects = [...new Set(partners.map(p => p.subject))].filter(Boolean);

    return (
        <div className="bg-base-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-heading font-bold text-gray-800 mb-4">
                        Explore <span className="text-primary">Study Partners</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Connect with like-minded students, share knowledge, and achieve your academic goals together.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">

                    {/* Search */}
                    <div className="relative w-full lg:w-1/3">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Filters Group */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <select
                            className="select select-bordered rounded-xl w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Subjects</option>
                            {subjects.map((sub, idx) => (
                                <option key={idx} value={sub}>{sub}</option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered rounded-xl w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                        >
                            <option value="">Any Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>

                        <select
                            className="select select-bordered rounded-xl w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="name_asc">Name (A-Z)</option>
                        </select>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loadingData || authLoading ? (
                        // Skeletons
                        [...Array(8)].map((_, i) => <PartnerCardSkeleton key={i} />)
                    ) : currentItems.length > 0 ? (
                        currentItems.map((partner) => (
                            <PartnerCard key={partner._id} partner={partner} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No partners found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setCategoryFilter(''); setExperienceFilter(''); }}
                                className="btn btn-primary btn-outline mt-4 rounded-full"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loadingData && filteredPartners.length > itemsPerPage && (
                    <div className="flex justify-center mt-12">
                        <div className="join">
                            <button
                                className="join-item btn btn-outline"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                «
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`join-item btn ${currentPage === index + 1 ? 'btn-primary text-white' : 'btn-outline'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className="join-item btn btn-outline"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                »
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindPartners;
