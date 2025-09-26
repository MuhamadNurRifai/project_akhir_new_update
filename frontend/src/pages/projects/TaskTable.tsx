import { useState } from "react";
import { useAppData } from "@/contexts/AppDataContext";
import { useNotification } from "@/contexts/NotificationContext"; // ✅ notifikasi
import TinyMCE from "@/components/TinyMCE";

const emptyForm = { 
  title: "", 
  due_date: "", 
  status: "todo", 
  paket: "", 
  assignedUserId: "", 
  description: "" 
};

const TaskTable = () => {
  const { tasks, setTasks } = useAppData();
  const { addNotification } = useNotification(); // ✅ akses notifikasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<any>(emptyForm);

  const handleAdd = () => {
    setEditTask(null);
    setForm(emptyForm);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDetail = (task: any) => {
    setEditTask(task);
    setForm({
      title: task.title,
      due_date: task.due_date,
      status: task.status,
      paket: String(task.paket),
      assignedUserId: String(task.assignedUserId),
      description: task.description || "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditToggle = (task?: any) => {
    if (task) {
      setEditTask(task);
      setForm({
        title: task.title,
        due_date: task.due_date,
        status: task.status,
        paket: String(task.paket),
        assignedUserId: String(task.assignedUserId),
        description: task.description || "",
      });
    }
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    const deletedTask = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((t) => t.id !== id));
    if (deletedTask) {
      addNotification(`Tugas "${deletedTask.title}" dihapus ❌`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTask) {
      // update
      setTasks(
        tasks.map((t) =>
          t.id === editTask.id ? { ...t, ...form } : t
        )
      );
      addNotification(`Tugas "${form.title}" berhasil diperbarui ✅`);
    } else {
      // create
       setTasks([
      { id: Date.now(), ...form },
      ...tasks,
      ]);
      addNotification(`Tugas baru ditambahkan: "${form.title}" 📌`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="ml-64 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Tabel Tugas</h2>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambahkan Tugas
        </button>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2">Judul</th>
            <th className="px-4 py-2">Paket</th>
            <th className="px-4 py-2">Pengguna yang Ditugaskan</th>
            <th className="px-4 py-2">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.paket}</td>
              <td className="border px-4 py-2">{task.assignedUserId || "-"}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                >
                  Hapus
                </button>
                <button
                  onClick={() => handleDetail(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Detil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Detail / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded shadow-md w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-blue-700 hover:underline">
                ← Kembali
              </button>
              <h3 className="text-lg font-bold">
                {isEditing ? (editTask ? "Edit Tugas" : "Tambah Tugas") : "Detail Tugas"}
              </h3>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Task title"
                  className="border px-2 border-black py-1 w-full text-black"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />

                <TinyMCE
                  value={form.description}
                  onChange={(content) => setForm({ ...form, description: content })}
                />

                <input
                  type="date"
                  className="border px-2 border-black py-1 w-full text-black"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                  required
                />

                <select
                  className="border px-2 border-black text-black py-1 w-full"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="todo">Belum Dikerjakan</option>
                  <option value="inprogress">Sedang Dalam Proses</option>
                  <option value="done">Selesai</option>
                </select>

                <input
                  type="text"
                  placeholder="Nama / Paket"
                  className="border px-2 border-black py-1 w-full text-black"
                  value={form.paket}
                  onChange={(e) => setForm({ ...form, paket: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="Nama / ID Pengguna"
                  className="border px-2 border-black py-1 w-full text-black"
                  value={form.assignedUserId}
                  onChange={(e) => setForm({ ...form, assignedUserId: e.target.value })}
                  required
                />

                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
                    Simpan
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p><strong>Judul:</strong> {form.title}</p>
                <p>
                  <strong>Keterangan:</strong>{" "}
                  <span
                    className="break-words whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: form.description }}
                  />
                </p>
                <p><strong>Tanggal Jatuh Tempo:</strong> {form.due_date}</p>
                <p><strong>Status:</strong> {form.status}</p>
                <p><strong>Paket:</strong> {form.paket}</p>
                <p><strong>Pengguna yang Ditugaskan:</strong> {form.assignedUserId}</p>

                <div className="flex justify-end space-x-2">
                  <button onClick={() => handleEditToggle(editTask)} className="bg-yellow-400 text-black px-4 py-1 rounded">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
