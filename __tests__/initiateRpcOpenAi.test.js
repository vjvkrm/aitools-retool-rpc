const { initiateRpcOpenAi } = require("../openai_tools/initiateRpcOpenAi");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

jest.mock("axios");
jest.mock("openai");

describe("initiateRpcOpenAi", () => {
  const mockPrompt = "Test prompt";
  const mockRetoolApiToken = "test_token";
  const mockRetoolHost = "https://test.retool.com/";
  const mockRetoolResourceId = "test_resource_id";
  const mockOpenaiApiKey = "test_openai_key";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully make OpenAI and Retool API calls", async () => {
    const mockOpenAIResponse = {
      data: {
        choices: [{ message: { content: "OpenAI response" } }],
      },
    };
    const mockRetoolResponse = { data: "Retool response" };

    OpenAIApi.prototype.createChatCompletion = jest
      .fn()
      .mockResolvedValue(mockOpenAIResponse);
    axios.post.mockResolvedValue(mockRetoolResponse);

    const result = await initiateRpcOpenAi(
      mockPrompt,
      mockRetoolApiToken,
      mockRetoolHost,
      mockRetoolResourceId,
      mockOpenaiApiKey
    );

    expect(OpenAIApi.prototype.createChatCompletion).toHaveBeenCalledWith({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: mockPrompt }],
    });
    expect(axios.post).toHaveBeenCalledWith(
      `${mockRetoolHost}api/public/v1/resources/${mockRetoolResourceId}/rpc`,
      { prompt: "OpenAI response" },
      {
        headers: {
          Authorization: `Bearer ${mockRetoolApiToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toBe(mockRetoolResponse.data);
  });

  it("should throw an error if required parameters are missing", async () => {
    await expect(initiateRpcOpenAi()).rejects.toThrow(
      "Missing required parameters"
    );
  });

  // Add more test cases for error handling scenarios
});
