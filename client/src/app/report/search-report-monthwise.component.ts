import { ReportService } from './report.service';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart } from 'chart.js';
import { RolaguruUtils } from '../util/rolaguru.util';
import { MatRadioChange } from '@angular/material/radio';
import { ChartExportComponent } from './chart-export.component';

@Component({
    templateUrl: './search-report-monthwise.component.html'
})
export class SearchReportMonthwiseComponent extends ChartExportComponent implements AfterViewInit {

    rolaguruUtils: RolaguruUtils = RolaguruUtils.getInstance();

    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    lastMonths: string[];
    searchPerMonth: number[];
    noOfMonths: number[] = [12, 9, 6, 3];
    selectedNoOfMonth: number = 6;
    title: string = "Search Report Chart";

    constructor(
        protected reportService: ReportService) {
            super();
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

                const canvasDiv = document.getElementById('searchReportMonthwise');
                canvasDiv.innerHTML = "";
                const canvas: any = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 500;
                canvasDiv.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                let myChart = new Chart(ctx, {
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