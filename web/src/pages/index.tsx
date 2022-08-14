import HeadHelper from 'components/atoms/HeadHelper';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadHelper titleElem="Home"></HeadHelper>

      <main className={styles.main}>
        <p>test</p>
      </main>
    </div>
  );
};

export default Home;
