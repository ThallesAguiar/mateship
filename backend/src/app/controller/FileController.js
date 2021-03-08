// codigo rocketseat:  https://github.com/rocketseat-content/youtube-upload-nodejs-reactjs-backend
// youtube:  https://www.youtube.com/watch?v=MkkbUfcZUZM&t=1661s&ab_channel=Rocketseat
const File = require('../model/File');
const User = require('../model/User');

class FileController {
  async store(req, res) {

    // if (!req.file) return res.json(null);

    console.log(req.file)
    
    const { originalname: name, size, key, location: url = '' } = req.file;
    const file = await File({ name, size, key, url }).save();
    // console.log(file)

    return res.json(file);
  };

  async update(req, res) {

    if (!req.file) return res.json(null);

    const { originalname: name, key, size, location: url = '' } = req.file;
    const file = await File.findByIdAndUpdate(req.params.id, { name, key,size, url }, { new: true });

    return res.json(file);
  };

  async delete(req, res) {

    if (!req.file) return res.json(null);

    const file = await File.findById(req.params.id);

    await file.remove();

    return res.send();
  }
}

module.exports = new FileController();