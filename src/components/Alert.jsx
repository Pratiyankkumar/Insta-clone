/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function Alert({ text, isVisible, onHide }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-2 z-50  right-[8px] flex md:justify-normal justify-center items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-700"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
