import { Chart } from 'chart.js';
import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ErrorDomain } from '../error/error-domain.model';
import { ErrorService } from '../error/error.service';
import { map } from 'rxjs/operator/map';
import 'chart.piecelabel.js';
import { RolaguruUtils } from '../util/rolaguru.util';

@Component({
    selector: 'dashboard',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent implements AfterViewInit {

    errorDomains: ErrorDomain[] = [
        { name: 'Flexcube', id: 'fx', color: 'lightsteelblue' },
        { name: 'Database', id: 'db', color: 'lavender' },
        { name: 'Acumen', id: 'am', color: 'lightsteelblue' },
        { name: 'Mobile App', id: 'ma', color: 'lavender' },
        { name: 'ERP', id: 'er', color: 'lightsteelblue' },
        { name: 'FCDB', id: 'fc', color: 'lavender' },
    ];

    constructor(private router: Router,
        private errorService: ErrorService) { }

    ngAfterViewInit() {
        this.errorDomains.forEach(domain => {
            this.getErrorsCountDomainWise(domain);
        });
    }

    navigate(domain) {
        let params: NavigationExtras = {
            queryParams: {
                domainId: domain.id,
                domainName: domain.name
            }
        }
        this.router.navigate(['listErrors'], params);
    }

    getErrorsCountDomainWise(errorDomain: ErrorDomain) {

        this.errorService.getAllErrorsOfDomian(errorDomain.id)
            .subscribe(data => {

                const chartData = {};
                data.map(e => {
                    if (e.module in chartData) {
                        chartData[e.module] = chartData[e.module] + 1;
                    } else {
                        chartData[e.module] = 1;
                    }
                });

                const canvasDiv = document.getElementById(`error-count-${errorDomain.id}`);
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
