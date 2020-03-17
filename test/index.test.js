const FallbackLocalStorage = require("../dist/fallback-local-storage.cjs");

describe("calling and printing", () => {
  it("should not fail", () => {
    expect(FallbackLocalStorage.NAME).toBe("FallbackLocalStorage");
  });
});
