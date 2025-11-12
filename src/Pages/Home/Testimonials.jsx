import React from "react";
import { AiFillStar } from "react-icons/ai";

const Testimonials = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-base-200 text-center">
      <h2 className="text-3xl font-bold mb-10 text-primary">What Students Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Review 1 */}
        <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition rounded-2xl">
          <div className="avatar mb-3 mx-auto">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.ibb.co.com/vCsYZBdf/aaron-burden-6j-Yoil2-Gh-Vk-unsplash.jpg" alt="User" />
            </div>
          </div>
          <h3 className="font-semibold">Afsana Rahman</h3>
          <div className="flex justify-center text-yellow-400 my-2">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            “StudyMate helped me find supportive friends and made studying fun again!”
          </p>
        </div>

        {/* Review 2 */}
        <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition rounded-2xl">
          <div className="avatar mb-3 mx-auto">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.ibb.co.com/cSWH2W2L/istockphoto-976795814-612x612.webp" alt="User" />
            </div>
          </div>
          <h3 className="font-semibold">Rafi Khan</h3>
          <div className="flex justify-center text-yellow-400 my-2">
            {[...Array(4)].map((_, i) => (
              <AiFillStar key={i} />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            “A great platform to meet learners with the same goals. Highly recommended!”
          </p>
        </div>

        {/* Review 3 */}
        <div className="card bg-base-100 shadow-md p-6 hover:shadow-lg transition rounded-2xl">
          <div className="avatar mb-3 mx-auto">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.ibb.co.com/96TW9xF/photo-1632056847869-719a2b767aac.jpg" alt="User" />
            </div>
          </div>
          <h3 className="font-semibold">Sumaiya Akter</h3>
          <div className="flex justify-center text-yellow-400 my-2">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            “It’s motivating to study with partners who keep me accountable every day!”
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
