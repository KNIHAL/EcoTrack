export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Ecotrack 🌍</h2>
          <p className="text-sm text-green-100 leading-relaxed">
            Building cleaner communities together.  
            Track, report, and reduce waste for a sustainable future.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-100">
            <li><a href="#hero" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Socials Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-green-100 text-sm">
            Email: support@ecotrack.org <br />
            Phone: +91 123-456-7890
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-green-500 mt-10 pt-4 text-center text-sm text-green-100">
        © {new Date().getFullYear()} Ecotrack. All rights reserved.
      </div>
    </footer>
  );
}
