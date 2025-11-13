"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { addReport } from "@/lib/reports";
import { useRouter } from "next/navigation";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function ReportWaste() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return router.push("/login");

    setLoading(true);

    try {
      let photoURL = null;

      if (photo) {
        const storage = getStorage();
        const storageRef = ref(storage, `reports/${user.uid}-${Date.now()}`);
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      }

      await addReport(user.uid, description, location, photoURL);

      alert("Report submitted!");
      router.push("/dashboard/citizen");

    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-green-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Report Waste 🗑️</h1>

      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4">

        <textarea
          placeholder="Describe the waste issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24"
          required
        />

        <input
          type="text"
          placeholder="Location (e.g. Sector 12, Delhi)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full border p-2 rounded bg-gray-50"
        />

        <button type="submit" disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded">
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </section>
  );
}
