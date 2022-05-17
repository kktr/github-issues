
import type { NextApiRequest, NextApiResponse } from "next";
import { Result } from "../interfaces/search";
import { UserData } from "./services/user.services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		let combineData = await getGithubData(req);
		// const query = req.query.search as string;

		return res.status(200).json(combineData);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
}

async function getGithubData(req: NextApiRequest): Promise<Result[]> {
	const search = req.query.search as string;

	if (search?.length < 2) throw new Error("Search string too short");

	let MappedUserData = await UserData(search);
	// let MappedRepoData = await RepositoryData(search);

	// let combineData = MappedUserData.concat(MappedRepoData);
	// let combineData = MappedUserData.concat(MappedRepoData);
	return MappedUserData;
}

