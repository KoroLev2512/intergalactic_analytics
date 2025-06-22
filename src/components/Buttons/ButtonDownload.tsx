import styles from './Buttons.module.css';

export const ButtonDownload = ({ label }: { label?: string }) => {
  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.buttonDownload}>
        <div className={styles.loaderSpinner}>
          <img src="/icons/loader.svg" alt="loader" />
        </div>
      </button>
      {label && <span className={styles.description}>{label}</span>}
    </div>
  );
};
