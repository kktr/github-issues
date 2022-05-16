
import type { NextApiRequest, NextApiResponse } from "next";
import { RepositoryData } from './services/repository.services';
import { UserData } from './services/user.services';




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const search = req.query.search as string;;
  try {
    if (typeof search !== 'string') { res.status(200).json({}); };
    if (search.length < 2) throw new Error('Search string too short');


    let MappedUserData = await UserData(search);
    let MappedRepoData = await RepositoryData(search);

    let combineData = MappedUserData.concat(MappedRepoData);

    res.status(200).json(combineData);
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}




