import { Uploader } from '../../components/Uploader';
import styles from './MainPage.module.css';
import { Header } from '../../components/Header';

function Main() {
  return (
    <div className={styles.app}>
      <Header />
      <Uploader />
    </div>
  );
}

export default Main;
