import React from "react";
import { FaUserFriends, FaBookOpen, FaRegLightbulb } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 md:px-16 text-center bg-base-100">
      <h2 className="text-3xl font-bold mb-10 text-primary">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="card bg-base-200 shadow-sm hover:shadow-md transition rounded-2xl">
          <div className="card-body items-center">
            <FaUserFriends className="text-4xl text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Find a Study Partner</h3>
            <p className="text-sm text-gray-600">
              Discover learners with matching interests and study goals.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card bg-base-200 shadow-sm hover:shadow-md transition rounded-2xl">
          <div className="card-body items-center">
            <FaBookOpen className="text-4xl text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Connect & Collaborate</h3>
            <p className="text-sm text-gray-600">
              Send a request, start chatting, and plan your study sessions together.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card bg-base-200 shadow-sm hover:shadow-md transition rounded-2xl">
          <div className="card-body items-center">
            <FaRegLightbulb className="text-4xl text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Learn & Grow</h3>
            <p className="text-sm text-gray-600">
              Share ideas, stay consistent, and improve faster through teamwork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
