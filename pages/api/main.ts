import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralRepo, GeneralRepoList } from '../interfaces/importListRepo';
import { GeneralUserList,GeneralUser } from '../interfaces/importListUsers';
import { UserGithub } from '../interfaces/ImportUser';
import { mockResults, Result } from '../interfaces/search';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    try {
      // const Users = await getExternalUsersFromGitHub();
      // const FullUsers = await GetMoreUserData(Users);
     
      const Repositories = await getExternalRepositoriesAPIGitHub();
      const FullRepos = await GetMoreRepositoryData(Repositories);

      // if (!Users || !Repositories) { throw new Error('User or Repo not found') };
        // const data= sendBasicData(Users, Repositories);
        // console.log(Users);
        res.status(200).json({FullRepos});
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}

export async function getExternalUsersFromGitHub() {

  try {
    const res = await axios.get('https://api.github.com/search/users', { params: { q: 'john', per_page:5} });
    const data: GeneralUserList = res.data;
    console.log(data);
    return  data as GeneralUserList;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
  
export async function getExternalRepositoriesAPIGitHub():Promise<GeneralRepoList> {

  try {
    const res = await axios.get('https://api.github.com/search/repositories',{params: {q: 'math', per_page:5}});
    const data: GeneralRepoList = res.data;
    
    return data as GeneralRepoList;
  } catch (error:any) {
    console.error(error);
    throw new Error(error);
  }
}
export async function  GetMoreUserData(BasicsUsers:GeneralUserList)  {
  const users: UserGithub[] = []
  try {
    for (let user of BasicsUsers.items) {
      const res = await axios.get('https://api.github.com/users/' + user.login);
      const data: UserGithub = res.data;
      console.log(data);
      users.push(data);
    } 
    return users;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}

export async function  GetMoreRepositoryData(BasicsRepository:GeneralRepoList)  {
  const repos: UserGithub[] = []
  try {
    for (let repo of BasicsRepository.items) {
      const res = await axios.get('https://api.github.com/repos/' + repo.owner.login + '/' + repo.name);
      const data: UserGithub = res.data;
      console.log(data);
      repos.push(data);
    } 
    return repos;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
  
// export  function sendBasicData(Users:GeneralUserList,Repository:GeneralRepoList):Result[] {
//   const data: Result[] = [];
//   Users.items.forEach((user:GeneralUser) => {
//     const result:Result = {
//       id: user.id,
//       login: user.login,
//       avatarURL: user.avatarURL,
//       // fullName: user.name,
//       // bio: user.bio,
//       // location: user.location,
//       // followers: user.followers,
//       // following: user.following,
//       starred: user.starredURL,
//     };
//     data.push(result);
//   });
//   Repository.items.forEach((repo:GeneralRepo) => {
//     const result:Result = {
//       id: repo.id,
//       name: repo.name,
//       // stargazersCount: repo.stargazers_count,
//       description: repo.description,
//       programingLanguage: repo.language,
//       // updatedAt: repo.updated_at,
//       // issues: repo.issues_url,
//       // license: repo.license,
//     };
//     data.push(result);
//   });
//   return data;
// }
   
  
