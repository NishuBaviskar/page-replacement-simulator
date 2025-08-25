import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from './Icons';

const TheoryModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-card dark:bg-dark-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground dark:text-dark-foreground">Algorithm Theory</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-muted-foreground dark:text-dark-muted-foreground hover:bg-muted dark:hover:bg-dark-muted"
                >
                  <XIcon size={24} />
                </button>
              </div>
              
              <div className="space-y-6 text-card-foreground dark:text-dark-card-foreground">
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-primary dark:text-dark-primary">FIFO (First-In, First-Out)</h3>
                  <p>The simplest page replacement algorithm. It replaces the page that has been in memory the longest. It maintains a queue of pages in the order they entered memory. When a page fault occurs and frames are full, the page at the head of the queue is evicted.</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Analogy:</strong> A queue for a ticket counter. The first person to get in line is the first to be served.</li>
                    <li><strong>Complexity:</strong> O(1) for finding the page to replace.</li>
                    <li><strong>Weakness:</strong> Suffers from <a href="https://en.wikipedia.org/wiki/Belady%27s_anomaly" target="_blank" rel="noopener noreferrer" className="underline text-primary dark:text-dark-primary">Belady's Anomaly</a>, where increasing the number of frames can paradoxically increase the number of page faults.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-accent dark:text-dark-accent">LRU (Least Recently Used)</h3>
                  <p>This algorithm replaces the page that has not been used for the longest period of time. It's based on the principle of locality of reference, assuming that a page used recently is likely to be used again soon.</p>
                   <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Analogy:</strong> A stack of plates. You always take the top plate (most recently used), and the plate at the bottom is the least recently used.</li>
                    <li><strong>Complexity:</strong> Implementation varies. A naive approach is O(n) per access, but can be optimized to O(1) using a hash map and a doubly linked list.</li>
                    <li><strong>Strength:</strong> Generally performs well and does not suffer from Belady's Anomaly.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-purple-500 dark:text-purple-400">Optimal (OPT / Belady's Algorithm)</h3>
                  <p>The optimal algorithm replaces the page that will not be used for the longest period of time in the future. It provides the best possible performance, resulting in the fewest page faults.</p>
                   <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Analogy:</strong> Having a crystal ball. You can see the entire future sequence of page requests and make the perfect decision.</li>
                    <li><strong>Complexity:</strong> O(n) to look ahead in the reference string.</li>
                    <li><strong>Weakness:</strong> It is impossible to implement in a real-world general-purpose operating system because it requires knowledge of the future. It is primarily used as a benchmark to evaluate other algorithms.</li>
                  </ul>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TheoryModal;