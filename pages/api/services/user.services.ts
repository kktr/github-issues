import axios from "axios";
import { IUser, IUserSearchList } from "../../interfaces/importListUsers";
import { IStars } from "../../interfaces/importStarredRepos";
import { UserGithub } from "../../interfaces/ImportUser";
import { Result } from "../../interfaces/search";

export async function getExternalUsersFromGitHub(query?: string) {
	try {
		const res = query
			? await axios.get(<string>process.env.UsersSearchUrl, {
					params: { q: query, per_page: 5 },
					headers: { Authorization: `token ${process.env.gitToken}` },
			  })
			: await axios.get(<string>process.env.UsersUrl, {
					headers: { Authorization: `token ${process.env.gitToken}` },
			  });

		return query ? GetMoreUserData(res.data.items) : GetMoreUserData(res.data);
	} catch (error: any) {
		console.error(error);
		throw new Error(error);
	}
}

export async function GetMoreUserData(BasicsUsers: IUser[]) {
	let promises = [];
	let user: UserGithub[] = [];

	promises = BasicsUsers.map((user) => {

		return axios.get(process.env.UserDetailsUrl + `${user.login}`, {
			headers: { Authorization: `token ${process.env.gitToken}` },
		});
	});

	await Promise.all(promises)
		.then((response) => {
			user = response.map((res) => {
				return res.data;
			});
		})
		.catch((error) => {
			console.error("promiseAll", error);
			throw new Error(error);
		});

	return user;
}

export async function GetMoreUserFromSearchData(BasicsUsers: IUserSearchList) {
	let promises = [];
	let user: UserGithub[] = [];

	promises = BasicsUsers.items.map((user) => {
		// console.log(process.env.UserDetailsUrl + `${user.login}`);

		return axios.get(process.env.UserDetailsUrl + `${user.login}`, {
			headers: { Authorization: `token ${process.env.gitToken}` },
		});
	});

	// console.log("promises", promises[0]);
	await Promise.all(promises)
		.then((response) => {
			user = response.map((res) => {
				return res.data;
			});
		})
		.catch((error) => {
			console.error("promiseAll", error);
			throw new Error(error);
		});

	return user;
}

export function MappingUserOutPutData(Users: UserGithub[]): Result[] {
	const data: Result[] = [];

	Users.forEach((user) => {
		const result: Result = {
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
async function getGitHubStarred(user: string) {
	const response = await axios.get(
		process.env.UserDetailsUrl + `${user}/starred`,
		{
			headers: { Authorization: `token ${process.env.gitToken}` },
			params: { per_page: 100 },
		}
	);
	const data: IStars[] = response.data;
	return data.length;
}

export async function UserData(query: string): Promise<Result[]> {
	const Users = await getExternalUsersFromGitHub(query);

	if (Object.keys(Users).length === 0) {
		return [];
	}

	return MappingUserOutPutData(Users);
}