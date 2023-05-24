import { getSession } from 'next-auth/react';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';
import User from '@/models/User';

const handler = async (req, res) => {
  const session =
    req.method === 'GET'
      ? await getSession({ req })
      : await getServerSession(req, res, authOptions);

  const userFromDataBase = await User.findOne({ email: session.user.email });
  const { isAdmin } = userFromDataBase;

  const userIsAdmine = req.method === 'GET' ? session.user.isAdmin : isAdmin;
  if (!session || (session && !userIsAdmine)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
export default handler;
