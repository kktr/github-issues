import type { NextApiRequest, NextApiResponse } from 'next'
import { mockResults } from '../interfaces/search';





export default function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    res.status(200).json({mockResults });
}
