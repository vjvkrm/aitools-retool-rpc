import { initiateRpcOpenAi } from "../openai_tools/initiateRpcOpenAi";
import { OpenAI } from "openai";

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
      choices: [{ message: { content: "OpenAI response" } }],
    };
    const mockRetoolResponse = "Retool response";

    // Mock OpenAI SDK
    OpenAI.prototype.chat.completions.create = jest.fn().mockResolvedValue(mockOpenAIResponse);

    // Mock fetch for Retool API call
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRetoolResponse),
    });

    const result = await initiateRpcOpenAi(
      mockPrompt,
      mockRetoolApiToken,
      mockRetoolHost,
      mockRetoolResourceId,
      mockOpenaiApiKey
    );

    expect(OpenAI.prototype.chat.completions.create).toHaveBeenCalledWith({
      model: "gpt-4o",
      messages: [{ role: "user", content: mockPrompt }],
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${mockRetoolHost}api/public/v1/resources/${mockRetoolResourceId}/rpc`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mockRetoolApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: "OpenAI response" }),
      }
    );

    expect(result).toBe(mockRetoolResponse);
  });

  it("should throw an error if required parameters are missing", async () => {
    await expect(initiateRpcOpenAi()).rejects.toThrow(
      "Missing required parameters"
    );
  });

  // To-DO Add more test if required : 
});
