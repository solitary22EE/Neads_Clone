// src/components/admin/BlogManager.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function BlogManager() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Fetch Blogs
  const fetchBlogs = async () => {
    const snapshot = await getDocs(collection(db, "blogs"));
    setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Save or Update Blog
  const handleAddOrUpdateBlog = async (e) => {
    e.preventDefault();

    if (!title || !image || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingBlogId) {
        const blogRef = doc(db, "blogs", editingBlogId);
        await updateDoc(blogRef, { title, image, content });
        alert("Blog updated successfully!");
        setEditingBlogId(null);
      } else {
        await addDoc(collection(db, "blogs"), {
          title,
          image,
          content,
          createdAt: new Date(),
        });
        alert("Blog added successfully!");
      }

      setTitle("");
      setImage("");
      setContent("");
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        alert("Blog deleted successfully!");
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog");
      }
    }
  };

  // Edit Blog
  const handleEditBlog = (blog) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setImage(blog.image);
    setContent(blog.content);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center py-4">
        {editingBlogId ? "Edit Blog" : "Create a New Blog"}
      </h2>

      {/* Blog Form */}
      <form onSubmit={handleAddOrUpdateBlog} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 mb-2"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 h-40 mb-2"
        />

        {/* Center-aligned Button (green like Add Story) */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded shadow mb-4 mt-5"
          >
            {editingBlogId ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>

      {/* Blog List */}
      <h2 className="text-2xl font-semibold text-gray-700 my-8 text-center">
        Manage Blogs
      </h2>

      {/* Blog Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {blog.content}
                </p>

                {/* Actions (buttons close like Stories) */}
                <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="px-3 py-1 bg-white text-blue-600 rounded shadow hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No blogs found. Create one above!
          </p>
        )}
      </div>
    </div>
  );
}
