// import { getSession } from 'next-auth/react';
// import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getToken } from 'next-auth/jwt'
// import { getServerSession } from 'next-auth/next'
import Order from '../../../../../models/Order'
import db from '../../../../../utils/db'
// import User from '@/models/User'

/**
 * 
 * @param {*} update for next 13 
 * @param {*} res 
 * @returns 
 * 
 * import { getToken } from 'next-auth/jwt';
import Order from '../../../../../models/Order';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('Error: signin required');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({
      message: 'order delivered successfully',
      order: deliveredOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Error: order not found' });
  }
};

export default handler;
 */

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('Error: signin required')
  }
  // const session = await getSession({ req });
  // const session = await getServerSession(req, res, authOptions);

  // const userFromDataBase = await User.findOne({ email: session.user.email });

  // const { isAdmin } = userFromDataBase;

  // if (!session || (session && !session.user.isAdmin)) {
  //   return res.status(401).send('Error: signin required');
  // }

  // if (!session || (session && !isAdmin)) {
  //   return res.status(401).send('Error: signin required');
  // }

  await db.connect()

  const order = await Order.findById(req.query.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const deliveredOrder = await order.save()
    await db.disconnect()
    res.send({
      message: 'order delivered successfully',
      order: deliveredOrder,
    })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Error: order not found' })
  }
}

export default handler
