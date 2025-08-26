import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: "", icon: "", desc: "" });
  const [editingId, setEditingId] = useState(null);

  const servicesRef = collection(db, "services");

  // Color palette
  const colors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-yellow-500 to-yellow-600",
    "from-pink-500 to-pink-600",
    "from-purple-500 to-purple-600",
    "from-indigo-500 to-indigo-600",
  ];

  // Fetch services
  const fetchServices = async () => {
    const snapshot = await getDocs(servicesRef);
    setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update service
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateDoc(doc(db, "services", editingId), formData);
      setEditingId(null);
    } else {
      // Assign next color automatically (cyclic)
      const lastService = services[services.length - 1];
      const lastColor = lastService ? lastService.color : null;

      // Find next color different from last one
      let colorIndex = Math.floor(Math.random() * colors.length);
      if (lastColor && colors[colorIndex] === lastColor) {
        colorIndex = (colorIndex + 1) % colors.length;
      }

      await addDoc(servicesRef, {
        ...formData,
        color: colors[colorIndex],
        createdAt: serverTimestamp(),
      });
    }

    setFormData({ title: "", icon: "", desc: "" });
    fetchServices();
  };

  // Delete service
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "services", id));
    fetchServices();
  };

  // Edit service
  const handleEdit = (service) => {
    setFormData({ title: service.title, icon: service.icon, desc: service.desc });
    setEditingId(service.id);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="icon"
          placeholder="Service Icon (emoji or URL)"
          value={formData.icon}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Service List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-lg shadow-lg text-white bg-gradient-to-br ${service.color}`}
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-gray-100">{service.desc}</p>
            <div className="mt-4 flex gap-2">
              <button
                className="px-3 py-1 bg-white text-blue-600 rounded"
                onClick={() => handleEdit(service)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
