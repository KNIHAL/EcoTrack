"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserDocument } from "@/lib/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDocument(user, "citizen");
    alert("Registration successful!");
    router.push("/register/choose-role");  // 👈 redirect to role selection
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Register</h2>
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <input type="email" placeholder="Email" className="w-full border p-2 rounded text-black" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border  p-2 rounded text-black" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-green-600">Login</Link>
        </p>
      </form>
    </section>
  );
}
