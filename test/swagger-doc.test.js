"use strict";

const mock = require("egg-mock");

describe("test/swagger-doc.test.js", () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: "apps/swagger-doc-test"
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it("should GET /index.html", () => {
    const { basePath } = app.config.swaggerdoc;
    return app
      .httpRequest()
      .get(`${basePath}/index.html`)
      .expect(200);
  });

  it("should GET /swagger.json", () => {
    const { basePath } = app.config.swaggerdoc;
    return app
      .httpRequest()
      .get(`${basePath}/swagger.json`)
      .expect(200);
  });
});
