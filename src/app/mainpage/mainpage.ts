import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css'
})
export class Mainpage {

}
