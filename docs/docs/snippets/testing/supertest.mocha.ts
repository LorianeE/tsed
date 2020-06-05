import {ExpressApplication, PlatformTest} from "@tsed/common";
import {expect} from "chai";
import * as SuperTest from "supertest";
import {Server} from "../Server";

describe("Rest", () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  before(PlatformTest.bootstrap(Server));
  before(PlatformTest.inject([ExpressApplication], (expressApplication: ExpressApplication) => {
    request = SuperTest(expressApplication);
  }));

  after(PlatformTest.reset);

  describe("GET /rest/calendars", () => {
    it("should do something", async () => {
      const response = await request.get("/rest/calendars").expect(200);

      expect(response.body).to.be.an("array");
    });
  });
});