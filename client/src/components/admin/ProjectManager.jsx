// src/admin/ProjectManager.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const collectionRef = collection(db, "projects");

  // 🔹 Fetch projects
  const fetchProjects = async () => {
    const snapshot = await getDocs(collectionRef);
    setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "projects", editingId), form);
      setEditingId(null);
    } else {
      await addDoc(collectionRef, form);
    }
    setForm({ title: "", description: "", image: "" });
    fetchProjects();
  };

  // 🔹 Edit
  const handleEdit = (project) => {
    setForm({ title: project.title, description: project.description, image: project.image });
    setEditingId(project.id);
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Featured Projects</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* List */}
      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mt-2 w-40 rounded"
                />
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
