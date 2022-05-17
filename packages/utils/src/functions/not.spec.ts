import { not } from "./not";

describe("not", () => {
  describe("given a truthy function", () => {
    const truthy = () => true;

    it("then should flip the output", () => {
      expect(not(truthy)()).toBe(false);
    });
  });

  describe("given a falsy function", () => {
    const falsy = () => false;

    it("then should flip the output", () => {
      expect(not(falsy)()).toBe(true);
    });
  });

  describe("given a function that requires an argument", () => {
    const falsy = (arg: string) => arg === "zac";

    it("then should flip the output", () => {
      expect(not(falsy)("zac")).toBe(false);
      expect(not(falsy)("efron")).toBe(true);
    });
  });
});
