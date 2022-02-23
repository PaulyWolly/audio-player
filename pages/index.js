import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { AudioPlayer } from '../components/AudioPlayer'
import {useRouter} from 'next/router'

export default function Home() {

  const router = useRouter();
  console.log(router.query)
  const {t} = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>React Audio Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AudioPlayer timeJump={t} />
      </main>

    </div>
  )
}
