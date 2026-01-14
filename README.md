# Cursor ElevenLabs Voice Assistant

Bidirectional voice conversation loop for building code in Cursor IDE using ElevenLabs STT/TTS.

## Overview

This MCP server enables natural voice conversations with Cursor's AI assistant. Speak your coding requests, get voice responses, and iterate through code changes in real-time—all through voice.

## Features

- 🎤 **Voice Input** - Speak naturally to describe what you want to build
- 🤖 **AI Code Generation** - Cursor generates code based on your voice commands
- 🔊 **Voice Output** - Hear what the AI built/changed in natural voice
- 🔄 **Conversation Loop** - Iterate through changes via voice conversation
- ⚡ **Real-time** - Low-latency streaming for responsive conversations

## Architecture

```
Microphone → ElevenLabs STT → Cursor Chat → Code Generation → 
ElevenLabs TTS → Speaker → (loop back to microphone)
```

## Prerequisites

- Cursor IDE
- ElevenLabs API key
- Python 3.8+
- Node.js (for MCP server)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/masonearl/cursor-elevenlabs.git
cd cursor-elevenlabs
```

2. Install dependencies:
```bash
npm install
# or
pip install -r requirements.txt
```

3. Set up your ElevenLabs API key:
```bash
export ELEVENLABS_API_KEY="your-api-key-here"
```

4. Configure Cursor MCP settings (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "cursor-elevenlabs": {
      "command": "node",
      "args": ["index.js"],
      "env": {
        "ELEVENLABS_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

5. Restart Cursor IDE

## Usage

1. Start the voice conversation loop
2. Speak your coding request
3. Listen to the AI's response
4. Continue the conversation to iterate on code

## Development

This project uses:
- **ElevenLabs API** - For STT and TTS
- **Model Context Protocol (MCP)** - For Cursor integration
- **Web Audio API** - For audio capture/playback

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
