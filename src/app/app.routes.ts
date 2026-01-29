import { Routes } from '@angular/router';
import { signin } from './signin/signin';
import { Mainpage } from './mainpage/mainpage';
import { Register } from './register/register';
import { Userint } from './userint/userint';
import { Upload } from './upload/upload';
import {Historypage} from './historypage/historypage';
import { ViewEmail } from './viewemail/viewemail';

export const routes: Routes = [
  { path: '', component: Mainpage },
  { path: 'signin', component: signin },
  { path: 'register', component: Register },
  { path: 'userint', component: Userint },
  { path: 'upload', component: Upload },
  { path : 'history',component: Historypage },
  { path :'viewemail/:id', component: ViewEmail },
  { path: '', redirectTo: 'history', pathMatch: 'full' },


];
