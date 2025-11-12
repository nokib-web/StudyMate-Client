
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

    //  Fetch partner details by ID
    useEffect(() => {
        if (id) {
            axiosSecure
                .get(`/partners/${id}`)
                .then((res) => setPartner(res.data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [id, axiosSecure]);

    //  Handle "Send Partner Request"
    const handleSendRequest = async () => {
        if (!user) {
            Swal.fire("Please login first!", "", "warning");
            navigate("/login");
            return;
        }

        try {
            // Add new connection data
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

            //  Increase partner count
           await axiosSecure.patch(`/partners/${partner._id}`);

            //  Success alert
            Swal.fire({
                icon: "success",
                title: "Request Sent!",
                text: "Your partner request has been successfully sent.",
                showConfirmButton: false,
                timer: 1500,
            });

            //  Update UI instantly
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
    <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-3xl overflow-hidden">
      <div className="card-body items-center text-center space-y-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={partner.profileImage}
            alt={partner.name}
            className="w-36 h-36 rounded-full object-cover border-4 border-primary/30 shadow-lg"
          />
        </div>

        {/* Name & Subject */}
        <div>
          <h2 className="text-3xl font-bold text-base-content mb-1">
            {partner.name}
          </h2>
          <p className="text-lg text-primary/80 font-medium tracking-wide">
            {partner.subject}
          </p>
        </div>

        <div className="divider w-2/3 mx-auto"></div>

        {/* Partner Details */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-left w-full max-w-md">
          <p>
            <span className="font-semibold text-base-content/80">Study Mode:</span>{" "}
            <span className="text-base-content/70">{partner.studyMode}</span>
          </p>
          <p>
            <span className="font-semibold text-base-content/80">Availability:</span>{" "}
            <span className="text-base-content/70">{partner.availabilityTime}</span>
          </p>
          <p>
            <span className="font-semibold text-base-content/80">Location:</span>{" "}
            <span className="text-base-content/70">{partner.location}</span>
          </p>
          <p>
            <span className="font-semibold text-base-content/80">Experience:</span>{" "}
            <span className="text-base-content/70">{partner.experienceLevel}</span>
          </p>
          <p>
            <span className="font-semibold text-base-content/80">Rating:</span>{" "}
            <span className="text-yellow-500 font-medium">{partner.rating}</span>
          </p>
          <p>
            <span className="font-semibold text-base-content/80">Partner Count:</span>{" "}
            <span className="text-base-content/70">{partner.partnerCount || 0}</span>
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleSendRequest}
            className="btn btn-primary px-10 text-base font-semibold shadow-md hover:scale-105 transition-transform"
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
