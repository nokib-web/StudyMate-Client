import React from 'react';
import { useNavigate } from 'react-router';

const PartnerCard = ({ partner }) => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/find-partners/${partner._id}`);
    };
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{partner.name}</h2>
                <p>{partner.description}</p>
                <div className="">
                    <button onClick={handleViewProfile} className="btn w-full btn-outline">View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default PartnerCard;