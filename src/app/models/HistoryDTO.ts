export interface HistoryDTO {
  id: number;
  filename: string;
  processedAt: string; // LocalDateTime will come as string in JSON
  validCount: number;
  riskyCount: number;
  bounceCount: number;
}
