export interface EmailRecord {
  id: number;
  email: string;
  prediction: 'valid' | 'risky' | 'bounce';
}
