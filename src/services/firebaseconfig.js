import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqYWVopacqK_an0uVbjIgV9xeX_j47yM0",
  authDomain: "lista-tarefas-cb079.firebaseapp.com",
  projectId: "lista-tarefas-cb079",
  storageBucket: "lista-tarefas-cb079.appspot.com",
  messagingSenderId: "187603547401",
  appId: "1:187603547401:web:1af6fb7e108b8face00fd8",
  measurementId: "G-FB7VHHC138"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db};