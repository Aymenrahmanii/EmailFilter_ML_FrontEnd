import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailUploadResultDTO } from '../models/EmailUploadResultDTO';
import { Observable } from 'rxjs';

import { HistoryDTO } from '../models/HistoryDTO';
import {HistoryDetail} from '../models/HistoryDetail';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:8081/api/history';

  constructor(private http: HttpClient) {}

  saveResult(data: EmailUploadResultDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-result`, data);
  }
  getUserHistory(userId: number): Observable<HistoryDTO[]> {
    return this.http.get<HistoryDTO[]>(`${this.apiUrl}/user/${userId}`);
  }

  getHistoryDetail(historyId: number | string): Observable<HistoryDetail> {
    return this.http.get<HistoryDetail>(`${this.apiUrl}/${historyId}`);
  }
  deleteHistoryItem(historyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${historyId}`);
  }


}
