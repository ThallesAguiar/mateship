const User = require("../model/User");
const Provider = require("../model/Provider");

class ProviderController {
  async index(req, res) {
    const providers = await User.find({ provider: true }, [
      "_id",
      "name",
      "email",
      "avatar",
    ]).populate("avatar", ["name", "path", "url"]);

    return res.json(providers);
  }

  async store(req, res) {
    const { name, description, whats, phone, saleType } = req.body.company;
    const { value, numbering } = req.body.isBusiness;

    const providerExists = await Provider.findOne({ numbering });

    if (providerExists) {
      return res.status(400).json({ error: "Provider already exists" });
    }

    const { _id } = await Provider({
      name,
      description,
      whats,
      phone,
      saleType,
      recordType: value,
      numbering,
    }).save();

    return res.json({
      provider: {
        _id,
        name,
        description,
        whats,
        phone,
        saleType,
        recordType: value,
        numbering,
      },
    });
  }
}

module.exports = new ProviderController();
