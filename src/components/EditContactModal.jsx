import { useState, useEffect } from "react";
import { supabase } from "../supaBaseClient";

const EditContactModal = ({ contact, onClose, onSave }) => {
  const [updatedContact, setUpdatedContact] = useState(contact);

  useEffect(() => {
    setUpdatedContact(contact);
  }, [contact]);

  const handleChange = (e) => {
    setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    if (!updatedContact.name || !updatedContact.phone) {
      alert("Nombre y teléfono son obligatorios.");
      return;
    }

    const { error } = await supabase
      .from("contacts")
      .update(updatedContact)
      .eq("id", updatedContact.id);
    if (error) {
      console.error("Error al actualizar contacto:", error);
      return;
    }

    onSave(updatedContact);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold">Editar Contacto</h2>

        <input
          name="name"
          className="border p-2 w-full my-2"
          value={updatedContact.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          className="border p-2 w-full my-2"
          value={updatedContact.phone}
          onChange={handleChange}
        />
        <input
          name="email"
          className="border p-2 w-full my-2"
          value={updatedContact.email}
          onChange={handleChange}
        />
        <input
          name="tags"
          className="border p-2 w-full my-2"
          value={updatedContact.tags}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={saveChanges}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
