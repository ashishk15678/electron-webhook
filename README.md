# 🚀 GitHub PR Assistant Bot

A powerful GitHub App built for GSOC (Google Summer of Code) that automatically responds to pull requests with intelligent comments. Built with TypeScript, Express, and Bun.

## ✨ Features

- 🤖 Automatic PR greeting and response
- 📝 Detailed PR information in comments
- 🔒 Secure JWT-based authentication
- 🎯 Webhook event handling
- 📊 Detailed logging system

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh) v1.2.4
- **Language**: TypeScript
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **HTTP Client**: Axios
- **Other Tools**: body-parser, jsonwebtoken

## 🚦 Prerequisites

- [Bun](https://bun.sh) (v1.2.4 or higher)
- A GitHub account
- A registered GitHub App

## 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/ashishk15678/electron-webhook.git
cd electron-webhook
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env` file:
```env
DEBUG_MODE=true
LOG_LEVEL=debug
GITHUB_TOKEN=your_github_token
```

## 🔑 GitHub App Setup

1. Go to [GitHub Apps settings](https://github.com/settings/apps)
2. Create a new GitHub App
3. Set permissions:
   - Pull requests: Read & Write
   - Issues: Read & Write
4. Generate and download private key
5. Install the app in your repository
6. Copy the Installation ID from the URL
7. Generate an access token using the provided JWT authentication

## 🏃‍♂️ Running the App

Development mode:
```bash
bun run index.ts
```

The server will start on port 3000.

## 📝 Usage

The app automatically:
1. Listens for PR webhook events
2. Validates incoming payloads
3. Responds to new PRs with a welcome message
4. Includes PR details in the comment

## 🔧 Configuration

Key configuration files:
- `tsconfig.json`: TypeScript configuration
- `.env`: Environment variables
- `package.json`: Project dependencies
- `functions.ts`: Core PR handling logic
- `jwt.ts`: Authentication utilities

## 🎯 GSOC Project Details

This project is part of Google Summer of Code, focusing on:
- Automating PR workflows
- Improving developer experience
- Implementing best practices for GitHub Apps
- Contributing to open source

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see below for details:

```text
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📫 Contact

Ashish Kumar - [@ashish15678](https://twitter.com/ashish15678) - 15678ashish@gmail.com

Project Link: [https://github.com/ashishk15678/electron-webhook](https://github.com/ashishk15678/electron-webhook)
