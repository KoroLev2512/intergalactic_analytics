import { useState, useEffect } from 'react';
import styles from './History.module.css';
import {Header} from "../../components/Header";
import {Link} from "react-router";
import { FileService, type StoredFile } from '../../services/file';

export const HistoryPage: React.FC = () => {
    const [files, setFiles] = useState<StoredFile[]>([]);

    useEffect(() => {
        setFiles(FileService.getFiles());
    }, []);

    const handleDelete = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        FileService.setFiles(updatedFiles);
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
                        <div className={styles.rowStaticContent}>
                            <div className={styles.rowDate}>
                                {file.date}
                            </div>
                            <div
                                className={`${styles.rowStatus} ${file.processed ? '' : styles.grayStatus}`}
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
                                className={`${styles.rowStatus} ${file.processed ? styles.grayStatus : '' }`}
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
                    <button className={styles.buttonClear} onClick={() => {
                        setFiles([]);
                        FileService.clearFiles();
                    }}>
                        Очистить всё
                    </button>}
            </div>
        </div>
    );
};
