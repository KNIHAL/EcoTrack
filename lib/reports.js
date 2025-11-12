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
   ✅ 1️⃣ Add a new report
------------------------------ */
export const addReport = async (userId, description, location, photoURL = null) => {
  const reportsRef = collection(db, "reports");
  await addDoc(reportsRef, {
    createdBy: userId,
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
   ✅ 3️⃣ Get all reports for authorities (all users)
------------------------------ */
export const getAllReports = async () => {
  const snapshot = await getDocs(collection(db, "reports"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/* ------------------------------
   ✅ 4️⃣ Get reports assigned to a staff member
------------------------------ */
export const getStaffReports = async (staffId) => {
  const q = query(collection(db, "reports"), where("assignedTo", "==", staffId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/* ------------------------------
   ✅ 5️⃣ Assign a report to staff
------------------------------ */
export const assignReport = async (reportId, staffId) => {
  const reportRef = doc(db, "reports", reportId);
  await updateDoc(reportRef, {
    assignedTo: staffId,
    status: "in-progress",
  });
};

/* ------------------------------
   ✅ 6️⃣ Mark report as resolved (staff)
------------------------------ */
export const resolveReport = async (reportId) => {
  const reportRef = doc(db, "reports", reportId);
  await updateDoc(reportRef, {
    status: "resolved",
  });
};

/* ------------------------------
   ✅ 7️⃣ Get single report details (optional)
------------------------------ */
export const getReportById = async (reportId) => {
  const ref = doc(db, "reports", reportId);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) return { id: snapshot.id, ...snapshot.data() };
  return null;
};
