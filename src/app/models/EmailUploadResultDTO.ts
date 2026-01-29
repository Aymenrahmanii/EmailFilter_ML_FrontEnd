export interface EmailUploadResultDTO {
  filename: string;
  userId: number;
  results: EmailResult[];
}
export interface EmailResult {
  email: string;
  prediction: string; // "valid", "risky", "bounce"
}
