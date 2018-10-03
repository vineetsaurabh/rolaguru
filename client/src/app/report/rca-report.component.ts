import { Chart } from 'chart.js';
import { Component, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ReportService } from "./report.service";
import { ErrorService } from "../error/error.service";
import { ChartExportComponent } from './chart-export.component';
import { Domain } from '../domain/domain.model';
import { DomainService } from "../domain/domain.service";

@Component({
    templateUrl: './rca-report.component.html'
})
export class RcaReportComponent extends ChartExportComponent implements AfterViewInit {

    title: string = "RCA Report";
    domains: Domain[] = [];

    constructor(
        private reportService: ReportService,
        private errorService: ErrorService,
        private domainService: DomainService,
        private cdRef: ChangeDetectorRef) {
            super();
    }

    ngOnInit() {
        this.domainService.getDomains()
            .subscribe( data => {
                this.domains = data;
            });
    }

    ngAfterViewInit() {
        this.getErrorsForRCA();
    }

    getErrorsForRCA() {
        const chartDrilldownBack = document.getElementById('chart-drilldown-back');
        chartDrilldownBack.style.display = "none";

        this.errorService.getAllErrors()
            .subscribe(data => {
                const chartData = {};
                data.map(e => {
                    if (e.domain.domainName in chartData) {
                        chartData[e.domain.domainName] = chartData[e.domain.domainName] + 1;
                    } else {
                        chartData[e.domain.domainName] = 1;
                    }
                });

                const canvasDiv = document.getElementById(`error-count`);
                canvasDiv.innerHTML = "";
                const canvas: any = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                canvasDiv.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                const self = this;
                let rcaChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(chartData),
                        datasets: [{
                            data: Object.values(chartData),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ]
                        }]
                    },
                    options: {
                        responsive: false,
                        display: true,
                        pieceLabel: {
                            render: 'value',
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontColor: '#000000'
                        },
                        title: {
                            display: true,
                            text: 'Error Per Domain',
                            fontSize: 20,
                            fontColor: '#1e90ff'
                        },
                        onClick: function (event) {
                            const activePoints = rcaChart.getElementsAtEvent(event);
                            if (activePoints[0]) {
                                const selectedData = activePoints[0]['_chart'].config.data;
                                const idx = activePoints[0]['_index'];
                                const label = selectedData.labels[idx];
                                const domain = self.domains.filter(domain => domain.domainName == label)[0];
                                const domainName = domain.domainName;
                                const drilledChartData = {};
                                data.map(e => {
                                    if (e.domain.domainName == label) {
                                        if (e.module.moduleName in drilledChartData) {
                                            drilledChartData[e.module.moduleName] = drilledChartData[e.module.moduleName] + 1;
                                        } else {
                                            drilledChartData[e.module.moduleName] = 1;
                                        }
                                    }
                                });

                                const chartDrilldownBack = document.getElementById('chart-drilldown-back');
                                chartDrilldownBack.style.display = "block";

                                const canvasDiv = document.getElementById(`error-count`);
                                canvasDiv.innerHTML = "";
                                const canvas: any = document.createElement('canvas');
                                canvas.width = 400;
                                canvas.height = 400;
                                canvasDiv.appendChild(canvas);
                                const ctx = canvas.getContext('2d');

                                let drilledChart = new Chart(ctx, {
                                    type: 'pie',
                                    data: {
                                        labels: Object.keys(drilledChartData),
                                        datasets: [{
                                            data: Object.values(drilledChartData),
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)'
                                            ]
                                        }]
                                    },
                                    options: {
                                        responsive: false,
                                        display: true,
                                        pieceLabel: {
                                            render: 'value',
                                            fontSize: 12,
                                            fontStyle: 'bold',
                                            fontColor: '#000000'
                                        },
                                        title: {
                                            display: true,
                                            text: domainName + ' Errors Per Module',
                                            fontSize: 18,
                                            fontColor: '#1e90ff'
                                        },
                                    }
                                });
                            }
                        }
                    }
                });
            });
    }

    reload() {
        this.getErrorsForRCA();
    }

}