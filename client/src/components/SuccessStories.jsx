import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore"; // import here

const handleAddStory = async () => {
  if (storyText.trim() === "") return;

  try {
    await addDoc(collection(db, "stories"), {
      text: storyText,
      date: new Date().toISOString(),
    });
    setStoryText(""); // clear textarea
    alert("Story added successfully!");
  } catch (error) {
    console.error("Error adding story:", error);
  }
};
