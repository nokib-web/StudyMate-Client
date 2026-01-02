import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'We will get back to you shortly.',
            timer: 2000,
            showConfirmButton: false
        });
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-base-50 py-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">Get in Touch</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have questions, feedback, or need support? We're here to help! Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10 items-start">
                    {/* Contact Info Cards */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="card bg-white shadow-md border border-base-200">
                            <div className="card-body flex-row items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Email Us</h3>
                                    <p className="text-gray-500">support@studymate.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md border border-base-200">
                            <div className="card-body flex-row items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <FaPhoneAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Call Us</h3>
                                    <p className="text-gray-500">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white shadow-md border border-base-200">
                            <div className="card-body flex-row items-center gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Visit Us</h3>
                                    <p className="text-gray-500">123 Learning Ave, Knowledge City</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-white shadow-xl border border-base-200 lg:col-span-2">
                        <div className="card-body p-8">
                            <h2 className="card-title text-2xl mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label font-semibold">Name</label>
                                        <input type="text" placeholder="Your Name" className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label font-semibold">Email</label>
                                        <input type="email" placeholder="Your Email" className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Subject</label>
                                    <input type="text" placeholder="How can we help?" className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Message</label>
                                    <textarea className="textarea textarea-bordered h-32 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Type your message here..." required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full rounded-xl text-lg flex items-center gap-2">
                                    <FaPaperPlane /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
