import { initiateRpcOpenAi } from "../index.js";

describe("initiateRpcOpenAi Function Tests", () => {
  it("should be a function", () => {
    expect(typeof initiateRpcOpenAi).toBe("function");
  });

  it("should not throw an error when called with a config object", () => {
    const config = {
      apiToken: "test-api-token",
      host: "https://test-host.com",
      resourceId: "test-resource-id",
      openaiApiKey: "test-openai-api-key",
    };

    expect(() => {
      initiateRpcOpenAi(config);
    }).not.toThrow();
  });
});
