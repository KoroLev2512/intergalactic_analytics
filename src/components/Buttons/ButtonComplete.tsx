import styles from './Buttons.module.css';

interface ButtonCompleteProps {
  label?: string;
  descriptionLabel: string;
}

export const ButtonComplete = ({ label = 'Done!', descriptionLabel }: ButtonCompleteProps) => {
  return (
    <>
      <div className={styles.buttonsGroup}>
        <button className={styles.buttonComplete}>{label}</button>
        <button className={styles.buttonRemove} onClick={() => window.location.reload()}>
          <img src="/icons/close.svg" alt="close" />
        </button>
      </div>
      <span className={styles.description}>{descriptionLabel}</span>
    </>
  );
};
