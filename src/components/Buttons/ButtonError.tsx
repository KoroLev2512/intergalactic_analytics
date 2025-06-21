import styles from "./Buttons.module.css"

interface ButtonErrorProps {
    label?: string;
}

export const ButtonError = ({ label = "Ошибка" }: ButtonErrorProps) => {    return (
        <>
            <div className={styles.buttonsGroup}>
                <button className={styles.buttonError}>
                    {label}
                </button>
                <button className={styles.buttonRemove} onClick={() => window.location.reload()}>
                    <img src="/icons/close.svg" alt="close"/>
                </button>
            </div>
            <span className={styles.descriptionError}>
                упс, не то...
            </span>
        </>
    );
};
