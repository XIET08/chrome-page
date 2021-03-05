import React from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Search from '../components/search'
import Tiles from '../components/tiles'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <Search/>
      <Tiles/>
    </div>
  )
}
