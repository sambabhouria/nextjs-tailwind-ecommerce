// import { authOptions } from 'pages/api/auth/[...nextauth]'
// import { getServerSession } from 'next-auth/next'

import { getToken } from 'next-auth/jwt'

import Order from '../../../models/Order'
import db from '../../../utils/db'
// import User from '@/models/User'

const handler = async (req, res) => {
  // console.log('🚀 ~ file: index.js:6 ~ handler ~ req:', req.body);
  //https://next-auth.js.org/configuration/nextjs#unstable_getserversession
  // const session = await getSession({ req });

  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send('signin required')
  }
  await db.connect()
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  })

  const order = await newOrder.save()
  res.status(201).send(order)

  // const session = await getServerSession(req, res, authOptions)
  // if (!session) {
  //   return res.status(401).send('signin required')
  // }
  // const { user } = session

  // const userFromDataBase = await User.findOne({
  //   email: user.email,
  // })
  // if (userFromDataBase._id) {
  //   const newOrder = new Order({
  //     ...req.body,
  //     // user: user._id,
  //     user: userFromDataBase._id,
  //   })
  //   const order = await newOrder.save()
  //   return res.status(201).send(order)
  // }

  // res.status(201).send('user is required for save order')
}
export default handler
