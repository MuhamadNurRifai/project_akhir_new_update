import { useState } from "react";
import axios from "@/services/axios";

const ClientForm = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    company_name: "",
    owner: "",
    phone: "",
    category: "",
    package: "",
    dp: "",
    paid: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/clients", form);
    alert("Client created");
    onClose(); // tutup modal setelah submit
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-lg"
    >
      <input
        type="text"
        placeholder="Company Name"
        value={form.company_name}
        onChange={(e) => setForm({ ...form, company_name: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Owner"
        value={form.owner}
        onChange={(e) => setForm({ ...form, owner: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        placeholder="Package"
        value={form.package}
        onChange={(e) => setForm({ ...form, package: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="DP"
        value={form.dp}
        onChange={(e) => setForm({ ...form, dp: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        placeholder="Paid"
        value={form.paid}
        onChange={(e) => setForm({ ...form, paid: e.target.value })}
        className="w-full border px-3 py-2 rounded"
      />

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

const ClientModal = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      {/* Tombol buka modal */}
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Client
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">New Client</h2>
            <ClientForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientModal;
