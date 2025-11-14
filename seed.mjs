import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqm6FT1mLeMoSnQFtRYAb0SIA2kTwHJMA",
  authDomain: "ecotrack-f34cc.firebaseapp.com",
  projectId: "ecotrack-f34cc",
  storageBucket: "ecotrack-f34cc.appspot.com",
  messagingSenderId: "729566226695",
  appId: "1:729566226695:web:2f086a832966d190e23da2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// USERS DATA TO SEED
const users = [
  {
    uid: "owtYQWfEbePNx8j21mcEaPnxT6O2",
    email: "citizen@example.com",
    role: "citizen",
    approved: true,
  },
  {
    uid: "yW7NPfqtDBduDwrwvVNZ8DnlF9r1",
    email: "staff@example.com",
    role: "staff",
    approved: true,
    authorityId: "GdD8t2acc2ULWyszOZPOFUP8OWy1"
  },
  {
    uid: "hwasmUQ5LVdTYpkxqMVExKAIqtY2",
    email: "authority@example.com",
    role: "authority",
    approved: true,
  },
  {
    uid: "ZqWBWFD35phGqyTIRcp6JP6fgLO2",
    email: "admin@example.com",
    role: "admin",
    approved: true,
  }
];

async function seedUsers() {
  for (const user of users) {
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, user);
    console.log(`✔ User created: ${user.email}`);
  }
  console.log("🔥 Seeding complete!");
}

seedUsers();
