const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @route    POST api/users
// @desc     Register user
// @access   Public
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_PRIVATE_KEY, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route    POST /users/login
// @desc     Authenticate user and get token
// @access   Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const emailValidator = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

  if (!email.match(emailValidator)) {
    return res.status(400).send({ message: 'Please enter a valid email' });
  }

  if (!password) {
    return res.status(400).send({ message: 'Please enter a password' });
  }

  try {
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).send({ message: 'User does not exist' });
    }

    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: 'Password is invalid' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_PRIVATE_KEY, (err, token) => {
      if (err) throw err;
      res.json({ token, user: user.name });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
