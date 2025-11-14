"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getPendingUsers, approveUser } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authUtils";

export default function PendingAuthorities() {
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      // ✅ if not logged in
      if (!u) {
        router.push("/login");
        setLoading(false);
        return;
      }

      // ✅ safe admin email check (case-insensitive + null safe)
      if (u?.email?.toLowerCase() === "admin@example.com") {
        const pending = await getPendingUsers("authority");
        setAuthorities(pending);
      } else {
        router.push("/not-authorized");
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleApprove = async (uid) => {
    await approveUser(uid);
    alert("Authority approved!");
    setAuthorities(authorities.filter((a) => a.uid !== uid));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center py-10 relative">
      {/* ✅ Logout button */}
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Pending Authority Approvals
      </h1>

      {authorities.length === 0 ? (
        <p className="text-gray-500">No pending authorities 🎉</p>
      ) : (
        <div className="space-y-4 w-full max-w-md">
          {authorities.map((a) => (
            <div
              key={a.uid}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{a.orgName || "Unknown Org"}</p>
                <p className="text-sm text-gray-600">{a.email}</p>
                <p className="text-xs text-gray-500">{a.orgAddress}</p>
              </div>
              <button
                onClick={() => handleApprove(a.uid)}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
