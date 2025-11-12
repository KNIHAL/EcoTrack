"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserDocument } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function StaffRegister() {
  const [form, setForm] = useState({ email: "", password: "", name: "", organization: "", location: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await createUserDocument(user, "staff", {
        name: form.name,
        location: form.location,
        organization: form.organization,
        approved: false,
      });
      alert("Registration request sent! Wait for approval from authority.");
      router.push("/pending-approval");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Staff Registration</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="organization" placeholder="Organization Name" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full border p-2 rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </section>
  );
}
