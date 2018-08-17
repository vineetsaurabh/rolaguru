import { ReportService } from './report.service';
import { ErrorSearchHistory } from './error-search-history.model';
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Chart } from 'chart.js';
import { RolaguruUtils } from '../util/rolaguru.util';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    templateUrl: './search-report-inputwise.component.html'
})
export class SearchReportInputwiseComponent implements AfterViewInit {

    noOfSearchStrings: number[] = [25, 15, 10, 5];
    selectedNoOfSearchString: number = 10;

    constructor(
        private reportService: ReportService) {
    }

    ngAfterViewInit() {
        this.getMostSearchedString();
    }

    getMostSearchedString() {
        this.reportService.getMostSearchedString()
            .subscribe(data => {
                const canvasDiv = document.getElementById('searchReportInputwise');
                canvasDiv.innerHTML = "";
                const canvas: any = document.createElement('canvas');
                canvas.width = 800;
                canvas.height = 400;
                canvasDiv.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(data).slice(0, this.selectedNoOfSearchString),
                        datasets: [{
                            label: 'No of Search',
                            data: Object.values(data).slice(0, this.selectedNoOfSearchString),
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

    onNoOfSearchStringChange(event: MatRadioChange) {
        this.selectedNoOfSearchString = event.value;
        this.getMostSearchedString();
    }

}