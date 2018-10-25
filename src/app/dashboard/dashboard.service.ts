import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  searchFirstNamesRef: any;
  searchLastNamesRef: any;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.searchFirstNamesRef = this.db.list(`firstNames`);
    this.searchLastNamesRef = this.db.list(`lastNames`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getFirstNames() {
    return this.searchFirstNamesRef.snapshotChanges();
  }

  getLastNames() {
    return this.searchLastNamesRef.snapshotChanges();
  }
}
