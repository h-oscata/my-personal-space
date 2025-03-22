import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaAddressBook,
  FaStickyNote,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu on mobile
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              Mi Espacio Personal
            </motion.span>
          </Link>

          {/* Navbar Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/quotes"
              className="flex font-semibold items-center space-x-1 text-lg hover:text-gray-300 transition-all duration-300"
            >
              <FaCalendarAlt className="mx-2" />
              <span>Mis Citas</span>
            </Link>
            <Link
              to="/contacts"
              className="flex font-semibold items-center space-x-1 text-lg hover:text-gray-400 transition-all duration-300"
            >
              <FaAddressBook className="mx-2" />
              <span>Mis Contactos</span>
            </Link>
            <Link
              to="/notes"
              className="flex font-semibold items-center space-x-1 text-lg hover:text-gray-400 transition-all duration-300"
            >
              <FaStickyNote className="mx-2" />
              <span>Mis Notas</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl">
              {menuOpen ? "✖️" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <motion.div
          className={`md:hidden ${
            menuOpen ? "block" : "hidden"
          } mt-4 space-y-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="block text-lg text-center hover:text-gray-400 transition-all duration-300"
          >
            <FaHome className="inline mr-2" />
            Home
          </Link>
          <Link
            to="/quotes"
            className="block text-lg text-center hover:text-gray-400 transition-all duration-300"
          >
            <FaCalendarAlt className="inline mr-2" />
            Mis Citas
          </Link>
          <Link
            to="/contacts"
            className="block text-lg text-center hover:text-gray-400 transition-all duration-300"
          >
            <FaAddressBook className="inline mr-2" />
            Mis Contactos
          </Link>
          <Link
            to="/notes"
            className="block text-lg text-center hover:text-gray-400 transition-all duration-300"
          >
            <FaStickyNote className="inline mr-2" />
            Mis Notas
          </Link>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
