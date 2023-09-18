import argon2 from 'argon2';
import User from '../models/userModel.js';

const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: 'User Not Found !' });
  }

  const verifyUser = await argon2.verify(user.password, req.body.password);
  if (!verifyUser) {
    return res.status(400).json({ msg: 'Wrong Password !' });
  }
  req.session.userId = user.uuid;
  const {
    uuid, name, email, role,
  } = user;
  return res.status(200).json({
    uuid, name, email, role,
  });
};

const LoggedUser = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Please Login to your account' });
  }

  const user = await User.findOne({
    attributes: ['uuid', 'name', 'email', 'role'],
    where: {
      uuid: req.session.userId,
    },
  });

  const response = !user
    ? res.status(404).json({ msg: 'User Not Found' })
    : res.status(200).json(user);

  return response;
};

const Logout = (req, res) => {
  req.session.destroy((error) => {
    const response = error
      ? res.status(400).json({ msg: "Can't Logout" })
      : res.status(200).json({ msg: 'Logout success' });

    return response;
  });
};

export { Login, LoggedUser, Logout };
