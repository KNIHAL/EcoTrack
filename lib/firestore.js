import { getFirestore, doc, setDoc, getDoc, getDocs, updateDoc, collection, query, where } from "firebase/firestore";

const db = getFirestore();

// ✅ Get user role by UID
export const getUserRole = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) return snap.data().role;
  return null;
};

// ✅ Create user document with system admin check
export const createUserDocument = async (user, role = "citizen", extraData = {}) => {
  if (!user) return;

  // 👇 force system admin role if this email matches your own
  const isSystemAdmin = user.email === "nihalpandey1205@example.com";

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    role: isSystemAdmin ? "system-admin" : role,
    approved: isSystemAdmin ? true : role === "citizen",
    createdAt: new Date(),
    ...extraData,
  });
};

// ✅ Get all pending users (by role)
export const getPendingUsers = async (role) => {
  const q = query(collection(db, "users"), where("role", "==", role), where("approved", "==", false));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Approve user by UID
export const approveUser = async (uid) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { approved: true });
};
