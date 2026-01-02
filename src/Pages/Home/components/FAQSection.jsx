import React from 'react';

const faqs = [
    {
        question: "Is StudyMate free to use?",
        answer: "Yes! StudyMate is completely free for finding study partners and joining community groups. We plan to introduce premium features for advanced tools in the future."
    },
    {
        question: "How are profiles verified?",
        answer: "We use email verification and social account linking to ensure real users. We also have a community reporting system to maintain safety."
    },
    {
        question: "Can I find partners for specific exams?",
        answer: "Absolutely! You can filter partners by specific exams like SAT, GRE, IELTS, or university subjects."
    },
    {
        question: "Is there a video call feature?",
        answer: "Currently, we provide chat and resource sharing. We recommend using your preferred video tool once you match, but integrated video is coming soon!"
    },
    {
        question: "How do I ensure my safety?",
        answer: "We always recommend keeping initial conversations on the platform. Review our safety guidelines and report any suspicious activity immediately."
    }
];

const FAQSection = () => {
    return (
        <div className="py-24 bg-base-100">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600">Common questions about finding a study partner</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus bg-base-200 rounded-xl">
                            <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
