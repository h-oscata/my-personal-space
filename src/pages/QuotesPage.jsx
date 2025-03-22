import { supabase } from "../supaBaseClient";
import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
import {
  FaChevronDown,
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

export const QuotesPage = () => {
  const [quote, setQuote] = useState(null);
  const [rating, setRating] = useState(0);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  const fetchQuote = async () => {
    const response = await fetch("https://quotes-api-self.vercel.app/quote");
    const data = await response.json();
    setQuote(data);
    setRating(0); // Reinicia la calificación
    setIsSaveDisabled(false);
  };

  const fetchSavedQuotes = async () => {
    const { data, error } = await supabase.from("quotes").select("*");
    if (error) console.error(error);
    else setSavedQuotes(data);
  };

  const saveQuote = async () => {
    if (!quote || isSaveDisabled) return;

    const { error } = await supabase
      .from("quotes")
      .insert([{ quote: quote.quote, author: quote.author, rather: rating }]);

    if (!error) {
      fetchSavedQuotes();
      setIsSaveDisabled(true); // Desactiva el botón hasta nueva cita
    }
  };

  const deleteQuote = async (id) => {
    await supabase.from("quotes").delete().eq("id", id);
    fetchSavedQuotes();
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Citas Inspiradoras
      </motion.h1>
      <button
        onClick={fetchQuote}
        // className="bg-purple-800 flex items-center gap-2 font-semibold text-lg p-4 rounded-lg mb-4 hover:bg-purple-900 cursor-pointer transition"
        className={`bg-purple-800 flex items-center gap-2 font-semibold text-lg p-4 rounded-lg mb-4 hover:bg-purple-900 cursor-pointer transition ${
          !quote ? "my-30 mb-50" : "py-3 px-3 text-sm"
        }`}
      >
        <FaChevronDown />
        Obtener Cita Aleatoria
      </button>

      {quote && (
        <motion.div
          className="bg-gray-800 p-6 mt-2 rounded-lg text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-3xl italic flex justify-center items-center">
            <FaQuoteLeft className="text-yellow-400 w-1/6 mr-2" />
            {quote.quote}
            <FaQuoteRight className="text-yellow-400 w-1/6 ml-2" />
          </div>
          <p className="mt-2 text-lg text-gray-400">- {quote.author}</p>
          <div className=" flex justify-center mt-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                onClick={() => setRating(i + 1)}
                className={`cursor-pointer ${
                  i < rating ? "text-yellow-500" : "text-gray-500"
                }`}
              />
            ))}
          </div>
          <button
            onClick={saveQuote}
            disabled={isSaveDisabled}
            className={`mt-4 px-4 py-2 rounded-lg transition font-semibold ${
              isSaveDisabled
                ? "bg-gray-600"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            Guardar Cita
          </button>
        </motion.div>
      )}

      <h2 className="text-2xl mt-30">Mis Citas Guardadas</h2>
      <div className="mt-4 w-full max-w-2xl">
        {savedQuotes.length === 0 ? (
          <p className="text-gray-400">No tienes citas guardadas.</p>
        ) : (
          savedQuotes.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div>
                <p className="italic">"{item.quote}"</p>
                <p className="text-sm text-gray-400 py-1">- {item.author}</p>
                <p className="text-sm text-gray-500 py-2">
                  Guardado el: {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-1">
                  {[...Array(item.rather)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
              <button onClick={() => deleteQuote(item.id)}>
                <MdDelete className="text-red-500 text-2xl hover:text-red-700 ml-6" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// export default QuotesPage;
