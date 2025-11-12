"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600">EcoTrack</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><a href="#home" className="hover:text-green-600">Home</a></li>
          <li><a href="#features" className="hover:text-green-600">Features</a></li>
          <li><a href="#about" className="hover:text-green-600">About</a></li>
          <li><a href="#contact" className="hover:text-green-600">Contact</a></li>
          {/* Desktop */}
          <li>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
          <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
          <li><a href="#features" onClick={() => setOpen(false)}>Features</a></li>
          <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          <li>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
