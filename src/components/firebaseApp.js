import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAjDyw84pKDs0P5tqM8P7g3eSXeKj8GGSg",
  authDomain: "resumebuilder-3db6c.firebaseapp.com",
  projectId: "resumebuilder-3db6c",
  storageBucket: "resumebuilder-3db6c.appspot.com",
  messagingSenderId: "234122835276",
  appId: "1:234122835276:web:a9b978abd2ec34844bcbe9",
  measurementId: "G-GXRNS5BBXL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)