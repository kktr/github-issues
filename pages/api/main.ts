import type { NextApiRequest, NextApiResponse } from 'next'
import { mockResults } from '../interfaces/search';





export default function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    try {
        res.status(200).json({ mockResults });
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}
