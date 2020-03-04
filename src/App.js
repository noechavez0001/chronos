import React, { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import AddData from './components/AddData'
import ListCards from './components/ListCards'
import { firebase } from './firebase'

function App () {
  const [data, setData] = useState([])
  const [emails, setemails] = useState([])
  const [typeData, setTypeData] = useState('personas')
  // const [collections, setCollections] = useState([])

  const collections = [
    {
      name: 'personas',
      description: 'Collection of persons'
    },
    {
      name: 'emails',
      description: 'Collection of emails'
    }
  ]

  useEffect(() => {
    firebase.firestore().collection(typeData).get()
      .then((snapshot) => {
        const items = []
        snapshot.docs.forEach(doc => {
          items.push({ data: doc.data(), id: doc.id })
        })
        if (typeData === 'personas') {
          setData({ data: items })
        } if (typeData === 'emails') {
          setemails({ emails: items })
        }
      })
  }, [typeData])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('personas').onSnapshot(snapshot => {
      const items = []
      snapshot.docs.forEach(doc => {
        items.push({ data: doc.data(), id: doc.id })
      })
      setData({ data: items })
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('emails').onSnapshot(snapshot => {
      const items = []
      snapshot.docs.forEach(doc => {
        items.push({ data: doc.data(), id: doc.id })
      })
      setemails({ emails: items })
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Sidebar
        data={data}
        emails={emails}
        type={typeData}
      />
      <Header />
      <ListCards
        collections={collections}
        onTypeChange={(type) => {
          setTypeData(type)
        }}
      />
      <AddData
        type={typeData}
      />
    </>
  )
}

export default App
