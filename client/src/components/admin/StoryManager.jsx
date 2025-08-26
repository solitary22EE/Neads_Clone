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

  // ✅ Realtime listener
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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Manage Success Stories</h2>

      {/* Add / Edit Form */}
      <div className="mb-6">
        <textarea
          placeholder="Quote"
          value={newStory.quote}
          onChange={(e) => setNewStory({ ...newStory, quote: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          placeholder="Author"
          value={newStory.author}
          onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          placeholder="Role"
          value={newStory.role}
          onChange={(e) => setNewStory({ ...newStory, role: e.target.value })}
          className="border p-2 w-full mb-2 rounded"
        />

        {editingId ? (
          <button
            onClick={() => handleUpdateStory(editingId)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Story
          </button>
        ) : (
          <button
            onClick={handleAddStory}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Story
          </button>
        )}
      </div>

      {/* Story List */}
      <ul>
        {stories.map((story) => (
          <li key={story.id} className="border-b py-2 flex justify-between">
            <div>
              <p className="font-semibold">"{story.quote}"</p>
              <p>
                {story.author} – {story.role}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(story.id);
                  setNewStory({
                    quote: story.quote,
                    author: story.author,
                    role: story.role,
                  });
                }}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteStory(story.id)}
                className="text-red-500"
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

export default StoryManager;
