import admin from 'firebase-admin'
//import serviceAccount from './credentials.json'
require('dotenv').config()

let app
const clave = process.env.FIREBASE_CREDENTIALS

const credentials = {
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key":clave.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
}

if(!admin.apps.length){
    app = admin.initializeApp({
        credential: admin.credential.cert(credentials)
    });
}else{
    app = admin.app()
}
const database = app.firestore()

export default database
