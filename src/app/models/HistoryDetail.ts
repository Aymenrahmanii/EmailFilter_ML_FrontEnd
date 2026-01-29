import {EmailRecord} from './EmailRecord';

export interface HistoryDetail {
  id: number;
  filename: string;
  validCount: number;
  riskyCount: number;
  bounceCount: number;
  processedAt: string;
  emails: EmailRecord[];
}
