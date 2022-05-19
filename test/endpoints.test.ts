import axios from "axios";

describe("Test Check", () => {
	test("Test check", () => {
		const n = 1;

		expect(n).toBe(1);
	});
});

describe("e2e", () => {
	test("should return 200", async () => {
		const response = await axios.get("http://localhost:3000/api/main");
		expect(response.status).toBe(200);
	}, 30000);
});
