const router = require('express').Router();
const { Note } = require('../../models');
const { authMiddleware } = require('../../utils/auth');

// Every notes route requires the user to be logged in.
router.use(authMiddleware);

// GET /api/notes - Return only notes owned by the logged-in user.
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Could not get notes.' });
  }
});

// GET /api/notes/:id - Optional single-note route with ownership protection.
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to view this note.',
      });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Could not get this note.' });
  }
});

// POST /api/notes - Create a note and assign it to the logged-in user.
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/notes/:id - Only the owner can update the note.
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to update this note.',
      });
    }

    // Do not allow the request body to change note ownership.
    const { user, ...updates } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Could not update this note.' });
  }
});

// DELETE /api/notes/:id - Only the owner can delete the note.
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to delete this note.',
      });
    }

    await note.deleteOne();

    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete this note.' });
  }
});

module.exports = router;
