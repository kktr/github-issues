import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(req: NextApiRequest, res:NextApiResponse) {
  const { userid } = req.query
  res.end(`Post: ${userid}`)
}