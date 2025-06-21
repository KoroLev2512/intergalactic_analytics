import styles from "./Buttons.module.css"

interface ButtonSendProps {
    onClick?: () => void;
}

export const ButtonSend = ({ onClick }: ButtonSendProps) => {
    return (
        <div className={styles.buttons}>
            <button className={styles.buttonSend} onClick={onClick}>
                Загрузить файл
            </button>
            <span className={styles.description}>
                или перетащите сюда
            </span>
        </div>
    );
};
