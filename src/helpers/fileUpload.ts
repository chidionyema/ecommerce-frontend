// src/helpers/fileUpload.ts

import axios, { AxiosProgressEvent } from 'axios';

/**
 * Single-request approach for moderate-size files.
 * 
 * @param productId The entity id (e.g. productId)
 * @param formData A FormData containing all files in the "content" field
 * @param onProgress Callback for overall progress
 */
export async function uploadSingleRequest(
  productId: string,
  formData: FormData,
  onProgress?: (pct: number) => void
) {
  await axios.post(
    // Adjust query params as needed (if you have entityType or name)
    `https://api.local.ritualworks.com/api/content/upload?entityId=${productId}`,
    formData,
    {
      onUploadProgress: (evt: AxiosProgressEvent) => {
        if (evt.total && onProgress) {
          const pct = Math.round((evt.loaded * 100) / evt.total);
          onProgress(pct);
        }
      },
    }
  );
}

/**
 * Chunked approach for large files
 * 
 * 1) chunked-init  -> GET sessionId from server
 * 2) chunked-upload (per chunk)
 * 3) chunked-complete
 * 
 * @param productId The entity id (e.g. productId)
 * @param file The large File object from the user
 * @param chunkSize The size of each chunk in bytes (e.g. 5MB)
 * @param onChunkProgress Callback for overall progress in percentage
 */
export async function uploadChunked(
  productId: string,
  file: File,
  chunkSize: number,
  onChunkProgress?: (pct: number) => void
) {
  // A) chunked-init
  const totalSize = file.size;
  const totalChunks = Math.ceil(totalSize / chunkSize);

  // Here we pass fileName, totalSize, totalChunks in query string
  // The server returns { sessionId, message }
  const initResp = await axios.post<{
    sessionId: string;
    message: string;
  }>(
    `https://api.local.ritualworks.com/api/content/chunked-init?entityId=${productId}&entityType=Product&fileName=${file.name}&totalSize=${totalSize}&totalChunks=${totalChunks}`
  );

  const sessionId = initResp.data.sessionId;

  // B) chunked-upload
  let offset = 0;
  let chunkIndex = 0;
  while (offset < totalSize) {
    const end = Math.min(offset + chunkSize, totalSize);
    const blob = file.slice(offset, end);

    const formData = new FormData();
    // The backend expects the chunk in a field named "chunkFile"
    // You can rename if needed
    formData.append('chunkFile', blob);

    // For progress, we accumulate how many bytes have been uploaded
    // So we do: uploadedSoFar = offset + event.loaded
    await axios.post(
      `https://api.local.ritualworks.com/api/content/chunked-upload?sessionId=${sessionId}&chunkIndex=${chunkIndex}`,
      formData,
      {
        onUploadProgress: (evt: AxiosProgressEvent) => {
          if (evt.total && onChunkProgress) {
            const uploadedSoFar = offset + evt.loaded;
            const pct = Math.round((uploadedSoFar * 100) / totalSize);
            onChunkProgress(pct);
          }
        },
      }
    );

    offset = end;
    chunkIndex++;
  }

  // C) chunked-complete
  // Optionally specify contentType=Image or contentType=Asset if needed
  // e.g. `chunked-complete?sessionId=xxx&contentType=Asset`
  await axios.post(
    `https://api.local.ritualworks.com/api/content/chunked-complete?sessionId=${sessionId}&contentType=Asset`
  );
}
