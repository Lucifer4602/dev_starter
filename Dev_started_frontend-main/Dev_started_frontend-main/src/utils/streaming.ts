export function parseSSEChunks(data: string) {
  // Split the data into individual chunks based on the delimiter
  const chunks = data.split("}{");

  // Iterate through the chunks and parse each one
  const parsedChunks = chunks.map((chunk, index) => {
    // Add back the missing curly braces for all chunks except the first and last
    const formattedChunk =
      (index === 0 ? "" : "{") +
      chunk +
      (index === chunks.length - 1 ? "" : "}");

    try {
      // Parse the formatted chunk
      return JSON.parse(formattedChunk);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null; // Handle parsing errors gracefully
    }
  });

  // Filter out any chunks that failed to parse
  const validChunks = parsedChunks.filter((chunk) => chunk !== null);

  // Return the array of valid parsed chunks
  return validChunks;
}
