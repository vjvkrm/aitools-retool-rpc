# OpenAI RPC Server for Retool

![OpenAI Logo](./assets/openai.png) ![Retool Logo](./assets/retool-new-20247015.logowik.com.webp)

A powerful and flexible library benefitting from Retool RPC that integrates OpenAI's capabilities with Retool, allowing seamless AI-powered functionality - tool callings in your Retool applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 Easy integration with Retool applications.
- 🧠 Leverage OpenAI's powerful AI models and tool calling features.
- ⚡ High-performance RPC server that runs code on your own server.
- 🔒 Secure handling of API keys and sensitive data.
- 🛠 Customizable configuration options.

## Installation

Install the package using npm:

```bash
npm install aitools-retool-rpc
```

## Quick Start

1. Install the package as shown above.
2. Set up your environment variables (see Configuration).
3. In your main application file:

```javascript
import { initiateRpcOpenAi } from "aitools-retool-rpc";
import dotenv from "dotenv";
dotenv.config();

const config = {
  apiToken: process.env.RETOOL_API_TOKEN,
  host: process.env.RETOOL_HOST,
  resourceId: process.env.RETOOL_RESOURCE_ID,
  openaiApiKey: process.env.OPENAI_API_KEY,
};

initiateRpcOpenAi(config);
```

Optional Arguments in Config:

```javascript
const config = {
  environmentName: config.environmentName || "production",
  pollingIntervalMs: config.pollingIntervalMs || 1000,
  version: config.version || "0.0.1",
  logLevel: config.logLevel || "info",
  model: config.model || "gpt-4",
};
```

## Configuration

Create a `.env` file in your project root with the following variables:

```plaintext
RETOOL_API_TOKEN=your_api_token_here
RETOOL_HOST=https://your-company.retool.com
RETOOL_RESOURCE_ID=your_resource_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

(Provide usage examples here)

## Contributing

We welcome contributions to improve this project. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

MIT License
