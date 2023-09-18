import argon2 from 'argon2';
import User from '../models/userModel.js';

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['uuid', 'name', 'email', 'role'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'role'],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: 'User not found !' });
  }
};

const createUser = async (req, res) => {
  const {
    name, email, password, confPassword, role,
  } = req.body;

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: 'Password and Confirm Password Does not match' });
  }
  const hashPassword = await argon2.hash(password);

  try {
    await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    return res.status(201).json({ msg: 'New User created' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }

  const {
    name, email, password, confPassword, role,
  } = req.body;
  const hashPassword = !password ? user.password : await argon2.hash(password);
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: 'Password and Confirm Password Does not match' });
  }

  try {
    await User.update(
      {
        name,
        email,
        password: hashPassword,
        role,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    return res.status(200).json({ msg: 'User updated' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    return res.status(200).json({ msg: 'User Deleted' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export {
  getUsers, getUserById, createUser, updateUser, deleteUser,
};
