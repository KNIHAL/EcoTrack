"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authUtils";


export default function StaffDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) router.push("/login");
      else {
        const role = await getUserRole(u.uid);
        if (role !== "staff") router.push("/not-authorized");
        else setUser(u);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
      <button
        onClick={() => logoutUser(router)}
        className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Staff Dashboard 👷‍♂️
      </h1>
      <p className="text-gray-600">Welcome, {user.email}</p>
    </main>
  );
}
