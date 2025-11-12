"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getUserRole, getPendingUsers, approveUser } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function PendingStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const unsub = auth.onAuthStateChanged(async (u) => {
        if (!u) router.push("/login");
        else {
          const role = await getUserRole(u.uid);
          if (role !== "authority") router.push("/not-authorized");
          else {
            const pending = await getPendingUsers("staff");
            setStaff(pending);
          }
        }
        setLoading(false);
      });
      return () => unsub();
    };
    check();
  }, [router]);

  const handleApprove = async (uid) => {
    await approveUser(uid);
    alert("Staff approved!");
    setStaff(staff.filter((s) => s.uid !== uid));
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Pending Staff Approvals</h1>
      {staff.length === 0 ? (
        <p className="text-gray-500">No pending staff approvals 🎉</p>
      ) : (
        <div className="space-y-4 w-full max-w-md">
          {staff.map((s) => (
            <div key={s.uid} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{s.name || "Unnamed"}</p>
                <p className="text-sm text-gray-600">{s.email}</p>
                <p className="text-xs text-gray-500">{s.organization}</p>
              </div>
              <button
                onClick={() => handleApprove(s.uid)}
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
