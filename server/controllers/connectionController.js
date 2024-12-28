const Connection = require('../models/Connection');

exports.sendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    
    const existingConnection = await Connection.findOne({
      $or: [
        { mentor: req.user.id, mentee: recipientId },
        { mentor: recipientId, mentee: req.user.id }
      ]
    });

    if (existingConnection) {
      return res.status(400).json({ message: 'Connection already exists' });
    }

    const connection = new Connection({
      mentor: req.user.role === 'mentor' ? req.user.id : recipientId,
      mentee: req.user.role === 'mentee' ? req.user.id : recipientId,
      status: 'pending'
    });

    await connection.save();
    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateConnectionStatus = async (req, res) => {
  try {
    const { connectionId, status } = req.body;
    
    const connection = await Connection.findOneAndUpdate(
      { _id: connectionId, $or: [{ mentor: req.user.id }, { mentee: req.user.id }] },
      { status },
      { new: true }
    );

    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }

    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};