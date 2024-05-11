const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Institute = require('../models/instituteModel');
const Task = require('../models/taskModel');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, address, contact, photograph } =
    req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: 'Atleast Name, Email, Password and Role are required' });
  }
  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const userId = `U-${Math.floor(1000 + Math.random() * 9000)}`;
  const user = new User({
    userId,
    name,
    email,
    password,
    role,
    address: address.toString() || null,
    contact: contact.toString() || null,
    photographUri: photograph || null,
  });
  const createdUser = await user.save();
  return res.status(201).json(createdUser);
});

const updateAddress = asyncHandler(async (req, res) => {
  const { userId, address } = req.body;
  if (!userId || !address) {
    return res
      .status(400)
      .json({ message: 'User ID and Address are required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.address = address;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    await user.remove();
    return res.json({ message: 'User removed' });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const updateEmail = asyncHandler(async (req, res) => {
  const { userId, email } = req.body;
  if (!userId || !email) {
    return res.status(400).json({ message: 'User ID and Email are required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.email = email;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { userId, contact } = req.body;
  if (!userId || !contact) {
    return res
      .status(400)
      .json({ message: 'User ID and Contact are required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.contact = contact;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const updatePhotograph = asyncHandler(async (req, res) => {
  const { userId, photograph } = req.body;
  if (!userId || !photograph) {
    return res
      .status(400)
      .json({ message: 'User ID and Photograph are required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    user.photographUri = photograph;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const updateRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) {
    return res.status(400).json({ message: 'User ID and Role are required' });
  }
  const user = await User.findOne({
    userId,
  });
  if (user) {
    if (
      role !== 'admin' ||
      role !== 'lg' ||
      role !== 'nodal' ||
      role !== 'reporting'
    ) {
      return res.status(400).json({ message: 'Invalid Role' });
    }
    user.role = role;
    const updatedUser = await user.save();
    return res.json(updatedUser);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }
  const user = await User.findOne({
    email,
    password,
  });
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateAddress,
    deleteUser,
    updateEmail,
    updateContact,
    updatePhotograph,
    updateRole,
    loginUser,
};