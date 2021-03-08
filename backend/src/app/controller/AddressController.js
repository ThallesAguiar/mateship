const addressModel = require('../model/Address');
const userModel = require('../model/User');

class AddressController {
  async store(req, res) {
    const { _id, country, state, city } = await addressModel(req.body).save();
    return res.json({
      location: {
        _id,
        country,
        state,
        city
      }
    });
  };

  async update(req, res) {
    const {id_address} = await userModel.findById(req.userId);
    
    const { _id, country, state, city } = await addressModel.findByIdAndUpdate(id_address, req.body, {new: true});
    
    return res.json({
      location: {
        _id,
        country,
        state,
        city
      }
    })
  }
}

module.exports = new AddressController();