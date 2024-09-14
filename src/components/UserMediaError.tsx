import styles from "./UserMediaError.module.css";
import { VideoCameraSlashIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

function UserMediaError() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
        x: "-50%",
        y: "-50%",
        transformOrigin: "center",
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.3,
        type: "spring",
        delay: 0.2,
        bounce: 1,
        damping: 12,
      }}
      className={styles.container}
    >
      <VideoCameraSlashIcon className={styles.camera__icon} />
      <h1>
        Unable to access camera. Please allow camera access and refresh the
        page.
      </h1>
    </motion.div>
  );
}

export default UserMediaError;
