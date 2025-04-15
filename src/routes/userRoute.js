const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/userService');
const checkSession = require('../middleware/sessionAuth');
const userService = new UserService();

userRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'user service' });
});

userRouter.post('/create', async (req, res, next) => {
  try {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const user = await userService.authenticateUser(req.body);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.session.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId,
      email: user.email
    };
    req.session.isAuthenticated = true;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/logout', checkSession, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

userRouter.get('/verify/user', checkSession, (req, res) => {
  if (req.session && req.session.isAuthenticated && req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

userRouter.get('/find/userId', checkSession, async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/find/email', checkSession, async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/update', async (req, res, next) => {
  try {
    const user = { ...req.body, userId: req.query };
    const result = await userService.updateUser(user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/delete/userId', async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
