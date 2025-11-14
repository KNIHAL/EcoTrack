export default function LearnMore() {
  return (
    <main className="min-h-screen bg-green-50 text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Learn More About EcoTrack
        </h1>

        {/* Introduction */}
        <p className="text-lg leading-7 mb-6">
          EcoTrack is a smart waste reporting and management platform designed to help citizens,
          staff, and authorities maintain cleaner cities. Citizens can report waste with images
          and location details, staff can manage and resolve tasks, and authorities get a full overview
          of city waste issues — making the entire workflow smooth, transparent, and fast.
        </p>

        {/* Features Section */}
        <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-3">Key Features</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Citizens report waste with description, image, and exact location.</li>
          <li>Staff receive and resolve assigned waste reports.</li>
          <li>Authority can approve staff and monitor all reports.</li>
          <li>System Admin manages authority-level accounts.</li>
          <li>Live updates: report status changes instantly reflect in dashboards.</li>
          <li>Clean UI designed for ease of use and quick navigation.</li>
        </ul>

        {/* How EcoTrack Works */}
        <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-3">
          How EcoTrack Works
        </h2>

        <ol className="list-decimal ml-6 space-y-3 text-lg">
          <li>
            **Citizen** submits a waste problem with a photo & description.
          </li>
          <li>
            The report appears in **Authority Dashboard** and **Staff All Reports**.
          </li>
          <li>
            Authority assigns tasks to staff, or staff can see their assigned tasks.
          </li>
          <li>
            Staff resolves the task & updates the status.
          </li>
          <li>
            Citizen can track their report status in real-time.
          </li>
        </ol>

        {/* Demo Accounts Section */}
        <h2 className="text-2xl font-semibold text-green-700 mt-12 mb-3">
          Demo Accounts (For Judges)
        </h2>
        <p className="mb-4">Use the following accounts to test the platform:</p>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-green-600 mb-2">System Admin</h3>
          <p>Email: <span className="font-mono">admin@example.com</span></p>
          <p>Password: <span className="font-mono">admin123</span></p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Authority</h3>
          <p>Email: <span className="font-mono">authority@example.com</span></p>
          <p>Password: <span className="font-mono">auth123</span></p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Staff</h3>
          <p>Email: <span className="font-mono">staff@example.com</span></p>
          <p>Password: <span className="font-mono">staff123</span></p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-green-600 mb-2">Citizen</h3>
          <p>Email: <span className="font-mono">citizen@example.com</span></p>
          <p>Password: <span className="font-mono">citizen123</span></p>
        </div>

        {/* Future Improvements */}
        <h2 className="text-2xl font-semibold text-green-700 mt-12 mb-3">
          Future Scope & Enhancements
        </h2>
        <ul className="list-disc ml-6 space-y-3 text-lg">
          <li>AI-powered waste detection from uploaded images.</li>
          <li>Location-based automatic detection using Google Maps.</li>
          <li>Gamification system for citizen engagement.</li>
          <li>Waste analytics dashboard for policymakers.</li>
          <li>Hyperlocal market integration with recycling partners.</li>
        </ul>

        {/* Closing */}
        <p className="text-lg mt-10 mb-20">
          EcoTrack is built to scale, and this MVP demonstrates how technology
          and community collaboration can create cleaner, healthier cities.
        </p>

      </div>
    </main>
  );
}
