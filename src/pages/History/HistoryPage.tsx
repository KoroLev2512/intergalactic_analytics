import styles from './History.module.css';
import {Header} from "../../components/Header";
import {Link} from "react-router";

interface HistoryProps {
    files: { name: string; date: string; processed: boolean; }[];
    setFiles: React.Dispatch<React.SetStateAction<{ name: string; date: string; processed: boolean; }[]>>;
}

export const HistoryPage: React.FC<HistoryProps> = ({ files, setFiles }) => {
    const handleDelete = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.container}>
            <Header/>
            {files.map((file, index) => (
                <div key={index} className={styles.row}>
                    <div className={styles.rowContent}>
                        <div className={styles.rowFile}>
                            <img
                                src="/icons/file.svg"
                                alt="file"
                            />
                            <span className={styles.rowFileName}>
                                {file.name}
                            </span>
                        </div>
                        <div className={styles.rowDate}>
                            {file.date}
                        </div>
                        <div
                            className={`${styles.rowStatus} ${file.processed ? styles.grayStatus : ''}`}
                        >
                            <span className={styles.rowStatusProcessed}>
                                Обработан успешно
                            </span>
                            <img
                                src="/icons/smile_happy.svg"
                                alt="smile_happy"
                            />
                        </div>
                        <div
                            className={`${styles.rowStatus} ${file.processed ? '' : styles.grayStatus}`}
                        >
                            <span className={styles.rowStatusProcessed}>
                                Не удалось обработать
                            </span>
                            <img
                                src="/icons/smile_sad.svg"
                                alt="smile_sad"
                            />
                        </div>
                    </div>
                    <button
                        className={styles.rowDelete}
                        onClick={() => handleDelete(index)}
                    >
                        <img
                            src="/icons/trash.svg"
                            alt="trash"
                        />
                    </button>
                </div>
            ))}
            <div className={styles.buttons}>
                <Link to="/generate" style={{ textDecoration: 'none' }}>
                    <button className={styles.buttonGenerate}>
                        Сгенерировать больше
                    </button>
                </Link>
                {files.length > 0 &&
                    <button className={styles.buttonClear} onClick={() => setFiles([])}>
                        Очистить всё
                    </button>}
            </div>
        </div>
    );
};
