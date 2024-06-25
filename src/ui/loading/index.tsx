import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer} role="status">
      <div
        className={styles.loadingSpinner}
        data-testid="loading-spinner"
      ></div>
    </div>
  );
};

export default Loading;
