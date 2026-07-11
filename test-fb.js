import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIXl8zBAziXl610MX9wbFUfQvO3mwQuQo",
  authDomain: "jwss-stay.firebaseapp.com",
  projectId: "jwss-stay",
  storageBucket: "jwss-stay.firebasestorage.app",
  messagingSenderId: "839858358482",
  appId: "1:839858358482:web:429fc80577716089c1c50b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    console.log("Bookings fetched:", snapshot.docs.length);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
test();
