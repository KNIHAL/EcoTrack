"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Hero() {
  const router = useRouter();
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-16 pt-24"
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left md:w-1/2 space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Smart Waste Management <br />
          <span className="text-green-600">for a Cleaner Future</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
          Empowering citizens and organizations to report, manage, and track
          waste cleanups — together we make cities greener 🌱
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button
            onClick={() => router.push("/register")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
          >
            Report Waste
          </button>

          <button 
            onClick={() => router.push("/learnMore")}
            className="px-6 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Right 3D Placeholder / Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
      >
      </motion.div>
    </section>
  );
}
