import axios from "axios";
import moment from "moment";
import { GeneralRepoList } from "../../interfaces/importListRepo";
import { RepositoryFromGithub } from "../../interfaces/importRepo";
import { Result } from "../../interfaces/search";

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





function differentMonth(updatedAt: Date) {
 return moment(updatedAt).fromNow();
};



export async function RepositoryData(query: string):Promise<Result[]> {
    const Repositories = await getExternalRepositoriesAPIGitHub(query);
        if (Object.keys(Repositories).length === 0) { return []; }

    const FullRepos = await GetMoreRepositoryData(Repositories);
   return  MappingRepositoryOutPutData(FullRepos);
    
}