import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "@/services/axios";

type Client = {
  id: number;
  company_name: string;
  owner: string;
  phone: string;
  category: string;
  package: string;
  deadline: string;
  dp: string;
  paid: string;
};

const LOCAL_KEY = "clients_data";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);

  const [form, setForm] = useState<Client>({
    id: 0,
    company_name: "",
    owner: "",
    phone: "",
    category: "",
    package: "",
    deadline: "",
    dp: "",
    paid: "",
  });

  // ✅ pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(clients.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentClients = clients.slice(startIndex, startIndex + rowsPerPage);

  // Load dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      setClients(JSON.parse(stored));
    }
  }, []);

  // Simpan ke localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(clients));
  }, [clients]);

  const handleAdd = () => {
    setEditClient(null);
    setForm({
      id: 0,
      company_name: "",
      owner: "",
      phone: "",
      category: "",
      package: "",
      deadline: "",
      dp: "",
      paid: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (client: Client) => {
    setEditClient(client);
    setForm(client);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editClient) {
      // update client
      setClients((prev) =>
        prev.map((c) => (c.id === editClient.id ? { ...form } : c))
      );
      await axios.put(`/api/clients/${editClient.id}`, form);
    } else {
      // create new client → masuk paling atas
      const newClient = { ...form, id: Date.now() };
      setClients((prev) => [newClient, ...prev]);
      setPage(1); // balik ke halaman pertama
      await axios.post("/api/clients", newClient);
    }

    setIsModalOpen(false); // tutup modal setelah simpan
    setEditClient(null);
  };

  // EXPORT EXCEL
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(clients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "clients.xlsx");
  };

  // IMPORT EXCEL
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData: any[] = XLSX.utils.sheet_to_json(sheet);

      const newClients: Client[] = importedData.map((row: any, idx) => ({
        id: Date.now() + idx,
        company_name: row.company_name || "",
        owner: row.owner || "",
        phone: row.phone || "",
        category: row.category || "",
        package: row.package || "",
        deadline: row.deadline || "",
        dp: row.dp || "",
        paid: row.paid || "",
      }));

      setClients((prev) => [...newClients, ...prev]); // taruh di atas
      setPage(1); // balik ke page 1
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Clients</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
      </div>

      <table className="w-full bg-white text-black border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Company</th>
            <th className="border px-2 py-1">Owner</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Package</th>
            <th className="border px-2 py-1">Deadline</th>
            <th className="border px-2 py-1">DP</th>
            <th className="border px-2 py-1">Paid</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client) => (
            <tr key={client.id}>
              <td className="border px-2 py-1">{client.company_name}</td>
              <td className="border px-2 py-1">{client.owner}</td>
              <td className="border px-2 py-1">{client.phone}</td>
              <td className="border px-2 py-1">{client.category}</td>
              <td className="border px-2 py-1">{client.package}</td>
              <td className="border px-2 py-1">{client.deadline}</td>
              <td className="border px-2 py-1">{client.dp}</td>
              <td className="border px-2 py-1">{client.paid}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => handleEdit(client)}
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Export, Import, Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Export Excel
          </button>

          <label className="bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
            Import Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded ${
                page === num
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ✅ Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-black">
            <h3 className="text-lg font-bold mb-4">
              {editClient ? "Edit Client" : "Add Client"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Company Name"
                value={form.company_name}
                onChange={(e) =>
                  setForm({ ...form, company_name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="text"
                placeholder="Owner"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="text"
                placeholder="Package"
                value={form.package}
                onChange={(e) => setForm({ ...form, package: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="text"
                placeholder="Deadline"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="number"
                placeholder="DP"
                value={form.dp}
                onChange={(e) => setForm({ ...form, dp: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />
              <input
                type="number"
                placeholder="Paid"
                value={form.paid}
                onChange={(e) => setForm({ ...form, paid: e.target.value })}
                className="w-full border px-3 py-2 rounded border-black text-black"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
