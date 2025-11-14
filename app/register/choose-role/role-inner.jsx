"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { createUserDocument } from "@/lib/firestore";

export default function ChooseRoleInner() {
  const router = useRouter();
  const params = useSearchParams();
  const uid = params.get("uid");

  if (!uid) return <p className="text-red-500">Invalid Registration</p>;

  const handleSelect = async (role) => {
    await createUserDocument({ uid, email: "" }, role);

    if (role === "citizen") router.push("/dashboard/citizen");
    if (role === "staff") router.push(`/register/staff?uid=${uid}`);
    if (role === "authority") router.push(`/register/authority?uid=${uid}`);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Select Your Role</h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => handleSelect("citizen")}
          className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Register as Citizen
        </button>

        <button
          onClick={() => handleSelect("staff")}
          className="py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register as Staff
        </button>

        <button
          onClick={() => handleSelect("authority")}
          className="py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Register as Authority
        </button>
      </div>
    </section>
  );
}
