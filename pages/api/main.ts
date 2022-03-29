
import type { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../interfaces/search';
import { RepositoryData } from './services/repository.services';
import { UserData } from './services/user.services';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
 const search= req.query.search as string; ;
  try {
    if (typeof search !== 'string') { res.status(200).json({}); };
    if (search.length<2) throw new Error('Search string too short');
    
 
   let MappedUserData=  await UserData(search) ;
    let MappedRepoData= await RepositoryData(search);
    
    // if (MappedUserData.length === 0) throw new Error('No user found');
    // if (MappedRepoData.length === 0) throw new Error('No repo found');
    
    let combineData = MappedUserData.concat(MappedRepoData);
    
        res.status(200).json(combineData);
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}




