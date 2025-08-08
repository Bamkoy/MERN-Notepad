import Note from "../models/Note.js";

export async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //   .sort({ createdAt: -1 }) Fetch all notes sorted by creation date in descending order i.e the lastest note will be first 
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching notes." });
  }
}

export async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching note by ID." });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating note" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    ); //this updates the note with the given id

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ message: "Internal server error while updating note" });
  }
}

export async function deleteNotes(req, res) {
    try{
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote){
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res
            .status(500)
            .json({ message: "Internal server error while deleting note" });
    }
}
