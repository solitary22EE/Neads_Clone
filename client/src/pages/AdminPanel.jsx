import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import BlogManager from "../components/admin/BlogManager";
import ServiceManager from "../components/admin/ServiceManager";
import ProjectManager from "../components/admin/ProjectManager";
import StoryManager from "../components/admin/StoryManager";
import { LogOut, FileText, Layers, Briefcase, Users } from "lucide-react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blogs");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <div>
          <h2 className="relative top-6 text-2xl font-bold text-gray-800 p-10 mt-8 text-center">
            Admin
          </h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-3 w-full px-4 py-1 rounded-lg transition-colors duration-200 ${
                activeTab === "blogs"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <FileText size={18} /> Blogs
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === "services"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Layers size={18} /> Services
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === "projects"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Briefcase size={18} /> Projects
            </button>

            <button
              onClick={() => setActiveTab("stories")}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === "stories"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
              }`}
            >
              <Users size={18} /> Stories
            </button>
          </nav>
        </div>

        {/* Logout button */}
        <div className="mt-6">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-4"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "blogs" && <BlogManager />}
        {activeTab === "services" && <ServiceManager />}
        {activeTab === "projects" && <ProjectManager />}
        {activeTab === "stories" && <StoryManager />}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure you want to logout?
            </h3>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
