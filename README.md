# 📂 Vaultify

[![CI (Quality & Tests)](https://github.com/Treast/vaultify/actions/workflows/ci.yml/badge.svg)](https://github.com/Treast/vaultify/actions)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

**A privacy-focused CLI tool that automates OCR and local AI processing to intelligently organize and archive documents.**

Vaultify transforms your messy scans and images into an organized archive. By leveraging **Tesseract.js** for text extraction and **Ollama** for local AI analysis, your sensitive documents never leave your machine.

---

## ✨ Key Features

- **Local-First AI**: Powered by [Ollama](https://ollama.com/), ensuring 100% data privacy.
- **Automated OCR**: Extracts text from images and PDFs using Tesseract.js.
- **Smart Organization**: Recursively crawls your directories and mirrors the structure in a `vaultified/` folder.
- **Modern CLI**: Beautiful terminal interface with real-time progress thanks to Ora and Chalk.
- **Developer Friendly**: Built with TypeScript, Biome for linting, and Vitest for reliability.

---

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** (v20.10.0 or higher)
2.  **Ollama** installed and running:
    ```bash
    ollama pull deepseek-r1
    ```

### Usage (No Install Required)

Run Vaultify directly using `npx` by pointing it to your documents directory:

```bash
npx @treast/vaultify ./Documents
```

## 🛠️ Options

| Flag               | Description                          | Default                             |
| ------------------ | ------------------------------------ | ----------------------------------- |
| `--model`          | AI provider                          | `ollama`                            |
| `--ollama-api-url` | The Ollama endpoint                  | http://127.0.0.1:11434/api/generate |
| `--ollama-model`   | The Ollama model to use for analysis | `deepseek-r1`                       |
| `--language`       | OCR language (ISO 639-2)             | `fra`                               |
| `--output`         | The name of the output folder        | `vaultified`                        |

## 🧪 Development

If you want to contribute or build from source:

```bash
git clone https://github.com/Treast/vaultify.git
cd vaultify
npm install
npm run build
```

### Quality Tools

We use **Biome** for linting:

```bash
npm run ci-check # Lint & Format check
```

## 📄 License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE file](https://github.com/Treast/vaultify/blob/main/LICENSE) for the full text.

Built with ❤️ for privacy.
