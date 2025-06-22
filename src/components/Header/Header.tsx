import styles from "./Header.module.css"
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={styles.header}>
            <NavLink to="/">
                <img src="/logo.svg" alt="logo" className={styles.logo}/>
                <img src="/galactic_analyst.svg" alt="galactic_analyst" className={styles.logo}/>
            </NavLink>
            <div className={styles.menu}>
                <NavLink
                    to="/"
                    className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                    <img src="/icons/analysis.svg" alt="analysis" className={styles.icon}/>
                    CSV Аналитик
                </NavLink>
                <NavLink
                    to="/generate"
                    className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                    <img src="/icons/generate.svg" alt="logo" className={styles.icon}/>
                    CSV Генератор
                </NavLink>
                <NavLink
                    to="/history"
                    className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                    <img src="/icons/history.svg" alt="logo" className={styles.icon}/>
                    История
                </NavLink>
            </div>
        </div>
    )
}