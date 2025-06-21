import styles from "./Buttons.module.css"

interface ButtonFileProps {
    label?: string;
    onClick?: () => void;
}

export const ButtonFile = ({ label = "Done!" }: ButtonFileProps) => {
    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.buttonsGroup}>
                <button className={styles.buttonFile}>
                    {label}
                </button>
                <button className={styles.buttonRemove} onClick={() => window.location.reload()}>
                    <img src="/icons/close.svg" alt="close"/>
                </button>
            </div>
            <span className={styles.description}>
                файл загружен!
            </span>
        </div>
    );
};
