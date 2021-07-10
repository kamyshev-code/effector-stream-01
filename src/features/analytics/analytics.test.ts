import { empty } from "./analytics";

describe("analytics", () => {
  test("should run tests", () => {
    empty();
    expect(true).toBe(true);
  });
});
