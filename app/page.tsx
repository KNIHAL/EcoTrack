import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import InfoStack from "@/components/InfoStack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900">
      <Navbar />
      <Hero />
      <InfoStack />
      <Footer />
    </main>
  );
}
