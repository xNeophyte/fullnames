import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searches: any[];

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
   }


  ngOnInit() {
  }

}
