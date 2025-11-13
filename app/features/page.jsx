export default function FeaturesPage() {
  return (
    <main className="min-h-screen py-20 px-6 bg-white">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
        Features
      </h1>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        <div className="p-6 bg-green-50 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-green-700">Quick Report</h3>
          <p className="mt-2 text-gray-600">Report waste in seconds.</p>
        </div>

        <div className="p-6 bg-green-50 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-green-700">Authority Panel</h3>
          <p className="mt-2 text-gray-600">Approve citizens, staff, manage city.</p>
        </div>

        <div className="p-6 bg-green-50 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-green-700">Staff Dashboard</h3>
          <p className="mt-2 text-gray-600">Track assigned tasks smoothly.</p>
        </div>
      </div>
    </main>
  );
}
