import { getSession } from 'next-auth/react';
// import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  /**
   * next js 13
   * 
   *   const user = await getToken({ req });
  if (!user) {
    return res.status(401).send('signin required');
  }
   */
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};
export default handler;
