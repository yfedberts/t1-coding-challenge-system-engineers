import { ReadableStream } from 'stream/web';
import { config } from '../../config';
import { processStreamMessage } from '../domain/stream-message-processor';

export const startStreamProcessor = async (): Promise<void> => {
  try {
    const response = await fetch(config.streamEndpoint as string);

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    let partialMessage = ''; 

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            if (value) {
              controller.enqueue(value);
            }
            push();
          }).catch(error => {
            controller.error(error);
          });
        }
        push();
      }
    });

    const decoder = new TextDecoder();
    const streamReader = stream.getReader();

    async function processStream() {
      const { done, value } = await streamReader.read();
      if (done) {
        console.log('Stream processing complete');
        return;
      }

      const decodedValue = decoder.decode(value, { stream: true });
      partialMessage += decodedValue; 

      const messages = partialMessage.split('\n').filter(Boolean);

      for (let i = 0; i < messages.length; i++) {
        try {
          let message = messages[i]?.trim();
        
          if (!message) {
            continue;
          }

          if (message.startsWith('data:')) {
            message = message.replace('data:', '')
          }

          // Check if the message is complete (ends with a closing brace)
          if (message.endsWith('}')) {
            processStreamMessage(message.trim()); // Process the complete JSON message
          } else {
            // If the message isn't complete, leave it in the buffer
            partialMessage = message;
            break;
          }
        } catch (error) {
          console.error('Failed to process message:', error instanceof Error ? error.message : error);
        }
      }

      await processStream(); // Continue processing
    }

    await processStream();

  } catch (error) {
    console.error('Error streaming data:', error);
  }
};
