import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaHeadset, FaCommentAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Logged',
            text: 'One of our support architects will contact you shortly.',
            background: '#fff',
            confirmButtonColor: '#3B82F6',
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl px-8'
            }
        });
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/2 rounded-full blur-[100px] -ml-40 -mb-40"></div>

            <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Support</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">How can we help you?</h1>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                        Whether you're looking for support, have questions about our collaboration platform, or just want to say hi, we're ready to connect.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="group p-8 bg-[#FAFBFF] border border-gray-100 rounded-[2.5rem] hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                <FaHeadset size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">Technical Support</h3>
                            <p className="text-gray-500 text-sm font-medium mb-4">Facing an issue? Our engineering team is available 24/7.</p>
                            <a href="mailto:support@studymate.com" className="text-primary font-bold hover:underline">support@studymate.com</a>
                        </div>

                        <div className="group p-8 bg-[#FAFBFF] border border-gray-100 rounded-[2.5rem] hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                                <FaCommentAlt size={22} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">Partnerships</h3>
                            <p className="text-gray-500 text-sm font-medium mb-4">Interested in collaborative education projects?</p>
                            <a href="mailto:hello@studymate.com" className="text-emerald-500 font-bold hover:underline">hello@studymate.com</a>
                        </div>
                    </div>

                    {/* Contact Form Container */}
                    <div className="lg:col-span-8 bg-white p-2 border border-gray-100 rounded-[3rem] shadow-2xl shadow-gray-200/50">
                        <div className="bg-[#FAFBFF] rounded-[2.5rem] p-8 md:p-12">
                            <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Work Email</label>
                                        <input
                                            type="email"
                                            className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Inquiry Subject</label>
                                    <input
                                        type="text"
                                        className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium"
                                        placeholder="How can we assist you?"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest pl-1">Detailed Message</label>
                                    <textarea
                                        className="w-full p-6 rounded-2xl bg-white border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium min-h-[160px]"
                                        placeholder="Describe your request in detail..."
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full h-16 rounded-2xl text-white border-none shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all text-lg font-bold flex items-center justify-center gap-3"
                                >
                                    <FaPaperPlane className="text-sm opacity-50" />
                                    Launch Message
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
