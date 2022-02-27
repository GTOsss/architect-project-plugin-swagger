const fs = require("fs");
const path = require("path");
const {
  createEndpointsBySwaggerSpec,
  createTypesFromSchemesBySwaggerSpec,
} = require("../swagger");

const typesMap = {
  integer: "number",
  int: "number",
  string: "string",
  boolean: "boolean",
  object: "AnyObject", // если в scheme только type: object
  "*": "any", // any если не удалось определить тип
};

const overrideFieldTypesMap = {
  id: "ID",
};

const pathEmptyStruct = path.resolve(
  __dirname,
  "./examples-swagger-json/structure.json"
);
const pathStructWithRoute = path.resolve(
  __dirname,
  "./examples-swagger-json/structure-route.json"
);
const pathStructWithRouteComponents = path.resolve(
  __dirname,
  "./examples-swagger-json/structure-route-components.json"
);

const emptyStructSpec = JSON.parse(fs.readFileSync(pathEmptyStruct).toString());
const structWithRouteSpec = JSON.parse(
  fs.readFileSync(pathStructWithRoute).toString()
);
const structWithRouteComponentsSpec = JSON.parse(
  fs.readFileSync(pathStructWithRouteComponents).toString()
);

describe("empty-structure", () => {
  test("createEndpointsBySwaggerSpec", () => {
    const res = createEndpointsBySwaggerSpec({
      swaggerSpec: emptyStructSpec,
      overrideFieldTypesMap,
      typesMap,
    });
    expect(res).toStrictEqual({ endpoints: [], pathPrefix: "" });
  });

  test("createTypesFromSchemesBySwaggerSpec", () => {
    const res = createTypesFromSchemesBySwaggerSpec({
      swaggerSpec: emptyStructSpec,
      overrideFieldTypesMap,
      typesMap,
    });
    expect(res).toStrictEqual({ typeCodes: [], typeNames: [] });
  });
});

describe("struct-with-route", () => {
  test("createEndpointsBySwaggerSpec", () => {
    const res = createEndpointsBySwaggerSpec({
      swaggerSpec: structWithRouteSpec,
      overrideFieldTypesMap,
      typesMap,
    });
    expect(res).toMatchSnapshot();
  });

  test("createTypesFromSchemesBySwaggerSpec", () => {
    const res = createEndpointsBySwaggerSpec({
      swaggerSpec: structWithRouteSpec,
      overrideFieldTypesMap,
      typesMap,
    });
    expect(res).toMatchSnapshot();
  });
});

describe("struct-with-route-components", () => {
  test("createEndpointsBySwaggerSpec", () => {
    const res = createEndpointsBySwaggerSpec({
      swaggerSpec: structWithRouteComponentsSpec,
      overrideFieldTypesMap,
      typesMap,
    });
    expect(res).toMatchSnapshot();
  });

  test("createTypesFromSchemesBySwaggerSpec", () => {
    const res = createEndpointsBySwaggerSpec({
      swaggerSpec: structWithRouteComponentsSpec,
      overrideFieldTypesMap,
      typesMap,
    });
    expect(res).toMatchSnapshot();
  });
});
