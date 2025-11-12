"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getAllReports, assignReport } from "@/lib/reports";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function AuthorityReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState({});
  const router = useRouter();

  // 🧭 Load all reports (authority view)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const role = await getUserRole(user.uid);
      if (role !== "authority") {
        router.push("/not-authorized");
        return;
      }

      const allReports = await getAllReports();
      setReports(allReports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleAssign = async (reportId) => {
    if (!selectedStaff[reportId]) {
      alert("Please enter staff ID to assign this report.");
      return;
    }

    await assignReport(reportId, selectedStaff[reportId]);
    alert("Report assigned successfully!");
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, assignedTo: selectedStaff[reportId], status: "in-progress" } : r
      )
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading reports...
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Authority Reports Dashboard 🧾
        </h1>

        {reports.length === 0 ? (
          <p className="text-gray-600 text-center">
            No reports found yet.
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
                  {r.assignedTo && (
                    <p className="text-xs text-gray-500">
                      Assigned to: <span className="font-medium">{r.assignedTo}</span>
                    </p>
                  )}
                </div>

                {r.photoURL && (
                  <img
                    src={r.photoURL}
                    alt="Report"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                {r.status === "pending" && (
                  <div className="flex flex-col md:flex-row gap-2 items-center mt-2">
                    <input
                      type="text"
                      placeholder="Enter staff UID"
                      value={selectedStaff[r.id] || ""}
                      onChange={(e) =>
                        setSelectedStaff({ ...selectedStaff, [r.id]: e.target.value })
                      }
                      className="border p-2 rounded w-48"
                    />
                    <button
                      onClick={() => handleAssign(r.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Assign
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
