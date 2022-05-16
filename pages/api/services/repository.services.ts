import axios from "axios";
import moment from "moment";
import { GeneralRepoList } from "../../interfaces/importListRepo";
import { RepositoryFromGithub } from "../../interfaces/importRepo";
import { Result } from "../../interfaces/search";

export async function getExternalRepositoriesAPIGitHub(
	query: string
): Promise<GeneralRepoList> {
	try {
		const res = await axios.get(<string>process.env.RepoUrl, {
			headers: { Authorization: `token ${process.env.gitToken}` },
			params: { q: query, per_page: 5 },
		});
		const data: GeneralRepoList = res.data;

		return data as GeneralRepoList;
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function GetMoreRepositoryData(BasicsRepository: GeneralRepoList) {
	let promises = [];
	let repo: RepositoryFromGithub[] = [];
	promises = BasicsRepository.items.map((repo) => {
		return axios.get(
			<string>process.env.UserRepoUrl + repo.owner.login + "/" + repo.name,
			{ headers: { Authorization: `token ${process.env.gitToken}` } }
		);
	});

	await Promise.all(promises)
		.then((response) => {
			repo = response.map((res) => {
				return res.data;
			});
		})
		.catch((error) => {
			console.error(error);
			throw new Error(error);
		});
	console.log("response", repo);
	return repo;
}


export function MappingRepositoryOutPutData(Repository: RepositoryFromGithub[]): Result[] {
  const data: Result[] = [];
  Repository.forEach(repo => {
    let lastMonth: string;
    if (!repo.updated_at) { lastMonth = differentMonth(repo.created_at) }

    lastMonth = differentMonth(repo.updated_at);
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



export async function RepositoryData(query: string): Promise<Result[]> {
  const Repositories = await getExternalRepositoriesAPIGitHub(query);
  if (Object.keys(Repositories).length === 0) { return []; }

  const FullRepos = await GetMoreRepositoryData(Repositories);
  return MappingRepositoryOutPutData(FullRepos);

}