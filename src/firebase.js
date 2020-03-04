import firebase from 'firebase'

const firebaseConfig = firebase.initializeApp({
  apiKey: '',
  authDomain: 'chronos-30774.firebaseapp.com',
  databaseURL: 'https://chronos-30774.firebaseio.com',
  projectId: 'chronos-30774',
  storageBucket: 'chronos-30774.appspot.com',
  messagingSenderId: '890028458433',
  appId: '1:890028458433:web:1be080c3e824aa218def40'
})

export { firebaseConfig as firebase }
