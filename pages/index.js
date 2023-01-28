import Head from 'next/head'
import Script from 'next/script';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { ErrMap } from '../components/error';
import { Loader } from '../components/loader';
import { MapWorld } from '../components/map';
import { TotalData } from '../components/table';

export default function Home() {
  const [seeMap, setSeeMap] = useState(false)
  const [json, setJson] = useState([])
  const [err, setErr] = useState(false)
  const [errMap, setErrMap] = useState(false)
  let time

  async function getPosts(){
    try{
      const res = await fetch("https://api.covid19api.com/summary")
      const data = await res.json()
    
      if(data.Message === "Caching in progress"){
        time = setTimeout(()=>{
          getPosts()
          console.log("N0thing Data, Caching")
        }, 60000)
      }else{
        clearTimeout(time)
      }
      
      setJson(data)
    }catch(err){
      setErr(true)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])
  //console.log(json)
  return (
    <div className={styles.container}>
      <Head>
        <title>Seguimiento Covid-19</title>
        <meta name="description" content="Map Covid" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsvectormap/dist/css/jsvectormap.min.css" />
      </Head>

      <main className={styles.main}>
        <p className={styles.title}>
          These Info are extracted of a database ownership ONU
        </p>
        
        <TotalData allData={json} setSeeMap={setSeeMap} err={err} />

        {!seeMap && !err &&
          <Loader />
        }

        {seeMap && !errMap &&
          <MapWorld allCountries={json.Countries} setErrMap={setErrMap} />
        }

        {errMap &&
          <ErrMap />
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Aguilera2509"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by{' '}
          <span className={styles.logo}>
            Jose Aguilera
          </span>
        </a>
      </footer>

      <Script src="https://cdn.jsdelivr.net/npm/jsvectormap"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/jsvectormap/dist/maps/world.js"></Script>
    </div>
  )
}