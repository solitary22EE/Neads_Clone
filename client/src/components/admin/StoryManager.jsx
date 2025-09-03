// src/components/admin/StoryManager.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";

const StoryManager = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ quote: "", author: "", role: "" });
  const [editingId, setEditingId] = useState(null);

  
  useEffect(() => {
    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleAddStory = async () => {
    if (!newStory.quote) return;
    await addDoc(collection(db, "stories"), {
      ...newStory,
      createdAt: serverTimestamp(),
    });
    setNewStory({ quote: "", author: "", role: "" });
  };

  const handleUpdateStory = async (id) => {
    const storyRef = doc(db, "stories", id);
    await updateDoc(storyRef, {
      ...newStory,
      updatedAt: serverTimestamp(),
    });
    setEditingId(null);
    setNewStory({ quote: "", author: "", role: "" });
  };

  const handleDeleteStory = async (id) => {
    await deleteDoc(doc(db, "stories", id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center py-4">
        {editingId ? "Edit Story" : "Create a New Story"}
      </h2>
      {/* Add / Edit Form */}
      <div className="space-y-4 mb-8 mt-8">
        <textarea
          placeholder="Quote"
          value={newStory.quote}
          onChange={(e) => setNewStory({ ...newStory, quote: e.target.value })}
          className="w-full border p-2 rounded mt-8 mb-2"
        />
        <input
          placeholder="Author"
          value={newStory.author}
          onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
          className="w-full border p-2 rounded mb-2 mt-8"
        />
        <input
          placeholder="Role"
          value={newStory.role}
          onChange={(e) => setNewStory({ ...newStory, role: e.target.value })}
          className="w-full border p-2 rounded mb-8 mt-2"
        />

        <div className="flex justify-center">
          {editingId ? (
            <button
              onClick={() => handleUpdateStory(editingId)}
              className="bg-blue-500 text-white px-6 py-2 rounded shadow mb-4 mt-5"
            >
              Update Story
            </button>
          ) : (
            <button
              onClick={handleAddStory}
              className="bg-green-500 text-white px-6 py-2 rounded shadow mb-4 mt-5"
            >
              Add Story
            </button>
          )}
        </div>
      </div>

      {/* Story List as Cards */}
      <h2 className="text-2xl font-semibold text-gray-700 my-8 text-center mb-4">
        Manage Projects
      </h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-6 rounded-lg shadow-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex flex-col justify-between"
          >
            <div>
              <p className="italic text-lg mb-2">“{story.quote}”</p>
              <p className="font-semibold">
                {story.author} – <span className="text-gray-200">{story.role}</span>
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setEditingId(story.id);
                  setNewStory({
                    quote: story.quote,
                    author: story.author,
                    role: story.role,
                  });
                }}
                className="px-3 py-1 bg-white text-blue-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteStory(story.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default StoryManager;
