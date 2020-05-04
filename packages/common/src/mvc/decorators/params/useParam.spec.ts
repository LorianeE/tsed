import {ParamRegistry, ParamTypes, Property, Required, UseFilter, UseParam} from "@tsed/common";
import {Description, Example, Title} from "@tsed/swagger";
import {IFilter} from "../../interfaces/IFilter";

export class MyModel {
  @Title("iD")
  @Description("Description of calendar model id")
  @Example("example1", "Description example")
  @Property()
  public id: string;

  @Property()
  @Required()
  public name: string;
}

describe("@UseParam", () => {
  describe("when filter is a class", () => {
    it("should create useParam", () => {
      class Test {}

      class Ctrl {
        test(
          @UseParam(ParamTypes.BODY, {
            expression: "expression",
            useConverter: true,
            useValidation: true,
            paramType: ParamTypes.BODY,
            useType: Test
          })
          body: Test
        ) {}
      }

      const param = ParamRegistry.get(Ctrl, "test", 0);
      param.expression.should.eq("expression");
      param.paramType.should.eq(ParamTypes.BODY);
      param.type.should.eq(Test);
    });
    it("should create useFilter (withoutFilter)", () => {
      class Test {}

      class Ctrl {
        test(
          @UseFilter(ParamTypes.BODY, {
            expression: "expression",
            useConverter: true,
            useValidation: true,
            paramType: ParamTypes.BODY,
            useType: Test
          })
          body: Test
        ) {}
      }

      const param = ParamRegistry.get(Ctrl, "test", 0);
      param.expression.should.eq("expression");
      param.paramType.should.eq(ParamTypes.BODY);
      param.type.should.eq(Test);
    });
    it("should create useFilter (withFilter", () => {
      class Test {}

      class MyFilter implements IFilter {
        transform(expression: string, request: TsED.Request, response: TsED.Response): any {
          return "";
        }
      }

      class Ctrl {
        test(
          @UseFilter(MyFilter, {
            expression: "expression",
            useConverter: true,
            useValidation: true,
            paramType: ParamTypes.BODY,
            useType: Test
          })
          body: Test
        ) {}
      }

      const param = ParamRegistry.get(Ctrl, "test", 0);
      param.expression.should.eq("expression");
      param.paramType.should.eq(ParamTypes.BODY);
      param.type.should.eq(Test);
      param.filter!.should.eq(MyFilter);
    });
  });
});
