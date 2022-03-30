import MainRoute from '../pages/api/main'; 
import { createMocks } from 'node-mocks-http';

describe("Test Check", () => {
  test("Test check", () => {
      const n = 1;

        expect(n).toBe(1);
      
     
    });
});
  
describe('e2e', () => {
    test.skip('should return 200',async () => {
      const {req,res}=createMocks();
      await MainRoute(req, res);
      expect(res.statusCode).toBe(200);
    });
});