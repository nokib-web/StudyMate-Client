import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const faqs = [
    {
        question: "Is StudyMate free to use?",
        answer: "StudyMate's core collaborative features—finding partners, joining groups, and initial resource sharing—are completely free. We focus on accessibility to democratize quality education for everyone."
    },
    {
        question: "How are profiles verified?",
        answer: "We utilize multi-factor verification including school email domain checks and social graph linking. Our 'Verified Partner' badge is awarded after successful collaboration feedback from other learners."
    },
    {
        question: "Can I find partners for specific academic exams?",
        answer: "Yes. Our deep-search intelligence allows filtering by specific high-stakes exams (SAT, GRE, IELTS) and ultra-specialized university modules across 50+ categories."
    },
    {
        question: "How do I ensure my privacy while matching?",
        answer: "We employ an 'Anonymized Discovery' layer. Your contact details are never exposed. You communicate through our encrypted workspace until you decide to share further information."
    },
    {
        question: "is there integrated video collaboration?",
        answer: "We currently provide real-time chat and document synchronization. Collaborative whiteboard and low-latency video modules are in active development for our 2026 roadmap."
    }
];

const FAQSection = () => {
    return (
        <section className="py-24 bg-base-100 relative overflow-hidden">
            {/* Decorative background blurs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -ml-40 pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Knowledge Base</div>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Curious? We have answers.</h2>
                    <p className="text-lg opacity-70 font-medium">Everything you need to know about the StudyMate ecosystem.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="group collapse bg-base-200 border border-base-300 rounded-[2rem] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                        >
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title flex items-center justify-between py-6 px-8 text-lg md:text-xl font-black text-base-content cursor-pointer">
                                <span>{faq.question}</span>
                                <div className="w-8 h-8 rounded-full border border-base-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all peer-checked:rotate-90">
                                    <FaChevronRight className="text-[10px]" />
                                </div>
                            </div>
                            <div className="collapse-content px-8 pb-6">
                                <div className="h-px bg-base-300 w-full mb-6"></div>
                                <p className="opacity-70 font-medium leading-[1.8] text-lg text-base-content">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="opacity-50 font-bold text-sm">
                        Still have questions? <span className="text-primary hover:underline cursor-pointer">Visit the Architect Support Desk</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
