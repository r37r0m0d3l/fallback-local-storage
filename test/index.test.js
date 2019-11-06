const FallbackLocalStorage = require("../fallback-local-storage.js");

describe("calling and printing", () => {
  it("should not fail", () => {
    expect(FallbackLocalStorage.NAME).toBe("FallbackLocalStorage");
  });
});
