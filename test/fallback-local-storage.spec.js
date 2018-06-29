import { expect } from "chai";
import FallbackLocalStorage from "../index";

describe("Given an instance of my library", () => {
  let appStorageBase;
  let appStorageSer;
  before(() => {
    appStorageBase = new FallbackLocalStorage(false, false, false);
    appStorageSer = new FallbackLocalStorage(false, false, true);
  });
  describe("when I need the name", () => {
    it("should return the name", () => {
      expect(FallbackLocalStorage.NAME).to.be.equal("FallbackLocalStorage");
    });
  });
  describe("setItem();", () => {
    it("setItem('a', {a: 1});", () => {
      appStorageSer.setItem("a", { a: 1 });
      expect(appStorageSer.getItem("a").a).to.be.equal(1);
    });
  });
});
