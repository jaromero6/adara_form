import Head from 'next/head'

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
            <img src="https://www.adarastyling.com/static/media/adaramenu.88c2b2bc.svg" className={styles.logo}/>
            <div className={styles.content}>
                <RegisterForm />
                <GetUser />
            </div>

      </main>
    </div>
  )
}
