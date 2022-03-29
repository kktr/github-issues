import axios from 'axios';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GeneralRepo, GeneralRepoList } from '../interfaces/importListRepo';
import { GeneralUserList,GeneralUser } from '../interfaces/importListUsers';
import { RepositoryFromGithub } from '../interfaces/importRepo';
import { IStars } from '../interfaces/importStarredRepos';
import { UserGithub } from '../interfaces/ImportUser';
import { mockResults, Result, Search } from '../interfaces/search';





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse 
) {
 const search= req.query.search as string; ;
  try {
    if (typeof search !== 'string') { res.status(200).json({}); };
    if (search.length<2) throw new Error('Search string too short');
    
      const Users = await getExternalUsersFromGitHub(search);
      const FullUsers = await GetMoreUserData(Users);
      const MappedUserData = await MappingUserOutPutData(FullUsers);
    
      const Repositories = await getExternalRepositoriesAPIGitHub(search);
    const FullRepos = await GetMoreRepositoryData(Repositories);
    const MappedRepoData = await MappingRepositoryOutPutData(FullRepos);
    
    let combineData = MappedUserData.concat(MappedRepoData);
    
        res.status(200).json(combineData);
    } catch (err:any) {
        res.status(500).json({ message: err.message })
    }
}

export async function getExternalUsersFromGitHub(query: string ) {

  try {

    const res = await axios.get('https://api.github.com/search/users', { params: { q: query, per_page: 5, } 
     , headers: { Authorization: `token ${process.env.gitToken}` }  });
    const data: GeneralUserList = res.data;
    // console.log(data);
    return  data as GeneralUserList;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
  
export async function getExternalRepositoriesAPIGitHub(query:string):Promise<GeneralRepoList> {

  try {
    const res = await axios.get('https://api.github.com/search/repositories', {
      headers: { Authorization: `token ${process.env.gitToken}` },  params: { q: query, per_page: 5, } });
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
      const res = await axios.get('https://api.github.com/users/' + user.login, { headers: { Authorization: `token ${process.env.gitToken}` } });
      const data: UserGithub = res.data;
      // console.log(data);
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
      const res = await axios.get('https://api.github.com/repos/' + repo.owner.login + '/' + repo.name,  { headers: { Authorization: `token ${process.env.gitToken}` } });
      const data: RepositoryFromGithub = res.data;
      // console.log(data);
      repos.push(data);
    } 
    return repos;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
  
export  function MappingUserOutPutData(Users:UserGithub[]):Result[] {
  const data: Result[] = [];
 
  Users.forEach(user => { 
      const result:Result = {
      id: user.id,
      login: user.login,
      avatarURL: user.avatar_url,
      fullName: user.name,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      following: user.following,
      // starred: user.starredURL,
    };
    data.push(result);
  });
 
     
  return data;
}

export function MappingRepositoryOutPutData(Repository: RepositoryFromGithub[]): Result[] {
    const data: Result[] = [];
   Repository.forEach(repo => {
    let lastMonth: string;
if (!repo.updated_at) {lastMonth=differentMonth(repo.created_at)}
    
    lastMonth =differentMonth(repo.updated_at);
    const result: Result = {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      programingLanguage: repo.language ? repo.language : '',
      stargazersCount: repo.stargazersCount,
      updatedAt: lastMonth,
     issues: repo.open_issues_count,

    }
    
    data.push(result);
   });
  return data;
}


async function geGitHubStarred(user: string) {
  const response = await axios.get(`https://api.github.com/users/${user}/starred`,  {
      headers: { Authorization: `token ${process.env.gitToken}` },  params: {  per_page:100, } });
  const data: IStars[] = response.data;
  console.log( 'response',data);
//   for (d of)
  return data.length;
// stargazers_count
  
}



function differentMonth(updatedAt: Date) {
 return moment(updatedAt).fromNow();
};


