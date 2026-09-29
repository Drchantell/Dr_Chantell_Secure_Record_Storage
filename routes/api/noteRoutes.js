const router = require('express').Router();
const { Note } = require('../../models');
const { authMiddleware } = require('../../utils/auth');

// I protect these routes so the user has to be logged in.
router.use(authMiddleware);

// I only return notes that belong to the current user.
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Could not get notes.' });
  }
});

// I only return this note if it belongs to the current user.
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

// I create a new note and save the current user's ID with it.
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

// I only let the note owner update it.
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

    // I leave out the user field so the note owner stays the same.
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

// I only let the note owner delete it.
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
