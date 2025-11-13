"use client";
import { useEffect, useState } from "react";
import { getAllReports, assignReport, resolveReport } from "@/lib/reports";
import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authUtils";

export default function StaffReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) return router.push("/login");

      const role = await getUserRole(u.uid);
      if (role !== "staff") return router.push("/not-authorized");

      const data = await getAllReports();
      setReports(data);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleStart = async (reportId) => {
    await assignReport(reportId, auth.currentUser.uid);
    alert("Marked as In-Progress");
    refreshReports();
  };

  const handleResolve = async (reportId) => {
    await resolveReport(reportId);
    alert("Marked as Resolved");
    refreshReports();
  };

  const refreshReports = async () => {
    const data = await getAllReports();
    setReports(data);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading reports...
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 p-6">
      {/* Logout */}
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Manage Waste Reports 🗑️
      </h1>

      {reports.length === 0 ? (
        <p className="text-gray-600">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
            >
              <h2 className="font-semibold text-lg">{r.description}</h2>

              <p className="text-sm text-gray-700">
                <strong>Location:</strong>{" "}
                {typeof r.location === "string"
                  ? r.location
                  : `Lat: ${r.location.lat}, Lng: ${r.location.lng}`}
              </p>

              <p className="text-sm">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    r.status === "resolved"
                      ? "text-green-600"
                      : r.status === "in-progress"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {r.status}
                </span>
              </p>

              {r.photoURL && (
                <img
                  src={r.photoURL}
                  alt="Report"
                  className="w-32 h-32 rounded object-cover mt-2"
                />
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-3">
                {r.status === "pending" && (
                  <button
                    onClick={() => handleStart(r.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Mark In-Progress
                  </button>
                )}

                {r.status !== "resolved" && (
                  <button
                    onClick={() => handleResolve(r.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
