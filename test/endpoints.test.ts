import axios from "axios";
import nock from "nock";
import { resolve } from "path";

const url = "http://localhost:3000/api/main" || <string>process.env.MainUrl;

describe("Test Check", () => {
	test("Test check", () => {
		const n = 1;

		expect(n).toBe(1);
	});
});

describe("e2e", () => {
	beforeEach(() => {
		nock.cleanAll();
		nock.disableNetConnect();
	});
	afterEach(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});
	test("should return ok status, without search", async () => {
		// await nock.recorder.rec({ output_objects: true, dont_print: true });
		nock.load(resolve(__dirname, "./__tapes__/", "ResponseNoQuerySearch.json"));
		expect(url).toBe("http://localhost:3000/api/main");
		const response = await axios.get(url);
		expect(response.status).toBe(200);
		// fs.writeFileSync(
		// 	"./test/__tapes__/ResponseNoQuerySearch.json",
		// 	JSON.stringify(nock.recorder.play())
		// );
	}, 30000);
	test("should return ok status with query search", async () => {
		// await nock.recorder.rec({ output_objects: true, dont_print: true });
		nock.load(resolve(__dirname, "./__tapes__/", "ResponseQuerySearch.json"));
		const search = "test";
		expect(url).toBe("http://localhost:3000/api/main");
		const response = await axios.get(url + `?search=${search}`);
		expect(response.status).toBe(200);
		// fs.writeFileSync(
		// 	"./test/__tapes__/ResponseQuerySearch.json",
		// 	JSON.stringify(nock.recorder.play())
		//
	}, 30000);
});
