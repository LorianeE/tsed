import {JsonSchema, Schema} from "../../../src/jsonschema";
import {stubSchemaDecorator} from "./utils";

describe("Schema()", () => {
  it("should store data", () => {
    const decorateStub = stubSchemaDecorator();
    const schema = new JsonSchema();
    Schema({description: "description"});
    // @ts-ignore
    decorateStub.getCall(0).args[0](schema);
    schema.description.should.be.eq("description");
    decorateStub.restore();
  });
});
