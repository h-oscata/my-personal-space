import { supabase } from "../supaBaseClient";
import { IoGrid, IoPersonCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaTableCells } from "react-icons/fa6";

const tagsOptions = ["Amigos", "Familia", "Trabajo", "Otros"];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    tag: tagsOptions[0],
  });

  const getRandomColor = () => {
    const colors = [
      "text-pink-300", // Rosa pastel
      "text-indigo-300", // Índigo pastel
      "text-blue-300", // Azul pastel
      "text-green-300", // Verde pastel
      "text-teal-300", // Teal pastel
      "text-yellow-300", // Amarillo pastel
      "text-purple-300", // Púrpura pastel
      "text-red-300", // Rojo pastel
      "text-orange-300", // Naranja pastel
      "text-lime-300", // Lima pastel
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const { data } = await supabase.from("contacts").select("*");
    setContacts(data || []);
  }

  async function handleSave() {
    if (!contactForm.name) return;

    if (editingContact) {
      await supabase
        .from("contacts")
        .update(contactForm)
        .eq("id", editingContact.id);
    } else {
      await supabase.from("contacts").insert([contactForm]);
    }
    setModalOpen(false);
    setEditingContact(null);
    setContactForm({ name: "", phone: "", email: "", tag: tagsOptions[0] });
    fetchContacts();
  }

  async function handleDelete(id) {
    await supabase.from("contacts").delete().eq("id", id);
    fetchContacts();
  }

  function openModal(contact = null) {
    setEditingContact(contact);
    setContactForm(
      contact || { name: "", phone: "", email: "", tag: tagsOptions[0] }
    );
    setModalOpen(true);
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Mis Contactos</h1>
      <div className="flex  mb-4">
        <input
          type="text"
          placeholder="Buscar contacto..."
          className="p-2 flex-1 rounded bg-gray-800 border border-gray-600 mr-12"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => openModal()}
          className="cursor-pointer flex items-center gap-2 bg-green-700 font-bold px-4 py-2 rounded hover:bg-green-600 "
        >
          <IoMdAdd className="font-bold text-lg" /> Añadir Contacto
        </button>
      </div>
      <div className="flex gap-4 mt-10 mb-4 justify-end items-center">
        <span className="font-semibold">Ver como: </span>
        <button
          onClick={() => setViewMode("cards")}
          className="cursor-pointer flex items-center px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          <IoGrid className="mr-2 text-xl" />
          Tarjetas
        </button>
        <button
          onClick={() => setViewMode("table")}
          className="cursor-pointer flex items-center px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          <FaTableCells className="mr-2 text-xl" />
          Tabla
        </button>
      </div>
      {filteredContacts.length === 0 ? (
        <p className="text-center text-gray-400">No se encontraron contactos</p>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-gray-800 p-4 rounded shadow flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <IoPersonCircleSharp
                  className={`text-8xl ${getRandomColor()}`}
                />

                <div className="">
                  <h3 className="text-lg font-bold py-2">{contact.name}</h3>

                  <p
                    className={`text-gray-300 ${
                      !contact.phone ? "text-sm opacity-50" : ""
                    }`}
                  >
                    Celular: {contact.phone ? contact.phone : "No disponible"}
                  </p>
                  <p
                    className={`text-gray-300 ${
                      !contact.email ? "text-sm opacity-50" : ""
                    }`}
                  >
                    Email: {contact.email ? contact.email : "No disponible"}
                  </p>

                  <p
                    className={`text-sm bg-gray-700 px-2 my-2 py-1 rounded w-fit ${
                      !contact.tag ? "text-sm opacity-50" : ""
                    }`}
                  >
                    {contact.tag ? contact.tag : "Ninguno"}
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-2 text-xl">
                <button
                  onClick={() => openModal(contact)}
                  className="text-yellow-400 border py-1 px-6 rounded hover:bg-yellow-600 hover:text-white hover:border-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-400 border py-1 px-6 rounded hover:bg-red-700 hover:text-white hover:border-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border-b">Nombre</th>
              <th className="p-2 border-b">Correo</th>
              <th className="p-2 border-b">Teléfono</th>
              <th className="p-2 border-b">Etiqueta</th>
              <th className="p-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-700">
                <td className="p-2">{contact.name}</td>
                <td className="p-2">{contact.email || "-"}</td>
                <td className="p-2">{contact.phone || "-"}</td>
                <td
                  className={`p-2 
  ${contact.tag === "Amigos" ? "text-sky-300" : ""}
  ${contact.tag === "Familia" ? "text-green-300" : ""}
  ${contact.tag === "Trabajo" ? "text-yellow-400 " : ""}
  ${contact.tag === "Otros" ? "text-gray-100 " : ""}
`}
                >
                  {contact.tag || "-"}
                </td>{" "}
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => openModal(contact)}
                    className="text-yellow-400 hover:text-yellow-300 text-lg mx-1 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-400 hover:text-red-300 text-lg mx-1 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded">
            <h2 className="text-xl mb-4">
              {editingContact ? "Editar" : "Añadir"} Contacto
            </h2>
            <input
              type="text"
              placeholder="Nombre"
              className="p-2 w-full mb-2 bg-gray-800"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Teléfono"
              className="p-2 w-full mb-2 bg-gray-800"
              value={contactForm.phone}
              onChange={(e) =>
                setContactForm({ ...contactForm, phone: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Correo"
              className="p-2 w-full mb-2 bg-gray-800"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
            />
            <select
              className="p-2 w-full mb-4 bg-gray-800"
              value={contactForm.tag}
              onChange={(e) =>
                setContactForm({ ...contactForm, tag: e.target.value })
              }
            >
              {tagsOptions.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
