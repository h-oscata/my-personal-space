import { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  onSave,
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4">
          {title ? "Editar Nota" : "Añadir Nota"}
        </h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
