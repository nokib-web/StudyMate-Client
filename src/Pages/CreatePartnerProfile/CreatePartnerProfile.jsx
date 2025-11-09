import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// import useAxios from "../../hooks/useAxios";

;

const CreatePartnerProfile = () => {
    const { user } = useContext(AuthContext);
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        profileImage: "",
        subject: "",
        studyMode: "",
        availability: "",
        location: "",
        experience: "",
        rating: "",
        partnerCount: 0,
        email: user?.email || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosSecure.post("/partners", formData);

            console.log(formData)

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Profile Created!",
                    text: "Your partner profile has been created successfully.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });

               setTimeout(() => navigate("/find-partners"), 2000);
            }
        } catch (error) {
            console.error("Profile creation failed:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-2xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">
                Create Partner Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Full Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Profile Image */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Profile Image URL</span>
                    </label>
                    <input
                        type="text"
                        name="profileImage"
                        placeholder="Paste your image URL"
                        value={formData.profileImage}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Subject */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Subject</span>
                    </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="e.g., English, Math, Programming"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Study Mode */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Study Mode</span>
                    </label>
                    <select
                        name="studyMode"
                        value={formData.studyMode}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Study Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                {/* Availability */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Availability Time</span>
                    </label>
                    <input
                        type="text"
                        name="availability"
                        placeholder="e.g., Evening 6–9 PM"
                        value={formData.availability}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Location</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="City, area, or preferred location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Experience Level</span>
                    </label>
                    <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>

                {/* Rating */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Rating</span>
                    </label>
                    <input
                        type="number"
                        name="rating"
                        placeholder="e.g., 4.5"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="label">
                        <span className="label-text font-semibold">Email (Read Only)</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-3">
                    <button type="submit" className="btn btn-primary w-full">
                        Create Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePartnerProfile;
