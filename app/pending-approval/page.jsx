"use client";

export default function PendingApproval() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">Pending Approval ⏳</h1>
      <p className="text-gray-700 max-w-md">
        Your account is under review. You’ll be notified once approved by the admin or authority.  
        Please check back later.
      </p>
    </section>
  );
}
