import User from '../models/userModel.js';

const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Please Login to your account' });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: 'User Not Found' });
  req.userId = user.id;
  req.role = user.role;
  return next();
};

const forAdmin = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ msg: 'User Not Found' });
  if (user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied.' });
  }
  return next();
};

export { verifyUser, forAdmin };
