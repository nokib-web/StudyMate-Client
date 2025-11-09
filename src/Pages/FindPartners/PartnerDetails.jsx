
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";

const PartnerDetails = () => {
    const { id } = useParams();
    const { user, loading: userLoading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch partner details by ID
    useEffect(() => {
        if (id) {
            axiosSecure
                .get(`/partners/${id}`)
                .then((res) => setPartner(res.data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id, axiosSecure]);

    // ✅ Handle "Send Partner Request"
    const handleSendRequest = async () => {
        if (!user) {
            Swal.fire("Please login first!", "", "warning");
            navigate("/login");
            return;
        }

        try {
            // 1️⃣ Add new connection data
            const requestData = {
                partnerId: partner._id,
                partnerName: partner.name,
                partnerEmail: partner.email,
                profileimage: partner.profileimage,
                subject: partner.subject,
                studyMode: partner.studyMode,
                senderEmail: user.email,
                createdAt: new Date(),
            };

            await axiosSecure.post("/connections", requestData);

            // 2️⃣ Increase partner count
            await axiosSecure.patch(`/partners/${partner._id}`, {
                partnerCount: (partner.partnerCount || 0) + 1,
            });

            // 3️⃣ Success alert
            Swal.fire({
                icon: "success",
                title: "Request Sent!",
                text: "Your partner request has been successfully sent.",
                showConfirmButton: false,
                timer: 1500,
            });

            // 4️⃣ Update UI instantly
            setPartner((prev) => ({
                ...prev,
                partnerCount: (prev.partnerCount || 0) + 1,
            }));
        } catch (error) {
            console.error("Send request failed:", error);
            Swal.fire("Error!", "Failed to send request.", "error");
        }
    };

    if (userLoading || loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (!partner) {
        return <div className="text-center mt-10">Partner not found.</div>;
    }

    console.log(partner);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <img
                        src={partner.profileimage}
                        alt={partner.name}
                        className="w-32 h-32 rounded-full border mb-4"
                    />
                    <h2 className="card-title text-2xl font-bold">{partner.name}</h2>
                    <p className="text-sm text-gray-500">{partner.subject}</p>
                    <div className="divider"></div>

                    <div className="grid grid-cols-2 gap-4 text-left w-full max-w-md">
                        <p><strong>Study Mode:</strong> {partner.studyMode}</p>
                        <p><strong>Availability:</strong> {partner.availability}</p>
                        <p><strong>Location:</strong> {partner.location}</p>
                        <p><strong>Experience:</strong> {partner.experienceLevel}</p>
                        <p><strong>Rating:</strong> ⭐ {partner.rating}</p>
                        <p><strong>Partner Count:</strong> {partner.partnerCount || 0}</p>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSendRequest}
                            className="btn btn-primary"
                        >
                            Send Partner Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDetails;
