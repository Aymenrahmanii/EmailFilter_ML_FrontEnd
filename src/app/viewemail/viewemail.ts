import {Component, OnInit, TrackByFunction} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HistoryDetail} from '../models/HistoryDetail';
import {NgForOf} from '@angular/common';
import {EmailRecord} from '../models/EmailRecord';

@Component({
  selector: 'app-view-email',
  imports: [

  ],
  templateUrl: './viewemail.html'
})
export class ViewEmail implements OnInit {
  emailId!: number;
  emailData: HistoryDetail | null = null;
  trackById: TrackByFunction<EmailRecord> | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.emailId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmailData();
  }

  loadEmailData() {
    this.http.get<HistoryDetail>(`http://localhost:8081/api/history/${this.emailId}`).subscribe({
      next: (data) => {
        if (data.emails && data.emails.length > 0) {
          this.emailData = data; // ✅ only set when full detail comes
        }
        console.log('Email data received:', data);
      },
      error: (err) => {
        console.error('Error fetching email data', err);
      }
    });
  }
}
