import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserGithub } from '../interfaces/ImportUser';
import { mockResults } from '../interfaces/search';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    try {
        const data = await getExternalAPIGitHub();
        console.log(data);
        res.status(200).json({data});
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}

export async function getExternalAPIGitHub() {
  // Fetch data from external API
    const res = await axios.get('https://api.github.com/users/octocat');
    const user: UserGithub = res.data;


  // Pass data to the page via props
  return { user }
}