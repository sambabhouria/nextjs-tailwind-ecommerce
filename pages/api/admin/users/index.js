// import { getSession } from 'next-auth/react'
import User from '../../../../models/User'
import db from '../../../../utils/db'
import { getToken } from 'next-auth/jwt'

const handler = async (req, res) => {
  const user = await getToken({ req })
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required')
  }

  // const session = await getSession({ req })
  // if (!session || !session.user.isAdmin) {
  //   return res.status(401).send('admin signin required')
  // }
  await db.connect()
  const users = await User.find({})
  await db.disconnect()
  res.send(users)
}

export default handler
