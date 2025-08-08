import express from "express";
import {
  createNotes,
  deleteNotes,
  getNotes,
  getNotesById,
  updateNotes,
} from "../controllers/notesController.js";

const router = express.Router();

// Define the routes for notes
router.get("/", getNotes);
router.get("/:id", getNotesById);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
