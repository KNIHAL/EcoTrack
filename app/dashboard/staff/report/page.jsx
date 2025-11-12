"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getStaffReports, resolveReport } from "@/lib/reports";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function StaffReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🧭 Fetch assigned reports for logged-in staff
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const role = await getUserRole(user.uid);
      if (role !== "staff") {
        router.push("/not-authorized");
        return;
      }

      const assignedReports = await getStaffReports(user.uid);
      setReports(assignedReports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // ✅ Mark a report as resolved
  const handleResolve = async (reportId) => {
    await resolveReport(reportId);
    alert("Report marked as resolved ✅");
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, status: "resolved" } : r
      )
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading assigned reports...
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Staff Reports Dashboard 👷‍♂️
        </h1>

        {reports.length === 0 ? (
          <p className="text-gray-600 text-center">
            No reports assigned yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {reports.map((r) => (
              <div
                key={r.id}
                className="bg-white p-4 rounded-xl shadow flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
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
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                {r.status !== "resolved" && (
                  <button
                    onClick={() => handleResolve(r.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
