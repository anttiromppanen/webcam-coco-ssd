import { motion } from "framer-motion";
import { ThreeCircles } from "react-loader-spinner";
import styles from "./LoadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={styles.loading__screen}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <ThreeCircles color="white" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        Loading machine learning model...
      </motion.h1>
    </div>
  );
}

export default LoadingScreen;
