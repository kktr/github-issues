import fs from "fs-extra";
import nock from "nock";
export function saveTapeToFile(fileName: string) {
	fs.writeFileSync(
		`./test/__tapes__/${fileName}.json`,
		JSON.stringify(nock.recorder.play())
	);
}
