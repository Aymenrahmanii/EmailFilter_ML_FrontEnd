import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/HistoryService';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

export interface HistoryDTO {
  id: number;
  filename: string;
  processedAt: string; // date string from backend
  validCount: number;
  riskyCount: number;
  bounceCount: number;
  status?: 'completed' | 'pending' | 'failed'; // optional, you can add if your backend returns it
  fileSize?: string; // optional if you want to show file size
  error?: string; // optional error message if any
}

@Component({
  selector: 'app-historypage',
  templateUrl: './historypage.html',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./historypage.css']
})
export class Historypage implements OnInit {
  historyList: HistoryDTO[] = [];

  // Pagination & filter states
  filteredHistory: HistoryDTO[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  statusFilter = 'all';

  constructor(private historyService: HistoryService ,  private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.historyService.getUserHistory(+userId).subscribe({
        next: data => {
          this.historyList = data;
          this.applyFilters();
        },
        error: err => {
          console.error('Failed to load history', err);
        }
      });
    }
  }
  goToUpload() {
    this.router.navigate(['/upload']);
  }

  applyFilters() {
    this.filteredHistory = this.historyList.filter(item => {
      const matchesSearch = item.filename.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' || item.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
    this.currentPage = 1;
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  changeItemsPerPage(event: any) {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onStatusChange(event: any) {
    this.statusFilter = event.target.value;
    this.applyFilters();
  }

  // For pagination display
  get paginatedHistory(): HistoryDTO[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHistory.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Format date string nicely
  formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  protected readonly Math = Math;
}
