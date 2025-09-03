// src/components/admin/ServiceManager.jsx
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

  // colors 
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
      
      const lastService = services[services.length - 1];
      const lastColor = lastService ? lastService.color : null;

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
    setFormData({
      title: service.title,
      icon: service.icon,
      desc: service.desc,
    });
    setEditingId(service.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        {editingId ? "Edit Service" : "Create a New Service"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-2"
          required
        />
        <input
          type="text"
          name="icon"
          placeholder="Service Icon (emoji or URL)"
          value={formData.icon}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-2"
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 h-28"
          required
        />

        {/* Center-aligned Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded shadow mb-4 mt-5"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </div>
      </form>

      {/* Services Grid */}
      <h2 className="text-2xl font-semibold text-gray-700 my-8 text-center">
        Manage Services
      </h2>

      {services.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition text-white bg-gradient-to-br ${service.color}`}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-gray-100 text-sm line-clamp-3">{service.desc}</p>

              
              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="px-3 py-1 bg-white text-blue-600 rounded shadow hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No services found. Add one above!
        </p>
      )}
    </div>
  );
}
