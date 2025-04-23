import React from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center justify-center px-6 py-20">
      <section className="max-w-4xl w-full text-center space-y-8">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stratum: A Playbook for Building Elite Teams
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          You don’t scale teams—you scale the thinking that builds them.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <button className="bg-black text-white px-6 py-2 rounded-xl text-base hover:bg-gray-800 transition-all">
            Explore Meta-Skills
          </button>
          <button className="border border-gray-400 text-gray-800 px-6 py-2 rounded-xl text-base hover:border-gray-600">
            Read the Framework
          </button>
        </motion.div>
      </section>

      <section className="mt-24 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
        {[
          {
            title: "Cognitive Mastery",
            summary:
              "Think clearly under pressure. Make decisions without full certainty.",
          },
          {
            title: "Character Core",
            summary:
              "Act with strength when the cost is high. Build conviction and bounceback.",
          },
          {
            title: "Trust Dynamics",
            summary:
              "Lead through influence, story, and group energy—not just authority.",
          },
        ].map(({ title, summary }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 * index }}
            className="p-6 border border-gray-200 shadow-md rounded-2xl bg-white hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
