// src/pages/AdminPanel.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import BlogManager from "../components/admin/BlogManager";
import ServiceManager from "../components/admin/ServiceManager";
import ProjectManager from "../components/admin/ProjectManager";
import StoryManager from "../components/admin/StoryManager";

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <section className="bg-gray-50 py-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Panel</h1>
          <p className="text-lg text-gray-600">Manage your content easily.</p>
        </div>

        {/* Blog Management */}
        <BlogManager />

        {/* Service Manager */}
        <ServiceManager/>

        {/* Featured Projects */}
        <ProjectManager />

        {/* Add new stories */}
        <StoryManager />
    
        {/* Logout */}
        <div className="text-center mt-12">
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
