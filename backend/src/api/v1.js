const { Router } = require('express');
const logEntity = require('../models/logEntry.model');

const router = Router();

// ---------------- Log Entity Routes----------------

router.get('/', async (req, res, next) => {
  try {
    const entries = await logEntity.find();
    res.json({ entries });
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  // res.json({ body: req.body });
  try {
    const newLog = new logEntity(req.body);
    const createdEntry = await newLog.save();
    res.json(createdEntry);
  } catch (e) {
    if (e.name === 'ValidationError') res.status(422);
    next(e);
  }
});

// ---------------- Log Entity Routes----------------

module.exports = router;
