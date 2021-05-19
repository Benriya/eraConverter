import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ResponsiveService {
  private isMobile = new Subject();
  public screenWidth: string;

  constructor() {
    this.checkWidth();
  }

  onMobileChange(status: boolean) {
    this.isMobile.next(status);
  }

  getMobileStatus(): Observable<any> {
    return this.isMobile.asObservable();
  }

  public checkWidth() {
    let width = window.innerWidth;
    if (width <= 768) {
      this.screenWidth = 'sm';
      this.onMobileChange(true);
    } else {
      this.screenWidth = 'lg';
      this.onMobileChange(false);
    }
  }

}
