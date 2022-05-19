import axios from "axios";

const url = "http://localhost:3000/api/main" || <string>process.env.MainUrl;

describe("Test Check", () => {
	test("Test check", () => {
		const n = 1;

		expect(n).toBe(1);
	});
});

describe("e2e", () => {
	test("should return ok status, without search", async () => {
		expect(url).toBe("http://localhost:3000/api/main");
		const response = await axios.get(url);
		expect(response.status).toBe(200);
	}, 30000);
	test("should return ok status with query search", async () => {
		const search = "test";
		expect(url).toBe("http://localhost:3000/api/main");
		const response = await axios.get(url + `?search=${search}`);
		expect(response.status).toBe(200);
	}, 30000);
});
