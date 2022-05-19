import axios from "axios";
import moment from "moment";
import { GeneralRepo } from "../../interfaces/importListRepo";
import { RepositoryFromGithub } from "../../interfaces/importRepo";
import { Result } from "../../interfaces/search";

export async function getExternalRepositoriesAPIGitHub(query: string) {
	try {
		const res = query
			? await axios.get(`${process.env.RepoUrl}`, {
					headers: { Authorization: `token ${process.env.gitToken}` },
					params: { q: query, per_page: 30, page: 1 },
			  })
			: await axios.get(`${process.env.RepoUrl}`, {
					params: { q: "typescript", per_page: 30, page: 1 },
					headers: { Authorization: `token ${process.env.gitToken}` },
			  });
		return GetMoreRepositoryDetails(res.data.items);
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
}

export async function GetMoreRepositoryDetails(
	BasicsRepository: RepositoryFromGithub[] | GeneralRepo[]
) {
	let promises = [];
	let repo: RepositoryFromGithub[] = [];
	promises = BasicsRepository.map((repo) => {
		return axios.get(
			<string>process.env.UserRepoUrl + `${repo.owner.login}/${repo.name}`,
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
	return repo;
}

export function MappingRepositoryOutPutData(
	Repository: RepositoryFromGithub[]| GeneralRepo[]
): Result[] {
	const data: Result[] = [];
	Repository.forEach((repo) => {
		
		const result: Result = {
			id: repo.id,
			name: repo.name,
			description: repo.description,
			programingLanguage: repo.language ? repo.language : "",
			stargazersCount: repo.stargazersCount,
			updatedAt: repo.updated_at.toString(),
			issues: repo.open_issues_count,
		};

		data.push(result);
	});
	return data;
}

function differentMonth(updatedAt: Date) {
	return moment(updatedAt).fromNow();
}

export async function RepositoryData(query: string) {
	const Repositories = await getExternalRepositoriesAPIGitHub(query);
	if (Object.keys(Repositories).length === 0) {
		return [];
	}
	return MappingRepositoryOutPutData(
		await GetMoreRepositoryDetails(Repositories)
	);
}
