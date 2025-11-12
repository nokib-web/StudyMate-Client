import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../context/AuthContext";


const TopStudyPartners = () => {
    const [partners, setPartners] = useState([]);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosInstance
            .get('/top-partners')
            .then((res) => {
                setPartners(res.data);
            })
            .catch((err) => console.error("Error fetching top partners:", err));
    }, [axiosInstance]);

   const handleViewProfile = (id) => {
  if (!user) {
    
    navigate("/login");
    return;
  }
  navigate(`/find-partners/${id}`);

};

 return (
  <section className="my-20 px-8 max-w-7xl mx-auto">
    <header>
      <h2 className="text-center text-4xl font-extrabold mb-12 text-indigo-700">
         Top Study Partners
      </h2>
    </header>

    {partners.length === 0 ? (
      <p className="text-center text-gray-400 italic text-lg">Loading top partners...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {partners.map((partner) => (
          <article
            key={partner._id}
            className="border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white p-6 flex flex-col items-center"
          >
            <figure className="mb-5">
              <img
                src={
                  partner.profileImage ||
                  "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                }
                alt={partner.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-indigo-300"
                loading="lazy"
              />
            </figure>

            <div className="text-center flex-grow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-1">{partner.name}</h3>
              <p className="text-sm text-indigo-600 font-medium mb-2">{partner.subject}</p>

              {partner.skill && (
                <p className="text-sm italic text-gray-500 mb-4">
                  Skill: <span className="font-medium text-gray-700">{partner.skill}</span>
                </p>
              )}

              <div className="flex justify-center items-center gap-2 mb-6">
              <span className="text-gray-400">  Ratings:</span>
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">
                  {partner.rating ?? "No rating"}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleViewProfile(partner._id)}
              className="btn btn-indigo btn-sm rounded-full px-6 py-2 shadow-sm hover:shadow-md transition"
              type="button"
            >
              View Profile
            </button>
          </article>
        ))}
      </div>
    )}
  </section>
);

};

export default TopStudyPartners;
