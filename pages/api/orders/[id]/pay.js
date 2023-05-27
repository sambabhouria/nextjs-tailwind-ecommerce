// import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import Order from '../../../../models/Order'
import db from '../../../../utils/db'
// import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  /**
   * next js 13 
   * const user = await getToken({ req });
  if (!user) {
    return res.status(401).send('Error: signin required');
  }
   */
  // const session = await getSession({ req })
  // if (!session) {
  //   return res.status(401).send('Error: signin required')
  // }

  const user = await getToken({ req })
  if (!user) {
    return res.status(401).send('Error: signin required')
  }

  await db.connect()
  const order = await Order.findById(req.query.id)
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: 'Error: order is already paid' })
    }
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    }
    const paidOrder = await order.save()
    await db.disconnect()
    res.send({ message: 'order paid successfully', order: paidOrder })
  } else {
    await db.disconnect()
    res.status(404).send({ message: 'Error: order not found' })
  }
}

export default handler
