import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const NewsletterSection = () => {
    return (
        <div className="py-24 bg-base-200">
            <div className="container mx-auto px-6">
                <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden text-center md:text-left">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-white">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Stay in the Loop</h2>
                            <p className="text-blue-100 text-lg">
                                Join our newsletter to get the latest study tips, feature updates, and community highlights delivered to your inbox.
                            </p>
                        </div>

                        <div className="w-full max-w-md">
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="input input-lg w-full rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                                <button className="btn btn-secondary btn-lg rounded-full px-8 text-white border-none shadow-lg hover:bg-yellow-500">
                                    Subscribe <FaPaperPlane className="ml-2" />
                                </button>
                            </form>
                            <p className="text-blue-200 text-sm mt-4 text-center md:text-left">
                                No spam, we promise. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;
