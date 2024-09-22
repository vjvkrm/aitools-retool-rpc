import { OpenAI } from "openai";


async function orchestrateOpenAi(
  userQuery,
  tools,
  systemMessage,
  model,
  apiKey
) {
  const openai = new OpenAI({ apiKey });

  try {
    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: userQuery },
    ];

    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
      tools: tools,
    });

    if (response.choices[0].finish_reason == "tool_calls") {
      return response.choices[0].message.tool_calls;
    }

    return "no tool";
  } catch (error) {
    console.error("Error in orchestrateOpenAi:");
    return error.message;
  }
}

export { orchestrateOpenAi };
