import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

function CalltoAction() {
  return (
    <div className="bg-[#0EDFFFF] py-16 px-6 text-center rounded-2xl shadow-md max-w-4xl mx-auto mt-12">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Learn anything, anytime, anywhere
      </motion.h1>

      <motion.p
        className="text-gray-700 md:text-lg mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Generate Lorem Ipsum text with customizable options for characters, words, sentences, or paragraphs.
        Discover how this classic dummy text has shaped the world of design and typography.
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row justify-center items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>

        <button className="flex items-center gap-2 text-blue-600 font-semibold hover:underline hover:text-blue-800 transition">
          Learn more
          <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

export default CalltoAction;
