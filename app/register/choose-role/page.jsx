"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChooseRole() {
  const router = useRouter();
  const params = useSearchParams();
  const uid = params.get("uid");

  if (!uid)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Invalid session. Please register again.</p>
      </div>
    );

  const handleSelect = (role) => {
    if (role === "citizen") return router.push("/dashboard/citizen");

    if (role === "staff")
      return router.push(`/register/staff?uid=${uid}`);

    if (role === "authority")
      return router.push(`/register/authority?uid=${uid}`);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Select Your Role
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => handleSelect("citizen")}
          className="py-3 bg-green-600 text-white rounded-lg"
        >
          Citizen
        </button>

        <button
          onClick={() => handleSelect("staff")}
          className="py-3 bg-blue-600 text-white rounded-lg"
        >
          Staff
        </button>

        <button
          onClick={() => handleSelect("authority")}
          className="py-3 bg-orange-600 text-white rounded-lg"
        >
          Authority
        </button>
      </div>
    </section>
  );
}
