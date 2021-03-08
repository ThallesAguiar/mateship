const User = require("../model/User");

class SearchController {
  async index(req, res) {
    const { latitude, longitude } = req.query;
    const { likes, dislikes } = await User.findById(req.userId);

    //   Buscar todos users num raio de 10Km
    const range = parseInt(req.query.range + "000");

    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        { _id: { $nin: likes } },
        { _id: { $nin: dislikes } },
      ],
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: range //maximo de distancia, 10 mil metros = 10Km
        },
      },
    }).populate({
      path: 'id_avatar',
      model: 'File',
      select: ['_id', 'url']
    });

    return res.json({ users });
  }
};


module.exports = new SearchController();