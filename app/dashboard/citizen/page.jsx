"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getUserReports } from "@/lib/reports";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authUtils";


export default function CitizenDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ correct usage here

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userReports = await getUserReports(user.uid);
      setReports(userReports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading reports...
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 py-10 px-4 relative">
      {/* ✅ Logout button (top-right corner) */}
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">
            Citizen Dashboard 🌱
          </h1>
          <Link
            href="/dashboard/citizen/report"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Report Waste
          </Link>
        </div>

        {reports.length === 0 ? (
          <p className="text-gray-600 text-center">
            You haven’t reported any waste yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {reports.map((r) => (
              <div
                key={r.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between"
              >
                <div>
                  <h2 className="font-semibold text-lg">{r.description}</h2>
                  <p className="text-sm text-gray-500">{r.location}</p>
                  <p
                    className={`text-sm mt-1 font-medium ${
                      r.status === "resolved"
                        ? "text-green-600"
                        : r.status === "in-progress"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    Status: {r.status}
                  </p>
                </div>

                {r.photoURL && (
                  <img
                    src={r.photoURL}
                    alt="Report"
                    className="w-24 h-24 object-cover rounded-lg mt-3 md:mt-0"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
