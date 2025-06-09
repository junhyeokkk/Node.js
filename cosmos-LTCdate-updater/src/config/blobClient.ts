// Azure Blob Storage 연결 설정
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
const endpoint = process.env.AZURITE_BLOB_ENDPOINT!;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

if (!account || !accountKey || !endpoint || !containerName) {
  throw new Error("환경 변수가 제대로 로드되지 않았습니다.");
}

console.log("account =", account); // "devstoreaccount1" 나와야 함
console.log('endpoint 확인 ' , endpoint);
console.log('container 확인 ' , containerName);

console.log("AZURE 연결 정보 로드됨");

const credential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(endpoint, credential);
export const containerClient = blobServiceClient.getContainerClient(containerName);