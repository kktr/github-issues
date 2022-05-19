
import type { NextApiRequest, NextApiResponse } from "next";
import { Result } from "../interfaces/search";
import { cors } from "./cors/cors";
import { runMiddleware } from "./middleware/middleware.cors";
import { RepositoryData } from "./services/repository.services";
import { UserData } from "./services/user.services";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		runMiddleware(req, res, cors);
		let combineData = await getGithubData(req);
		return res.status(200).json(combineData);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
}

async function getGithubData(req: NextApiRequest): Promise<Result[]> {
	const search = req.query.search as string;
	if (search?.length < 2) throw new Error("Search string too short");
	let MappedUserData = await UserData(search);
	let MappedRepoData = await RepositoryData(search);
	return [...MappedUserData, ...MappedRepoData];
}
