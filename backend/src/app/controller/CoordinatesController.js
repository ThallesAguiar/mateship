const User = require('../model/User');

class CoordinatesController {
  async update(req, res) {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) return res.status(400).json({ error: 'Coordinates fails' });
    if (!req.params.id) return res.status(400).json({ error: 'Error in ID user' });

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    await User.findByIdAndUpdate(req.params.id, location, { new: true });

    return res.json({ latitude, longitude });

  }
}

module.exports = new CoordinatesController();