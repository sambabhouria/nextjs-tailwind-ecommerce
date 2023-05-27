// /api/orders/:id
// import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
// import { authOptions } from 'pages/api/auth/[...nextauth]';
// import { getServerSession } from 'next-auth/next';
import Order from '../../../../models/Order'
import db from '../../../../utils/db'

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send({ message: '🚀🚀 signin required 🚀🚀' })
  }
  // const session = await getSession({ req })
  // console.log('🚀 ~ file: [id].js:10 ~ handler ~ session:', session);
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(401).send('🚀🚀 signin required 🚀🚀')
  // }

  await db.connect()

  const order = await Order.findById(req.query.id)
  await db.disconnect()
  res.send(order)
}

export default handler
