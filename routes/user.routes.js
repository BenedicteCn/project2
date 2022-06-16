const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const saltRounds = 10;
const jsonwebtoken = require('jsonwebtoken');
const isAuthenticated = require('../middleware/isAuthenticated');
const Favorite = require('../models/Favorite');

// router.get("/signup", async (req, res, next) => {
//   const root = __dirname.replace("routes", "");
//   console.log(root);
//   res.sendFile("public/auth/signup.html", { root });
// });

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (foundUser) {
      res
        .status(401)
        .json({ message: 'Username already exists. Try logging in instead.' });
      return;
    }
    if (!email.match(regex)) {
      res.status(500).json({
        message: 'Must be an email adress (example : anna@gmail.com)',
      });
      return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log({ hashedPassword });

    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    res.status(404).json({ message: 'username does not exist' });
    return;
  }

  const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordMatched) {
    res.status(401).json({ message: 'password does not match' });
    return;
  }

  const payload = { username, _id: foundUser._id };

  const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: '800s',
  });

  res.status(200).json({ isLoggedIn: true, authToken });
});

// display user's profile:
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const oneUser = await User.findById(userId);
    res.status(200).json(oneUser);
  } catch (err) {
    next(err);
  }
});

router.get('/favorites/:id', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const allFavorites = await Favorite.find();
    res.status(200).json(allFavorites);
    const oneUser = await User.findById(userId);
    res.status(200).json(oneUser);
  } catch (err) {
    next(err);
  }
});

router.get('/verify', async (req, res, next) => {
  // Verify the bearer token is still valid
  // get the bearer token from the header
  const { authorization } = req.headers;

  // isolate the jwt
  const token = authorization.replace('Bearer ', '');
  console.log({ token });

  try {
    // verify the jwt with the jsonwebtoken package
    const payload = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    console.log({ payload });

    // send the user the payload
    res.json({ token, payload });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid token' });
  }
});

// user update password:
router.patch('/updatepassword/', isAuthenticated, async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      req.user.password
    );

    if (isPasswordMatched) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      });
      res.status(200).json({ updatedUser, message: 'Nice password mate' });
    } else {
      res.status(401).json({ message: 'password does not match' });
      return;
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
