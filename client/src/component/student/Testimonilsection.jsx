import React, { useState } from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';
import { motion } from 'framer-motion';

function TestimonialSection() {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  return (
    <div className="pb-14 px-8 md:px-0 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">Testimonials</h2>
      <p className="md:text-lg text-gray-700 text-center mb-12">
        Hear from our happy clients. Their feedback means the world to us!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              "{testimonial.feedback.substring(0, 100)}..."
            </p>
            <button
              onClick={() => setSelectedFeedback(testimonial)}
              className="text-blue-500 underline text-sm hover:text-blue-600 transition"
            >
              Read more
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedFeedback.image}
                alt={selectedFeedback.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedFeedback.name}</h3>
                <p className="text-gray-500 text-sm">{selectedFeedback.role}</p>
              </div>
            </div>
            <p className="text-gray-700">{selectedFeedback.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialSection;
