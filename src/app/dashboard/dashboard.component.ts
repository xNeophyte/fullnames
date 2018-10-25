import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  firstNames: any[];
  lastNames: any[];
  firstNameToSearch: string;
  lastNameToSearch: string;
  validFirstName: string;
  validLastName: string;
  init: boolean;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getFirstNames().subscribe( (firstNameSnapshots: any) => {
      this.firstNames = firstNameSnapshots.map(snapshot => snapshot.key);
    });

    this.dashboardService.getLastNames().subscribe( (lastNameSnapshots: any) => {
      this.lastNames = lastNameSnapshots.map(snapshot => snapshot.key);
    });

    this.init = false;
  }

  searchFirstName(): boolean {
    return this.firstNames.find(name => name === this.firstNameToSearch.toLowerCase());
  }

  searchLastName(): boolean {
    return this.lastNames.find(name => name === this.lastNameToSearch.toLowerCase());
  }

  searchFullName() {
    console.log(`${this.firstNameToSearch} ${this.lastNameToSearch}`);
    if (this.searchFirstName()) {
      this.validFirstName = this.firstNameToSearch;
      console.log('FIRST NAME VALID');
    } else {
      this.validFirstName = null;
      console.log('FIRST NAME NOT VALID');
    }

    if (this.searchLastName()) {
      this.validLastName = this.lastNameToSearch;
      console.log('LAST NAME VALID');
    } else {
      this.validLastName = null;
      console.log('LAST NAME NOT VALID');
    }
    this.init = true;

    this.dashboardService.addToSearchHistory(`${this.firstNameToSearch} ${this.lastNameToSearch}`);
  }

  addNewNames() {
    if (!this.searchFirstName()) {
      this.dashboardService.addFirstName(this.firstNameToSearch.toLocaleLowerCase());
      console.log(`ADDED FIRST NAME ${this.firstNameToSearch} TO DATABASE`);
    }
    if (!this.searchLastName()) {
      this.dashboardService.addLastName(this.lastNameToSearch.toLocaleLowerCase());
      console.log(`ADDED LAST NAME ${this.lastNameToSearch} TO DATABASE`);
    }
  }

  ngOnInit() {
  }

}
