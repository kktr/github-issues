import type { NextApiRequest, NextApiResponse } from 'next'
import { UserData } from '../services/user.services'


export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  const username = req.query.username as string

  try {
    
    const User= await  UserData(username);

    res.status(200).json(User);

  } catch (error:any) {
    console.error(error)
    res.status(404).json({ message: error.message })
  }
    
  }


