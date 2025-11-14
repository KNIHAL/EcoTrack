"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserDocument } from "@/lib/firestore";
import { useRouter } from "next/navigation";

export default function AuthorityRegister() {
  const [form, setForm] = useState({ email: "", password: "", orgName: "", orgAddress: "", contact: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await createUserDocument(user, "authority", {
        orgName: form.orgName,
        orgAddress: form.orgAddress,
        contact: form.contact,
        approved: false,
      });
      alert("Your request is submitted! Please wait for system admin approval.");
      router.push("/pending-approval");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <h2 className="text-3xl font-bold text-orange-700 mb-6">Authority Registration</h2>
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <input name="orgName" placeholder="Organization Name" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="orgAddress" placeholder="Organization Address" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 rounded" />
        <button className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">Submit</button>
      </form>
    </section>
  );
}
