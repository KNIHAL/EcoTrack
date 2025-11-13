"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authUtils";
import { getAllReports } from "@/lib/reports";
import Link from "next/link";

export default function StaffDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ pending: 0, progress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return router.push("/login");

      const role = await getUserRole(user.uid);
      if (role !== "staff") return router.push("/not-authorized");

      const reports = await getAllReports();

      setStats({
        pending: reports.filter((r) => r.status === "pending").length,
        progress: reports.filter((r) => r.status === "in-progress").length,
        resolved: reports.filter((r) => r.status === "resolved").length,
      });

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return null;

  return (
    <main className="min-h-screen bg-green-50 p-6">
      {/* Logout */}
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Staff Dashboard 👷‍♂️
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-red-500">Pending</h2>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-yellow-600">
            In Progress
          </h2>
          <p className="text-3xl font-bold">{stats.progress}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-green-600">Resolved</h2>
          <p className="text-3xl font-bold">{stats.resolved}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-4 max-w-sm">
        <Link
          href="/dashboard/staff/report"
          className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center"
        >
          View All Reports
        </Link>

        <Link
          href="/dashboard/staff/assigned"
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
        >
          My Assigned Reports
        </Link>
      </div>
    </main>
  );
}
