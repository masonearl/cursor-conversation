# Setup Instructions for Cursor ElevenLabs MCP

## Prerequisites

1. **ElevenLabs API Key**
   - Sign up at https://elevenlabs.io
   - Get your API key from the dashboard
   - You'll need to add this to the MCP config

2. **Node.js** (already installed if you're using Cursor)

## Installation Steps

### 1. Install Dependencies

The dependencies are already installed, but if you need to reinstall:

```bash
cd ~/Desktop/cursor-elevenlabs
npm install
```

### 2. Add Your ElevenLabs API Key

Edit `~/.cursor/mcp.json` and add your API key:

```json
"cursor-elevenlabs": {
  "command": "node",
  "args": [
    "/Users/masdawg/Desktop/cursor-elevenlabs/index.js"
  ],
  "env": {
    "ELEVENLABS_API_KEY": "YOUR_API_KEY_HERE"
  }
}
```

Replace `YOUR_API_KEY_HERE` with your actual ElevenLabs API key.

### 3. Restart Cursor

After updating the MCP config:
1. Completely quit Cursor (Cmd+Q on Mac)
2. Reopen Cursor
3. The MCP server should now be available

### 4. Test the MCP

In Cursor chat, try:
- "Use the text_to_speech tool to say hello"
- "Convert this text to speech: [your text]"

## Current Status

✅ **Working:**
- MCP server structure
- Text-to-Speech (TTS) - basic implementation
- MCP configuration set up

🚧 **In Progress:**
- Speech-to-Text (STT) - needs ElevenLabs transcription API integration
- Voice conversation loop - needs audio capture/playback
- Cursor chat integration - needs to connect voice input to Cursor's chat

## Next Steps

1. **Get ElevenLabs API Key** - Required for TTS to work
2. **Test TTS** - Try the text_to_speech tool in Cursor
3. **Implement STT** - Add audio transcription capability
4. **Build conversation loop** - Connect everything together

## Troubleshooting

- **MCP not showing up**: Make sure you restarted Cursor completely
- **API errors**: Verify your ElevenLabs API key is correct
- **Module errors**: Run `npm install` again in the project directory
