#!/usr/bin/env node

/**
 * Cursor ElevenLabs Voice Assistant MCP Server
 * 
 * Enables bidirectional voice conversation with Cursor IDE
 * using ElevenLabs for STT and TTS.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ElevenLabsClient } from 'elevenlabs';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
if (!ELEVENLABS_API_KEY) {
  console.error('ELEVENLABS_API_KEY environment variable is required');
  process.exit(1);
}

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

class CursorElevenLabsServer {
  constructor() {
    this.server = new Server(
      {
        name: 'cursor-elevenlabs',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.transport = new StdioServerTransport();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'start_voice_conversation',
          description: 'Start a bidirectional voice conversation loop with Cursor. Captures voice input, sends to Cursor chat, and speaks responses back.',
          inputSchema: {
            type: 'object',
            properties: {
              voiceId: {
                type: 'string',
                description: 'ElevenLabs voice ID to use for TTS (optional, uses default if not provided)',
              },
              modelId: {
                type: 'string',
                description: 'ElevenLabs model ID (optional, uses default if not provided)',
              },
            },
          },
        },
        {
          name: 'transcribe_audio',
          description: 'Transcribe audio using ElevenLabs STT',
          inputSchema: {
            type: 'object',
            properties: {
              audioData: {
                type: 'string',
                description: 'Base64 encoded audio data',
              },
            },
            required: ['audioData'],
          },
        },
        {
          name: 'text_to_speech',
          description: 'Convert text to speech using ElevenLabs TTS',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text to convert to speech',
              },
              voiceId: {
                type: 'string',
                description: 'ElevenLabs voice ID (optional)',
              },
            },
            required: ['text'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'start_voice_conversation':
            return await this.startVoiceConversation(args);
          case 'transcribe_audio':
            return await this.transcribeAudio(args);
          case 'text_to_speech':
            return await this.textToSpeech(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async startVoiceConversation(args) {
    // TODO: Implement voice conversation loop
    // This will need to:
    // 1. Capture audio from microphone
    // 2. Transcribe using ElevenLabs STT
    // 3. Send to Cursor chat (via MCP or API)
    // 4. Get response from Cursor
    // 5. Convert response to speech using ElevenLabs TTS
    // 6. Play audio
    // 7. Loop back to step 1
    
    return {
      content: [
        {
          type: 'text',
          text: 'Voice conversation loop started. This feature is under development.',
        },
      ],
    };
  }

  async transcribeAudio(args) {
    const { audioData } = args;
    
    // TODO: Implement audio transcription using ElevenLabs STT API
    // Note: ElevenLabs may have transcription endpoints
    
    return {
      content: [
        {
          type: 'text',
          text: 'Audio transcription feature coming soon.',
        },
      ],
    };
  }

  async textToSpeech(args) {
    const { text, voiceId } = args;
    
    try {
      // Use ElevenLabs TTS API
      const audio = await client.textToSpeech.convert(voiceId || 'default', {
        text: text,
        model_id: 'eleven_monolingual_v1',
      });

      // Convert audio stream to base64 for return
      const chunks = [];
      for await (const chunk of audio) {
        chunks.push(chunk);
      }
      const audioBuffer = Buffer.concat(chunks);
      const base64Audio = audioBuffer.toString('base64');

      return {
        content: [
          {
            type: 'text',
            text: `Generated audio for: "${text.substring(0, 50)}..."`,
          },
          {
            type: 'text',
            text: `Audio data (base64): ${base64Audio.substring(0, 100)}...`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`TTS error: ${error.message}`);
    }
  }

  async run() {
    await this.server.connect(this.transport);
    console.error('Cursor ElevenLabs MCP server running on stdio');
  }
}

const server = new CursorElevenLabsServer();
server.run().catch(console.error);
