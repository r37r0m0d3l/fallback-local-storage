import {expect} from "chai";
import FallbackLocalStorage from "../index.js";

describe("Given an instance of my library", function () {
  var appStorageBase;
  var appStorageSer;
  before(function () {
    appStorageBase = new FallbackLocalStorage(false, false, false);
    appStorageSer = new FallbackLocalStorage(false, false, true);
  });
  describe("when I need the name", function () {
    it("should return the name", () => {
      expect(FallbackLocalStorage.NAME).to.be.equal("FallbackLocalStorage");
    });
  });
  describe("setItem();", function () {
    it("setItem('a', {a: 1});", () => {
      appStorageSer.setItem("a", {a: 1});
      expect(appStorageSer.getItem("a")["a"]).to.be.equal(1);
    });
  });
});