import { Component } from '@angular/core';
import { EmailPredictionService } from '../services/email-prediction';
import { HistoryService } from '../services/HistoryService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailUploadResultDTO, EmailResult } from '../models/EmailUploadResultDTO';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.css']
})
export class Upload {
  selectedFile: File | null = null;
  results: EmailResult[] = [];
  validEmails: EmailResult[] = [];
  riskyEmails: EmailResult[] = [];
  bounceEmails: EmailResult[] = [];
  errorMessage: string | null = null;
  userId: string | null = null;

  constructor(
    private emailService: EmailPredictionService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      console.log('✅ User ID retrieved:', this.userId);
    } else {
      console.warn('⚠️ No user ID in localStorage');
    }
  }

  onFileSelected(event: any) {
    const file = event.target?.files?.[0] || event.dataTransfer?.files?.[0];
    if (file && this.isValidFile(file)) {
      this.selectedFile = file;
      this.resetState();
    } else {
      this.errorMessage = 'Please upload a valid .txt or .csv file (max 10MB)';
    }
  }

  isValidFile(file: File): boolean {
    const validTypes = ['text/csv', 'text/plain'];
    const validExtensions = ['.csv', '.txt'];
    const maxSize = 10 * 1024 * 1024;

    return (
      (validTypes.includes(file.type) ||
        validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) &&
      file.size <= maxSize
    );
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file first';
      return;
    }

    console.log('📤 Submitting file:', this.selectedFile.name);

    this.emailService.predictCsv(this.selectedFile).subscribe({
      next: (response) => {
        this.results = Array.isArray(response)
          ? response
          : response.result || [];

        this.categorizeEmails();

        this.sendToBackend();
      },
      error: (error) => {
        console.error('❌ API Error:', error);
        this.errorMessage = error.error?.error || 'Failed to process your file';
      }
    });
  }

  private categorizeEmails() {
    this.validEmails = this.results.filter(e => e.prediction === 'valid');
    this.riskyEmails = this.results.filter(e => e.prediction === 'risky');
    this.bounceEmails = this.results.filter(e => e.prediction === 'bounce');
  }

  private sendToBackend() {
    if (!this.userId || !this.selectedFile) return;

    const dto: EmailUploadResultDTO = {
      userId: parseInt(this.userId),
      filename: this.selectedFile.name,
      results: this.results
    };

    this.historyService.saveResult(dto).subscribe({
      next: () => {
        console.log('✅ History saved to backend');
      },
      error: (err) => {
        console.error('❌ Failed to save history:', err);
      }
    });
  }

  resetState() {
    this.results = [];
    this.validEmails = [];
    this.riskyEmails = [];
    this.bounceEmails = [];
    this.errorMessage = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.onFileSelected(event);
  }

  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  downloadCategory(category: 'valid' | 'risky' | 'bounce') {
    const data = category === 'valid' ? this.validEmails :
      category === 'risky' ? this.riskyEmails :
        this.bounceEmails;

    if (data.length === 0) {
      this.errorMessage = `No ${category} emails to download`;
      return;
    }

    const filename = `${category}_emails.csv`;
    const csv = this.convertToCsv(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCsv(data: any[]): string {
    const header = ['Email', 'Status'];
    const rows = data.map(item => [item.email, item.prediction]);
    return [header, ...rows].map(row => row.join(',')).join('\n');
  }
}
