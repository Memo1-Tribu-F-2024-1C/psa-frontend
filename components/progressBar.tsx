import React from 'react';
import styles from './progressBar.module.css';

const ProgressBar = ({ totalTasks, completedTasks } : { totalTasks: any, completedTasks: any }) => {
  const progressPercentage = (completedTasks / totalTasks) * 100 || 0;

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}>{progressPercentage}%</div>
    </div>
  );
};

export default ProgressBar;
