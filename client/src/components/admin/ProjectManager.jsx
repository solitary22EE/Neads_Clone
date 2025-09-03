// src/components/admin/ProjectManager.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  const collectionRef = collection(db, "projects");

  //  Fetch projects
  const fetchProjects = async () => {
    const snapshot = await getDocs(collectionRef);
    setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  //  Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "projects", editingId), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      setEditingId(null);
    } else {
      await addDoc(collectionRef, { ...form, createdAt: serverTimestamp() });
    }
    setForm({ title: "", description: "", image: "" });
    fetchProjects();
  };

  //  Edit
  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      image: project.image,
    });
    setEditingId(project.id);
  };

  //  Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        {editingId ? "Edit Project" : "Create a New Project"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Project Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-2"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 h-28 mb-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-2"
          required
        />

        
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="w-48 h-32 object-cover rounded-lg border shadow mt-2"
          />
        )}

        {/* Button center */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded shadow mb-4 mt-5"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>

      {/* Projects Grid */}
      <h2 className="text-2xl font-semibold text-gray-700 my-8 text-center">
        Manage Projects
      </h2>

      {projects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>


                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-3 py-1 bg-white text-blue-600 rounded shadow hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>


              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No projects found. Add one above!
        </p>
      )}
    </div>
  );
};

export default ProjectManager;
