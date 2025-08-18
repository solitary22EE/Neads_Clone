// src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(list);
      } catch (e) {
        console.error("Error loading blogs:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="blog-page bg-gray-50 py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay tuned for inspiring stories, project updates, and insights from NEADS.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600">Loading blogs…</p>
        )}

        {/* Empty state */}
        {!loading && blogs.length === 0 && (
          <p className="text-center text-gray-600">
            No blogs yet. Check back soon!
          </p>
        )}

        {/* Blog list */}
        {!loading && blogs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title || "Blog image"}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {blog.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
