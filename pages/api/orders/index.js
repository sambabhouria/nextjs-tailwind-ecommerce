import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

import Order from '../../../models/Order';
import db from '../../../utils/db';
import User from '@/models/User';

const handler = async (req, res) => {
  console.log('🚀 ~ file: index.js:6 ~ handler ~ req:', req.body);
  //https://next-auth.js.org/configuration/nextjs#unstable_getserversession
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  await db.connect();

  const userFromDataBase = await User.findOne({
    email: user.email,
  });

  if (userFromDataBase._id) {
    const newOrder = new Order({
      ...req.body,
      // user: user._id,
      user: userFromDataBase._id,
    });
    const order = await newOrder.save();
    return res.status(201).send(order);
  }

  res.status(201).send('user is required for save order');
};
export default handler;
