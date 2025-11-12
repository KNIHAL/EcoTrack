"use client";
import Link from "next/link";
import { logoutUser } from "@/lib/authUtils";
import { useRouter } from "next/navigation";

export default function AuthorityDashboard() {
  const router = useRouter(); // ✅ ye line add kar di

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center relative">
      {/* ✅ Logout Button */}
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Authority Dashboard 🧑‍💼
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your staff and monitor waste reports.
      </p>

      <Link
        href="/dashboard/authority/pending-staff"
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        View Pending Staff
      </Link>
    </main>
  );
}
