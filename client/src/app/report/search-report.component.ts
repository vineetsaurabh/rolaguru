import { ReportService } from './report.service';
import { ErrorSearchHistory } from './error-search-history.model';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart } from 'chart.js';
import { RolaguruUtils } from '../util/rolaguru.util';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    templateUrl: './search-report.component.html'
})
export class SearchReportComponent implements AfterViewInit {

    rolaguruUtils: RolaguruUtils = RolaguruUtils.getInstance();

    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    lastMonths: string[];
    searchPerMonth: number[];
    noOfMonths: number[] = [12, 9, 6, 3];
    selectedNoOfMonth: number = 6;

    canvas: any;
    ctx: any;

    constructor(
        protected reportService: ReportService) {
    }

    ngAfterViewInit() {
        this.getSearchHistory();
    }

    getSearchHistory() {
        this.lastMonths = this.rolaguruUtils.getLastMonths(this.selectedNoOfMonth);
        this.searchPerMonth = Array.from({ length: this.selectedNoOfMonth }, () => 0);
        this.reportService.getSearchHistory()
            .subscribe(data => {
                data.map(o => {
                    const d: Date = new Date(o.searchTimestamp);
                    const dateLabel = this.monthNames[d.getMonth()] + " " + d.getFullYear().toString().substring(2);
                    const index = this.lastMonths.indexOf(dateLabel);
                    if (index > -1) {
                        this.searchPerMonth[index] = this.searchPerMonth[index] + 1;
                    }
                });
                document.getElementById('searchReportChart').innerHTML = "";
                this.canvas = document.getElementById('searchReportChart');
                this.canvas.width  = 800;
                this.canvas.height = 500;
                this.ctx = this.canvas.getContext('2d');
                let myChart = new Chart(this.ctx, {
                    type: 'line',
                    data: {
                        labels: this.lastMonths,
                        datasets: [{
                            label: 'No of Search Per Month',
                            data: this.searchPerMonth,
                            borderWidth: 3,
                            borderColor: "rgba(0,100,0,0.4)",
                            backgroundColor: "rgba(153,255,51,0.4)"
                        }]
                    },
                    options: {
                        responsive: false,
                        display: true,
                    }
                });
            });
    }

    onNoOfMonthChange(event: MatRadioChange) {
        this.selectedNoOfMonth = event.value;
        this.getSearchHistory();
      }

}