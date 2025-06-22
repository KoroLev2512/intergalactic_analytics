import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.buttonRemove} onClick={onClose}>
                    <img src="/icons/close.svg" alt="close" />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};