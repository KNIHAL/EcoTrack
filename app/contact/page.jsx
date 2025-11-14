export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 px-6 bg-white">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
        Contact Us
      </h1>

      <form className="max-w-xl text-black mx-auto grid gap-4 p-6 rounded-xl shadow bg-green-50">
        <input className="p-3 rounded border" placeholder="Your Name" />
        <input className="p-3 rounded border" placeholder="Email Address" />
        <textarea className="p-3 rounded border" rows={4} placeholder="Message"></textarea>

        <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Send Message
        </button>
      </form>
    </main>
  );
}
