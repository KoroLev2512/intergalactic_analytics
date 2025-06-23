import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Link } from 'react-router';
import { FileService, type StoredFile } from '../../services/file';
import { Modal } from '../../components/Modal';
import styles from './History.module.css';

export const HistoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [selectedHighlights, setSelectedHighlights] = useState<
    | {
        value: string | number;
        description: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    const storedFiles = FileService.getFiles();
    console.log('Полученные файлы в HistoryPage:', storedFiles);
    setFiles(storedFiles);
  }, []);

  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    FileService.setFiles(updatedFiles);
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        {files.map((file, index) => (
          <div key={index} className={styles.row}>
            <div
              className={styles.rowContent}
              onClick={() => {
                const fileData = file.processed
                  ? [
                      {
                        value:
                          file.total_spend_galactic !== undefined
                            ? String(file.total_spend_galactic)
                            : '',
                        description: 'общие расходы в галактических кредитах',
                      },
                      {
                        value: file.rows_affected !== undefined ? String(file.rows_affected) : '',
                        description: 'количество обработанных записей',
                      },
                      {
                        value: file.less_spent_at !== undefined ? String(file.less_spent_at) : '',
                        description: 'день года с минимальными расходами',
                      },
                      {
                        value: file.big_spent_civ ?? '',
                        description: 'цивилизация с максимальными расходами',
                      },
                      {
                        value: file.less_spent_civ ?? '',
                        description: 'цивилизация с минимальными расходами',
                      },
                      {
                        value: file.big_spent_at !== undefined ? String(file.big_spent_at) : '',
                        description: 'день года с максимальными расходами',
                      },
                      {
                        value:
                          file.big_spent_value !== undefined ? String(file.big_spent_value) : '',
                        description: 'максимальная сумма расходов за день',
                      },
                      {
                        value:
                          file.average_spend_galactic !== undefined
                            ? String(file.average_spend_galactic)
                            : '',
                        description: 'средние расходы в галактических кредитах',
                      },
                    ]
                  : null;
                setSelectedHighlights(fileData);
                setIsModalOpen(true);
              }}
            >
              <div className={styles.rowFile}>
                <img src="/icons/file.svg" alt="file" />
                <span className={styles.rowFileName}>{file.name}</span>
              </div>
              <div className={styles.rowStaticContent}>
                <div className={styles.rowDate}>
                  {new Date(file.date).toLocaleDateString('ru-RU')}
                </div>
                <div className={`${styles.rowStatus} ${file.processed ? '' : styles.grayStatus}`}>
                  <span className={styles.rowStatusProcessed}>Обработан успешно</span>
                  <img
                    src={
                      file.processed
                        ? '/icons/smile_happy_black.svg'
                        : '/icons/smile_happy_gray.svg'
                    }
                    alt="smile_happy"
                  />
                </div>
                <div className={`${styles.rowStatus} ${file.processed ? styles.grayStatus : ''}`}>
                  <span className={styles.rowStatusProcessed}>Не удалось обработать</span>
                  <img
                    src={
                      file.processed ? '/icons/smile_sad_gray.svg' : '/icons/smile_sad_black.svg'
                    }
                    alt="smile_sad"
                  />
                </div>
              </div>
            </div>
            <button className={styles.rowDelete} onClick={() => handleDelete(index)}>
              <img src="/icons/trash.svg" alt="trash" />
            </button>
          </div>
        ))}
        <div className={styles.buttons}>
          <Link to="/generate" style={{ textDecoration: 'none' }}>
            <button className={styles.buttonGenerate}>Сгенерировать больше</button>
          </Link>
          {files.length > 0 && (
            <button
              className={styles.buttonClear}
              onClick={() => {
                setFiles([]);
                FileService.clearFiles();
              }}
            >
              Очистить всё
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedHighlights ? (
          <div className={styles.highlights}>
            {selectedHighlights.slice(0, 4).map((h, idx) => (
              <div key={idx} className={styles.highlight}>
                <span className={styles.highlightTitle}>{h.value}</span>
                <span className={styles.highlightDescription}>{h.description}</span>
              </div>
            ))}
            {selectedHighlights.slice(4).map((h, idx) => (
              <div key={idx} className={styles.highlight}>
                <span className={styles.highlightTitle}>{h.value}</span>
                <span className={styles.highlightDescription}>{h.description}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.notHighlights}>Хайлайты недоступны для этого файла</div>
        )}
      </Modal>
    </>
  );
};
