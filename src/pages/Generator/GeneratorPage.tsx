import {Header} from "../../components/Header";
import {useState} from "react";
import {ButtonDownload} from "../../components/Buttons";
import {ButtonError} from "../../components/Buttons";
import {ButtonComplete} from "../../components/Buttons";
import styles from './Generator.module.css';


export const GeneratorPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const params = new URLSearchParams({
                size: "1", // Выставляй сюды размер отчета в ГБ
                withErrors: "off", // Сюды включать ли ошибки в отчет
                maxSpend: "1000" // А сюды максимальную сумму расходов
            });

            const response = await fetch(`http://localhost:3000/report?${params.toString()}`);
            if (!response.ok) {
                console.error("Ошибка генерации отчета:", await response.text());
                setHasError(true);
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "report.csv";
            document.body.appendChild(link);
            link.click();
            link.remove();
            setIsComplete(true);
        } catch (e) {
            console.error("Ошибка при генерации:", e);
            setHasError(true);
        } finally {
            setIsGenerating(false);
            setTimeout(() => setHasError(false), 30000);
            setTimeout(() => setIsComplete(false), 30000);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.text}>
                Сгенерируйте готовый csv-файл нажатием одной кнопки
            </div>
            {isGenerating ? (
                <ButtonDownload />
            ) : hasError ? (
                <ButtonError />
            ) : isComplete ? (
                <ButtonComplete descriptionLabel="файл сгенерирован!"/>
            ) : (
                <button
                    className={styles.buttonGenerate}
                    onClick={handleGenerate}
                >
                    Начать генерацию
                </button>
            )}
            {isGenerating && (
                <span className={styles.descriptionDownload}>
                    идёт процесс генерации
                </span>
            )}
        </div>
    );
};
