import { Header, MainScene, Sidebar } from '@/components';

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.canvasWrapper}>
          <MainScene />
        </div>
        <Sidebar />
      </main>
    </div>
  );
}
