import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

export default function CognitiveMastery() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/meta-skills/cognitive-mastery.md")
      .then((res) => res.text())
      .then(setMarkdown);
  }, []);

  const linkMap = {
    "First Principles Thinking": "/meta-skills/first-principles-thinking.md",
    "Decision-Making Under Uncertainty": "/meta-skills/decision-making.md",
    "Scenario Thinking": "/meta-skills/scenario-thinking.md",
    "Feedback Calibration": "/meta-skills/feedback-calibration.md",
    "Bayesian Updating": "/meta-skills/bayesian-updating.md",
  };

  const components = {
    a: ({ href, children }) => {
      const text = children[0];
      const resolvedLink = linkMap[text] || href;
      return (
        <a href={resolvedLink} className="text-blue-600 hover:underline">
          {text}
        </a>
      );
    },
    h1: (props) => <h1 className="text-4xl font-bold my-6" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold my-4" {...props} />,
    p: (props) => <p className="text-gray-700 leading-relaxed my-2" {...props} />,
    ul: (props) => <ul className="list-disc list-inside text-gray-700 space-y-1 my-2" {...props} />, 
    li: (props) => <li className="ml-4" {...props} />,
    table: (props) => <table className="table-auto w-full border border-gray-300 my-6" {...props} />, 
    thead: (props) => <thead className="bg-gray-100" {...props} />, 
    th: (props) => <th className="border px-4 py-2 text-left font-medium" {...props} />, 
    td: (props) => <td className="border px-4 py-2 text-sm text-gray-700" {...props} />,
  };

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {markdown}
        </ReactMarkdown>
      </motion.div>

      <section className="mt-12 space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Related Practice Tools</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>
            <a href="/evaluation-tools/cognitive-mastery-diagnostic.md" className="text-blue-600 hover:underline">
              Diagnostic Tool
            </a>
          </li>
          <li>
            <a href="/scenario-templates/cognitive-scenarios.md" className="text-blue-600 hover:underline">
              Simulation Deck
            </a>
          </li>
          <li>
            <a href="/coaching-playbook/cognitive-field-notes.md" className="text-blue-600 hover:underline">
              Field Notes
            </a>
          </li>
          <li>
            <a href="/meta-skills/cognitive-flywheel-case.md" className="text-blue-600 hover:underline">
              Flywheel Case Study
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
