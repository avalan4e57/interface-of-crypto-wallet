import { toBasicUnit, toMainUnit } from "./transformTokenValue";

describe("toBasicUnit", () => {
  it("should return the value in basic unit", () => {
    const value = "1";
    const decimals = "18";
    const expected = "1000000000000000000";
    const result = toBasicUnit(value, decimals);
    expect(result).toEqual(expected);
  });
  it("should return the value in basic unit", () => {
    const value = "99.45678";
    const decimals = "6";
    const expected = "99456780";
    const result = toBasicUnit(value, decimals);
    expect(result).toEqual(expected);
  });
});

describe("toMainUnit", () => {
  it("should return the value in main unit", () => {
    const value = "1000000000000000000";
    const decimals = "18";
    const expected = "1";
    const result = toMainUnit(value, decimals);
    expect(result).toEqual(expected);
  });
  it("should return the value in main unit", () => {
    const value = "99456780";
    const decimals = "6";
    const expected = "99.45678";
    const result = toMainUnit(value, decimals);
    expect(result).toEqual(expected);
  });
});
