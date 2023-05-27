// import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import Order from '../../../../models/Order'
import db from '../../../../utils/db'

/**
 * next 13
 * const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  if (req.method === 'GET') {
    await db.connect();
    const orders = await Order.find({}).populate('user', 'name');
    await db.disconnect();
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;
 */
const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('🚀🚀 signin required 🚀🚀')
  }

  // const session = await getSession({ req })
  // if (!session || (session && !session.user.isAdmin)) {
  //   return res.status(401).send('🚀🚀 signin required 🚀🚀')
  // }
  if (req.method === 'GET') {
    await db.connect()
    const orders = await Order.find({}).populate('user', 'name')
    await db.disconnect()
    res.send(orders)
  } else {
    return res.status(400).send({ message: 'Method not allowed' })
  }
}

export default handler
