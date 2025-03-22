import { FaDotCircle } from "react-icons/fa";
import { supabase } from "../supaBaseClient";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Baja");
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setNotes(data);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingNote) {
      await supabase
        .from("notes")
        .update({ title, description, priority })
        .eq("id", editingNote.id);
      setEditingNote(null);
    } else {
      await supabase
        .from("notes")
        .insert([{ title, description, priority, completed: false }]);
    }
    setTitle("");
    setDescription("");
    setPriority("Baja");
    fetchNotes();
  };

  const toggleComplete = async (id, completed) => {
    await supabase.from("notes").update({ completed: !completed }).eq("id", id);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setPriority(note.priority);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-indigo-400 text-center mb-6">
        Mis Notas
      </h1>

      <label className="mx-auto block text-center  pb-2" htmlFor="">
        Añade nuevas notas
      </label>
      <form
        onSubmit={handleSave}
        className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 p-2 rounded"
        >
          {editingNote ? "Guardar Cambios" : "Añadir Nota"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Buscar notas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mt-10 rounded bg-gray-700 text-white"
      />

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg shadow-lg relative bg-gray-800`}
          >
            <span
              className={`text-sm px-3 rounded text-white ${
                note.priority === "Alta"
                  ? "bg-red-700"
                  : note.priority === "Media"
                  ? "bg-indigo-500"
                  : "bg-cyan-600"
              }`}
            >
              {note.priority}
            </span>
            <span className="pt-2 absolute top-2 right-2 text-xs text-gray-400">
              {new Date(note.created_at).toLocaleString()}
            </span>
            <h2 className="pt-4 text-center text-xl font-bold text-indigo-100">
              {note.title}
            </h2>
            <p className="text-gray-200 py-2">{note.description}</p>
            <div className="mt-3 flex flex-col items-center">
              <button
                onClick={() => toggleComplete(note.id, note.completed)}
                className="flex items-center text-white text-sm p-2  bg-lime-900 rounded hover:bg-lime-800"
              >
                {note.completed ? (
                  <FaCheckCircle className="text-lg text-green-400 mr-2" />
                ) : (
                  <FaTimesCircle className="text-lg text-gray-400 mr-2" />
                )}
                {note.completed ? "Completado" : "En proceso"}
              </button>
              <div className="flex">
                <button
                  onClick={() => handleEdit(note)}
                  className="m-3 flex items-center text-black text-sm px-3 py-1 bg-amber-400 hover:bg-amber-500 rounded"
                >
                  <FaEdit className="mr-1" /> Editar
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="m-3 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
