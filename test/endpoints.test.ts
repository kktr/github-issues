import axios from "axios";
import nock from "nock";
import { loadNockTape } from "./loadNockTape";

const url =
	"http://localhost:3000/api/main" || <string>process.env.MainEndpoint;

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
		// await recordTape();
		loadNockTape("ResponseNoQuerySearch");
		expect(url).toBe("http://localhost:3000/api/main");
		const response = await axios.get(url);
		expect(response.status).toBe(200);
		// saveTapeToFile("ResponseNoQuerySearch");
	}, 30000);

	test("should return ok status with query search", async () => {
		// await recordTape();
		loadNockTape("ResponseQuerySearch");
		const search = "test";
		expect(url).toBe("http://localhost:3000/api/main");
		const response = await axios.get(url + `?search=${search}`);
		expect(response.status).toBe(200);
		// saveTapeToFile("ResponseQuerySearch");
	}, 30000);
});


