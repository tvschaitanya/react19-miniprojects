import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const App = () => {
  // Initialize notes state with data from localStorage
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("Notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
      return [];
    }
  });

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    try {
      localStorage.setItem("Notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  }, [notes]);

  // Delete note function with confirmation
  const deleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Notes App</h2>
      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
