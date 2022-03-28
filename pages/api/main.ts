import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralRepo, GeneralRepoList } from '../interfaces/importListRepo';
import { GeneralUserList,GeneralUser } from '../interfaces/importListUsers';
import { RepositoryFromGithub } from '../interfaces/importRepo';
import { UserGithub } from '../interfaces/ImportUser';
import { mockResults, Result } from '../interfaces/search';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
    try {
      const Users = await getExternalUsersFromGitHub();
      const FullUsers = await GetMoreUserData(Users);
     
      const Repositories = await getExternalRepositoriesAPIGitHub();
      const FullRepos = await GetMoreRepositoryData(Repositories);

      if (!Users || !Repositories) { throw new Error('User or Repo not found') };
        const data= MappingOutPutData(FullUsers, FullRepos);
        // console.log(Users);
      
        res.status(200).json({data});
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}

export async function getExternalUsersFromGitHub() {

  try {

    const res = await axios.get('https://api.github.com/search/users', { params: { q: 'john', per_page:5, auth:process.env.gitToken} });
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
  const repos: RepositoryFromGithub[] = []
  try {
    for (let repo of BasicsRepository.items) {
      const res = await axios.get('https://api.github.com/repos/' + repo.owner.login + '/' + repo.name);
      const data: RepositoryFromGithub = res.data;
      console.log(data);
      repos.push(data);
    } 
    return repos;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
  
export  function MappingOutPutData(Users:UserGithub[],Repository:RepositoryFromGithub[]):Result[] {
  const data: Result[] = [];
 
  Users.forEach(user => { 
      const result:Result = {
      id: user.id,
      login: user.login,
      avatarURL: user.avatarURL,
      fullName: user.name,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      following: user.following,
      starred: user.starredURL,
    };
    data.push(result);
  });
  Repository.forEach(repo => {
    const result: Result = {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      programingLanguage: repo.language||' ',
      stargazersCount: repo.stargazersCount,
     updatedAt:'',
      
    }
      
    data.push(result);
  });
     



  return data;
}
   
  
