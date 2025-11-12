"use client";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Access Denied 🚫
      </h1>
      <p className="text-gray-700 mb-6">
        You don’t have permission to view this page.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </section>
  );
}
