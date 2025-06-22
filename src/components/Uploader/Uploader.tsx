import {useRef, useState, useCallback} from "react";
import {ButtonComplete, ButtonDownload, ButtonError, ButtonFile, ButtonSend} from "../Buttons";
import styles from "./Uploader.module.css"
import { FileService } from "../../services/file";

export const Uploader = () => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<globalThis.File | null>(null);
    const [highlightData, setHighlightData] = useState<{ value: string | number; description: string }[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Загружен файл:", file.name);
            setFile(file);
            setFileUploaded(true);
            setHighlightData([]);
        }
    };

    const handleSend = useCallback(async () => {
        if (!file) return;

        setHighlightData([]);
        setIsLoading(true);
        setError(null);

        try {
            console.log("Отправка файла", file);
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/aggregate?rows=1000", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const text = await response.text();
                setError(`Ошибка от сервера: ${response.status} — ${text}`);
                return;
            }

            if (!response.body) {
                setError("Нет тела ответа");
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";
            let finalJson: any = null;
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                let parts = buffer.split("\n");

                for (let i = 0; i < parts.length - 1; i++) {
                    try {
                        const json = JSON.parse(parts[i]);
                        finalJson = json;
                        const highlights = [
                            { value: json.total_spend_galactic, description: "общие расходы в галактических кредитах" },
                            { value: json.rows_affected, description: "количество обработанных записей" },
                            { value: json.less_spent_at, description: "день года с минимальными расходами" },
                            { value: json.big_spent_civ, description: "цивилизация с максимальными расходами" },
                            { value: json.less_spent_civ, description: "цивилизация с минимальными расходами" },
                            { value: json.big_spent_at, description: "день года с максимальными расходами" },
                            { value: json.big_spent_value, description: "максимальная сумма расходов за день" },
                            { value: json.average_spend_galactic, description: "средние расходы в галактических кредитах" }
                        ];
                        setHighlightData(highlights);
                    } catch (e) {
                        console.error(e);
                    }
                }

                buffer = parts[parts.length - 1];
            }

            localStorage.setItem("upload-history", JSON.stringify({ date: new Date().toISOString(), filename: file.name }));

            if (finalJson) {
                console.log("Добавление файла в FileService:", {
                    name: file.name,
                    date: new Date().toISOString(),
                    processed: true,
                    total_spend_galactic: finalJson.total_spend_galactic,
                    rows_affected: finalJson.rows_affected,
                    less_spent_at: finalJson.less_spent_at,
                    big_spent_civ: finalJson.big_spent_civ,
                    less_spent_civ: finalJson.less_spent_civ,
                    big_spent_at: finalJson.big_spent_at,
                    big_spent_value: finalJson.big_spent_value,
                    average_spend_galactic: finalJson.average_spend_galactic,
                });
                FileService.addFile({
                    name: file.name,
                    date: new Date().toISOString(),
                    processed: true,
                    total_spend_galactic: finalJson.total_spend_galactic,
                    rows_affected: finalJson.rows_affected,
                    less_spent_at: finalJson.less_spent_at,
                    big_spent_civ: finalJson.big_spent_civ,
                    less_spent_civ: finalJson.less_spent_civ,
                    big_spent_at: finalJson.big_spent_at,
                    big_spent_value: finalJson.big_spent_value,
                    average_spend_galactic: finalJson.average_spend_galactic,
                });
            }
        } catch (e: any) {
            setError(e.message || "Ошибка загрузки");
            const errorFileInfo = {
                name: file?.name ?? "unknown",
                date: new Date().toISOString(),
                processed: false
            };
            console.log(errorFileInfo);
            console.log("Добавление ошибочного файла в FileService:", errorFileInfo);
            FileService.addFile(errorFileInfo);}
        finally {
            setIsLoading(false);
        }
    }, [file]);

    return (
        <div className={styles.uploader}>
            <div className={styles.uploaderTitle}>
                Загрузите <span>csv</span> файл и получите <span>полную информацию</span> о нём за сверхнизкое время
            </div>
            <div className={`${styles.uploaderField} ${fileUploaded ? styles.uploaderFieldUploaded : ''} ${error ? styles.uploaderFieldError : ''}`}
                onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                        if (!file.name.endsWith(".csv")) {
                            setFile(file);
                            setFileUploaded(true);
                            setHighlightData([]);
                            setError("упс, не то...");
                            FileService.addFile({
                                name: file?.name ?? "unknown",
                                date: new Date().toISOString(),
                                processed: false
                            });
                            return;
                        }
                        console.log("Файл перетянут:", file.name);
                        setFile(file);
                        setFileUploaded(true);
                        setHighlightData([]);
                    }
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                <div>
                    {!isLoading && highlightData.length > 0 ? (
                        <ButtonComplete label={file ? file.name : "Done!"} descriptionLabel={"готово!"} />
                    ) : isLoading ? (
                        <ButtonDownload label={"идёт парсинг файла"} />
                    ) : error ? (
                        <ButtonError label={file ? file.name : "Ошибка"} />
                    ) : file ? (
                        <ButtonFile label={file.name} onClick={() => inputRef.current?.click()} />
                    ) : (
                        <ButtonSend onClick={() => inputRef.current?.click()} />
                    )}
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
            </div>
            {!isLoading && highlightData.length === 0 && !error && (
                <button
                    className={styles.buttonSend}
                    onClick={handleSend}
                    disabled={!file}
                    style={!file ? { background: "#C0C0C0", color: "#787878", cursor: "not-allowed" } : {}}
                >
                    Отправить
                </button>
            )}
            {highlightData.length > 0 ? (
                <div className={styles.highlights}>
                    <div className={styles.highlightsLeft}>
                        {highlightData.slice(0, 4).map((h, idx) => (
                            <div key={idx} className={styles.highlight}>
                                <span className={styles.highlightTitle}>{h.value}</span>
                                <span className={styles.highlightDescription}>{h.description}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.highlightsRight}>
                        {highlightData.slice(4).map((h, idx) => (
                            <div key={idx} className={styles.highlight}>
                                <span className={styles.highlightTitle}>{h.value}</span>
                                <span className={styles.highlightDescription}>{h.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.notHighlights}>
                    Здесь<br/>появятся хайлайты
                </div>
            )}
        </div>
    );
};
