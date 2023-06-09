import User from '../../../../models/User'
import { getToken } from 'next-auth/jwt'

import db from '../../../../utils/db'
// import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
  // const session = await getSession({ req })
  // if (!session || !session.user.isAdmin) {
  //   return res.status(401).send('admin signin required')
  // }
  const user = await getToken({ req })
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required')
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: 'Method not allowed' })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
    if (user.email === 'admin@example.com') {
      return res.status(400).send({ message: 'Can not delete admin' })
    }
    // await user.remove();
    await user.deleteOne({ _id: req.query.id })
    await db.disconnect()
    res.send({ message: 'User Deleted' })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'User Not Found' })
  }
}

export default handler
