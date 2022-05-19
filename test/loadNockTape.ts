import nock from "nock";
import { resolve } from "path";

export function loadNockTape(fileName: string) {
	nock.load(resolve(__dirname, "./__tapes__/", `${fileName}.json`));
}
