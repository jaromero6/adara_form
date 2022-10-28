import Head from 'next/head'
import Image from 'next/image'

import RegisterForm from '../components/RegisterForm';
import GetUser from '../components/GetUser';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adara Test App</title>
        <meta name="description" content="Adara test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
            <h1>Adara Styling</h1>
            <div className={styles.content}>
                <RegisterForm />
                <GetUser />
            </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
