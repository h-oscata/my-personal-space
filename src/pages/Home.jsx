import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStickyNote, FaQuoteRight, FaUserFriends } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* Título principal */}
      <motion.h1
        className="text-5xl font-bold text-indigo-400 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mi Espacio Personal
      </motion.h1>

      {/* Descripción */}
      <motion.p
        className="text-lg text-gray-300 mb-8 max-w-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Un lugar donde puedes organizar tu vida digital con notas, contactos y
        citas inspiradoras.
      </motion.p>

      {/* Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mis Notas */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/notes" className="flex flex-col items-center text-center">
            <FaStickyNote size={50} className="text-indigo-400 mb-4" />
            <h2 className="text-xl font-semibold">Mis Notas</h2>
            <p className="text-gray-300">
              Organiza tus tareas y mantente productivo.
            </p>
          </Link>
        </motion.div>

        {/* Mis Citas */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/quotes" className="flex flex-col items-center text-center">
            <FaQuoteRight size={50} className="text-indigo-400 mb-4" />
            <h2 className="text-xl font-semibold">Mis Citas</h2>
            <p className="text-gray-300">
              Encuentra inspiración con frases motivadoras.
            </p>
          </Link>
        </motion.div>

        {/* Mis Contactos */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to="/contacts"
            className="flex flex-col items-center text-center"
          >
            <FaUserFriends size={50} className="text-indigo-400 mb-4" />
            <h2 className="text-xl font-semibold">Mis Contactos</h2>
            <p className="text-gray-300">
              Gestiona y organiza tu red de contactos.
            </p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
