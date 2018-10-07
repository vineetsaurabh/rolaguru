import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Chart } from 'chart.js';
import 'chart.piecelabel.js';

import { ErrorService } from '../error/error.service';
import { Domain } from '../domain/domain.model';
import { DomainService } from '../domain/domain.service';
import { Error } from '../error/error.model';

@Component({
    selector: 'dashboard',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent {

    domains: Domain[];
    latestCreatedErrors: Error[];
    latestModifiedErrors: Error[];

    constructor(private router: Router,
        private domainService: DomainService,
        private errorService: ErrorService) { }

    ngOnInit() {
        this.domainService.getDomains()
            .subscribe(data => {
                this.domains = data;
                this.domains.forEach(domain => {
                    this.getErrorsCountDomainWise(domain);
                });
            });
        this.errorService.getLatestCreatedErrors()
            .subscribe(data => {
                this.latestCreatedErrors = data;
            });
        this.errorService.getLatestModifiedErrors()
            .subscribe(data => {
                this.latestModifiedErrors = data;
            });
    }

    navigate(domain) {
        let params: NavigationExtras = {
            queryParams: {
                domainId: domain.domainId,
                domainName: domain.domainName
            }
        }
        this.router.navigate(['listErrors'], params);
    }

    getErrorsCountDomainWise(domain: Domain) {

        this.errorService.getAllErrorsOfDomian(domain.domainId)
            .subscribe(data => {

                const chartData = {};
                data.map(e => {
                    if (e.module.moduleName in chartData) {
                        chartData[e.module.moduleName] = chartData[e.module.moduleName] + 1;
                    } else {
                        chartData[e.module.moduleName] = 1;
                    }
                });

                const canvasDiv = document.getElementById(`error-count-${domain.domainId}`);
                canvasDiv.innerHTML = "";
                const canvas: any = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 200;
                canvasDiv.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                let myChart = new Chart(ctx, {
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
                        legend: {
                            display: false
                        },
                        pieceLabel: {
                            render: 'label',
                            fontSize: 12,
                            fontStyle: 'bold',
                            fontColor: '#000000'
                        }
                    }
                });
            });
    }
}
