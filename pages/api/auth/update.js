// import { getSession } from 'next-auth/react';
import { authOptions } from 'pages/api/auth/[...nextauth]';
// import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  /**
   * nextjs 13
   *  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send({ message: 'signin required' });
  }
    const toUpdateUser = await User.findById(user._id);
   * 
   */
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { user } = session;
  const eamilInSession = user.email;

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  // Session dont send user id on client side security
  // const toUpdateUser = await User.findById(user._id);

  // find user by email : email is unique on db
  // const orders = await Order.find({ user: user._id });
  const toUpdateUser = await User.findOne({ email: eamilInSession });
  toUpdateUser.name = name;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: 'User updated',
  });
}

export default handler;
