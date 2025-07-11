import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailPredictionService {
  private apiUrl = 'http://localhost:5000/predict_csv'; // Update if your backend is different

  constructor(private http: HttpClient) { }

  predictCsv(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>('http://localhost:5000/predict_csv', formData); // ✅ must return
  }


}
