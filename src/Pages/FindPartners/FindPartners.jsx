import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PartnerCard from '../../components/PartnerCard';

const FindPartners = () => {
    const [partners, setPartners] = useState([]);
    console.log(partners);


    useEffect(() => {
        // replace with your real backend URL
        axios.get("http://localhost:3000/partners")
            .then(res => {
                setPartners(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error("Error fetching partners:", err);
            });
    }, []);

    return (
        <div className='my-8'>
           <h2 className='text-center my-8 font-bold'>Find Partners</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {partners.map(partner => <PartnerCard key={partner._id} partner={partner} />)}
              </div>

        </div>
    );
};

export default FindPartners;