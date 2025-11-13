"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getStaffReports } from "@/lib/reports";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authUtils";

export default function StaffAssignedReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return router.push("/login");

      const role = await getUserRole(user.uid);
      if (role !== "staff") return router.push("/not-authorized");

      const assigned = await getStaffReports(user.uid);
      setReports(assigned);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 p-6">
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-4">My Assigned Reports</h1>

      {reports.length === 0 ? (
        <p className="text-gray-600">No reports assigned to you yet.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-semibold">{r.description}</h2>

              {/* FIXED LOCATION DISPLAY */}
              <p className="text-sm text-gray-600">
                {typeof r.location === "string"
                  ? r.location
                  : `${r.location.lat}, ${r.location.lng}`}
              </p>

              <p className="text-sm mt-1">Status: {r.status}</p>

              {r.photoURL && (
                <img
                  src={r.photoURL}
                  alt="Report"
                  className="w-32 h-32 mt-2 rounded object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
