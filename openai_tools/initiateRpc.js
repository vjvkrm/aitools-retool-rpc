import { RetoolRPC } from "retoolrpc";
import { orchestrateOpenAi } from "./orchestrateOpenAI.js";
import dotenv from "dotenv";
dotenv.config();

const apiToken = process.env.RETOOL_API_TOKEN;
const host = process.env.RETOOL_HOST;
const resourceId = process.env.RETOOL_RESOURCE_ID;
const openaiApiKey = process.env.OPENAI_API_KEY;

const config = {
  apiToken,
  host,
  resourceId,
  openaiApiKey,
};

function initiateRpcOpenAi(config) {
  const rpc = new RetoolRPC({
    apiToken: config.apiToken,
    host: config.host,
    resourceId: config.resourceId,
    environmentName: config.environmentName || "production",
    pollingIntervalMs: config.pollingIntervalMs || 1000,
    version: config.version || "0.0.1",
    logLevel: config.logLevel || "info",
  });

  const openaiApiKey = config.openaiApiKey;
  const model = config.model || "gpt-4o";

  rpc.register({
    name: "OpenAI function calling",
    arguments: {
      userQuery: {
        type: "string",
        description: "question asked by user",
        required: true,
      },
      tools: {
        type: "json",
        description: "Tools to be used by AI model",
        required: true,
      },
      systemMessage: {
        type: "string",
        description: "message from system",
        required: true,
      },
    },
    implementation: async (args, context) => {
      const { userQuery, tools, systemMessage } = args;

      const result = await orchestrateOpenAi(
        userQuery,
        tools,
        systemMessage,
        model,
        openaiApiKey
      );

      return {
        data: result,
      };
    },
  });

  rpc.listen();
}

export default initiateRpcOpenAi;

initiateRpcOpenAi(config);
