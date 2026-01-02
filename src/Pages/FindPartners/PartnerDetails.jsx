import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";
import { useSocket } from "../../context/SocketProvider";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams, Link } from "react-router";
import { FaMapMarkerAlt, FaStar, FaUserGraduate, FaBusinessTime, FaBook, FaCheckCircle, FaFacebook, FaTwitter, FaLinkedin, FaPaperPlane } from "react-icons/fa";

const PartnerDetails = () => {
  const { id } = useParams();
  const { user, loading: userLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const socket = useSocket();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // New State for Reviews and Similar Partners
  const [reviews, setReviews] = useState([]);
  const [similarPartners, setSimilarPartners] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Fetch Partner Details
      axiosSecure
        .get(`/partners/${id}`)
        .then((res) => {
          setPartner(res.data);

          // Fetch Similar Partners (Public) - Filter by subject
          if (res.data.subject) {
            axiosPublic.get('/partners')
              .then(allRes => {
                const similar = allRes.data.filter(p =>
                  p.subject === res.data.subject && p._id !== res.data._id
                ).slice(0, 2); // Limit to 2
                setSimilarPartners(similar);
              });
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));

      // Fetch Reviews (Public)
      axiosPublic.get(`/reviews/${id}`)
        .then(res => setReviews(res.data))
        .catch(err => console.error("Failed to fetch reviews", err));
    }
  }, [id, axiosSecure, axiosPublic]);

  const handleSendRequest = async () => {
    if (!user) {
      Swal.fire("Please login first!", "", "warning");
      navigate("/login");
      return;
    }

    try {
      const requestData = {
        partnerId: partner._id,
        partnerName: partner.name,
        partnerEmail: partner.email,
        profileImage: partner.profileImage,
        subject: partner.subject,
        studyMode: partner.studyMode,
        senderEmail: user.email,
        experienceLevel: partner.experience,
        createdAt: new Date(),
      };

      await axiosSecure.post("/connections", requestData);
      await axiosSecure.patch(`/partners/${partner._id}`);

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: "Your partner request has been successfully sent.",
        showConfirmButton: false,
        timer: 1500,
      });

      if (socket) {
        socket.emit("send_partner_request", {
          senderEmail: user.email,
          receiverEmail: partner.email
        });
      }

      setPartner((prev) => ({
        ...prev,
        partnerCount: (prev.partnerCount || 0) + 1,
      }));
    } catch (error) {
      console.error("Send request failed:", error);
      Swal.fire("Error!", "Failed to send request.", "error");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Login required", "Please login to add a review", "warning");

    try {
      const reviewData = {
        partnerId: partner._id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        rating: parseInt(newReview.rating),
        comment: newReview.comment
      };

      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        setReviews([reviewData, ...reviews]);
        setNewReview({ rating: 5, comment: "" });
        Swal.fire("Success", "Review added successfully", "success");
      }
    } catch (error) {
      console.error("Failed to submit review", error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (!partner) {
    return <div className="text-center mt-20 text-2xl font-bold">Partner not found.</div>;
  }

  return (
    <div className="bg-base-50 min-h-screen pb-10">
      {/* Banner Section */}
      <div className="h-64 bg-gradient-to-r from-primary to-blue-800 relative">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar / Profile Card */}
          <div className="md:w-1/3">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="px-6 pt-6 flex justify-center">
                <img
                  src={partner.profileImage || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                  alt={partner.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div className="card-body text-center items-center">
                <h2 className="text-2xl font-bold">{partner.name}</h2>
                <p className="text-gray-500 font-medium">{partner.subject} Enthusiast</p>

                <div className="flex gap-4 mt-2 mb-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook size={20} /></a>
                  <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={20} /></a>
                  <a href="#" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={20} /></a>
                </div>

                <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                  <div className="stat place-items-center">
                    <div className="stat-title">Requests</div>
                    <div className="stat-value text-primary">{partner.partnerCount || 0}</div>
                  </div>
                  <div className="stat place-items-center">
                    <div className="stat-title">Rating</div>
                    <div className="stat-value text-secondary">{partner.rating || 5.0}</div>
                  </div>
                </div>

                <button
                  onClick={handleSendRequest}
                  className="btn btn-primary w-full mt-6 rounded-full text-lg"
                >
                  Connect Now
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="card bg-base-100 shadow-md mt-6 border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span className="font-semibold">Location:</span> {partner.location || "Online"}
                  </li>
                  <li className="flex items-center gap-3">
                    <FaUserGraduate className="text-gray-400" />
                    <span className="font-semibold">Level:</span> {partner.experienceLevel}
                  </li>
                  <li className="flex items-center gap-3">
                    <FaBusinessTime className="text-gray-400" />
                    <span className="font-semibold">Availability:</span> {partner.availabilityTime || "Flexible"}
                  </li>
                  <li className="flex items-center gap-3">
                    <FaBook className="text-gray-400" />
                    <span className="font-semibold">Mode:</span> {partner.studyMode}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-2/3">
            <div className="bg-base-100 rounded-2xl shadow-md border border-base-200 overflow-hidden min-h-[500px]">
              {/* Tabs */}
              <div className="flex border-b border-base-200">
                <button
                  className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'overview' ? 'border-b-4 border-primary text-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'reviews' ? 'border-b-4 border-primary text-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-bold mb-4">About {partner.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {partner.bio || "This user hasn't added a bio yet. However, they are eager to study " + partner.subject + " and collaborate with others. Connect with them to start your study journey together!"}
                    </p>

                    <h3 className="text-xl font-bold mb-4">Study Goals</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Consistent Practice", "Exam Preparation", "Skill Sharing", "Networking"].map((goal, idx) => (
                        <span key={idx} className="badge badge-outline badge-lg p-3 gap-2">
                          <FaCheckCircle className="text-green-500" /> {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="animate-fade-in">
                    <h3 className="text-xl font-bold mb-6">Community Reviews ({reviews.length})</h3>

                    {/* Review List */}
                    <div className="space-y-6 mb-8">
                      {reviews.length > 0 ? reviews.map((review, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-base-50 rounded-xl">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full">
                              <img src={review.reviewerImage || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="Reviewer" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold">{review.reviewerName}</span>
                              <div className="flex text-yellow-500 text-xs">
                                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                          </div>
                        </div>
                      )) : (
                        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                      )}
                    </div>

                    {/* Add Review Form */}
                    {user && (
                      <div className="bg-base-50 p-6 rounded-xl border border-base-200">
                        <h4 className="font-bold mb-4">Write a Review</h4>
                        <form onSubmit={handleSubmitReview}>
                          <div className="mb-4">
                            <label className="label">Rating</label>
                            <div className="rating rating-sm">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                  key={star}
                                  type="radio"
                                  name="rating-2"
                                  className="mask mask-star-2 bg-orange-400"
                                  checked={newReview.rating === star}
                                  onChange={() => setNewReview({ ...newReview, rating: star })}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <textarea
                              className="textarea textarea-bordered w-full"
                              placeholder="Share your experience..."
                              value={newReview.comment}
                              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                              required
                            ></textarea>
                          </div>
                          <button className="btn btn-primary btn-sm rounded-full">
                            <FaPaperPlane className="mr-2" /> Submit Review
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Related Partners */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Similar Partners</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similarPartners.length > 0 ? similarPartners.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-base-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/find-partners/${item._id}`)}>
                    <img src={item.profileImage || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} className="w-16 h-16 rounded-full object-cover" alt="Similar" />
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.subject} • {item.location || "Online"}</p>
                      <div className="text-xs text-secondary mt-1 font-semibold">View Profile</div>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500">No similar partners found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
