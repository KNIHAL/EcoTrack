import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore();

/* ------------------------------
   ✅ 1️⃣ Add a new report (FIXED)
------------------------------ */
export const addReport = async (uid, description, location, photoURL) => {
  await addDoc(collection(db, "reports"), {
    createdBy: uid,              // ✅ FIXED FIELD
    description,
    location,
    photoURL,
    status: "pending",
    assignedTo: null,
    createdAt: serverTimestamp(),
  });
};

/* ------------------------------
   ✅ 2️⃣ Get all reports for citizens
------------------------------ */
export const getUserReports = async (userId) => {
  const q = query(collection(db, "reports"), where("createdBy", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/* ------------------------------
   All other functions remain same
------------------------------ */
export const getAllReports = async () => {
  const q = query(collection(db, "reports"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getStaffReports = async (staffId) => {
  const q = query(collection(db, "reports"), where("assignedTo", "==", staffId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const assignReport = async (reportId, staffId) => {
  const reportRef = doc(db, "reports", reportId);
  await updateDoc(reportRef, {
    assignedTo: staffId,
    status: "in-progress",
  });
};

export const resolveReport = async (reportId) => {
  const reportRef = doc(db, "reports", reportId);
  await updateDoc(reportRef, {
    status: "resolved",
  });
};

export const getReportById = async (reportId) => {
  const ref = doc(db, "reports", reportId);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  return null;
};
