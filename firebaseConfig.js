import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmysnlDxg55d4sL4mCkM_40gGICx_LxCk",
  authDomain: "loginreactnative-58345.firebaseapp.com",
  projectId: "loginreactnative-58345",
  storageBucket: "loginreactnative-58345.firebasestorage.app",
  messagingSenderId: "991364178247",
  appId: "1:991364178247:web:e3a6ffc48a2bebd12c6c62"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

