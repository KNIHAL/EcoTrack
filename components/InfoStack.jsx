"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const infoCards = [
  {
    img: "/pollution.jpg",
    title: "The Reality of Pollution",
    text: "Air and plastic pollution are destroying ecosystems and health every day. Awareness is the first step toward change.",
  },
  {
    img: "/ecotrack_help.jpg",
    title: "How Ecotrack Helps",
    text: "Ecotrack connects citizens and organizations to track, report, and resolve waste issues efficiently.",
  },
  {
    img: "/cleaning_efforts.jpg",
    title: "On-Ground Cleaning Efforts",
    text: "Our partnered communities and staff ensure proper waste collection and recycling in every corner.",
  },
  {
    img: "/community.jpg",
    title: "Join Our Green Community",
    text: "Together we can make cities cleaner and create a sustainable future for the next generation.",
  },
];

export default function InfoStack() {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % infoCards.length);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-green-50 to-white">
      <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-12 text-center">
        Learn More About Ecotrack
      </h2>

      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-[420px] sm:h-[500px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                drag="x"
                onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 100) nextCard();
                }}
                initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 45, x: 300 }}  // ✅ fixed
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab"
            >

            <img
              src={infoCards[index].img}
              alt={infoCards[index].title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                {infoCards[index].title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {infoCards[index].text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      
    </section>
  );
}
