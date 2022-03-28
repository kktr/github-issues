import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralUserList } from '../interfaces/importListUsers';
import { UserGithub } from '../interfaces/ImportUser';
import { mockResults } from '../interfaces/search';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    try {
        const data = await getExternalUserAPIGitHub();
        console.log(data);
        res.status(200).json({data});
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}

export async function getExternalUserAPIGitHub() {

  try {
    const res = await axios.get('https://api.github.com/search/users',{params: {q: 'john',}});
    const data: GeneralUserList = res.data;
    
    return {data };
  } catch (error) {
    console.error(error);
  }
  }