const User = require('../model/User');
const bcrypt = require('bcryptjs');
const Yup = require('yup');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { name, email, provider, latitude, longitude } = req.body;

    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    //criptografa a senha 
    const password = await bcrypt.hash(req.body.password, 10);

    const { _id } = await User({name, email, provider, password, location}).save();

    return res.json({
      user: {
        _id,
        name,
        email,
        provider,
        location
      },
      token: jwt.sign(
        // 1º, é o payload
        { _id },
        // 2º, segredo para essa assinatura (uma string)
        process.env.AUTH_SECRET,
        // 3º, não obrigatório, a configuração para o jwt
        { expiresIn: authConfig.expiresIn }
      )
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => oldPassword ? field.required() : field),
      // com o WHEN consigo ter acesso a todos os campos do Yup(schema). É uma função condicional
      // No 1º parametro é qual variavel eu quero acessar,
      // No 2º ele recebe uma função, que recebe o valor da variavel oldPassword, e o field que seria a continuação da validação do password do schema
      confirmPassword: Yup.string().when('password', (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field)
      // confirma se as senhas são iguais. ref faz referencia a variavel password
    })
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findById(req.userId);

    if (req.body.email !== user.email) {
      const userExists = await User.findOne({ email: req.body.email });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    // Se ele informar a senha antiga
    if (req.body.oldPassword) {
      const valid = await bcrypt.compare(req.body.oldPassword, user.password);

      if (!valid)
        return res.status(401).json({ error: 'Password does not match' });

      //criptografa a NOVA senha 
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { bio, gender, birthday, latitude, longitude } = req.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const { _id, name, email, provider, id_avatar } = await User.findByIdAndUpdate(user._id, {
      bio,
      gender,
      birthday,
      location,
      id_avatar: req.body.id_avatar
    }, { new: true })
      .populate({
        path: 'id_avatar',
        model: 'File',
        select: ['_id', 'url']
      });

    return res.json({
      _id, name, email, provider, bio, gender, birthday, latitude, longitude, id_avatar
    });
  };

  async index(req, res) {

    // const { likes, dislikes } = await User.findById(req.userId);

    // filtra os usuarios que não estam em like/dislike/ e o proprio usuario logado.
    // const users = await User.find({
    //   $and: [
    //     { _id: { $ne: req.userId } },
    //     { _id: { $nin: likes } },
    //     { _id: { $nin: dislikes } },
    //   ],
    // })
    //   .populate({
    //     path: 'id_avatar',
    //     model: 'File',
    //     select: ['_id', 'url']
    //   });

    const users = await User.find();
    return res.json(users);
  }
}


module.exports = new UserController()