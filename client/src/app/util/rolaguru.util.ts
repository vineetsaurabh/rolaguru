import { ErrorDomain } from "../error/error-domain.model";


export class RolaguruUtils {

    protected static rolaguruUtils: RolaguruUtils;

    monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    errorDomains: ErrorDomain[] = [
        { name: 'Flexcube', id: 'fx', color: 'lightsteelblue' },
        { name: 'Database', id: 'db', color: 'lavender' },
        { name: 'Acumen', id: 'am', color: 'lightsteelblue' },
        { name: 'Mobile App', id: 'ma', color: 'lavender' },
        { name: 'ERP', id: 'er', color: 'lightsteelblue' },
        { name: 'FCDB', id: 'fc', color: 'lavender' },
    ];

    static getInstance(): RolaguruUtils {
        if (!this.rolaguruUtils) {
            this.rolaguruUtils = new RolaguruUtils();
        }
        return this.rolaguruUtils;
    }

    formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['B', 'KB', 'MB', 'GB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    getLastMonths(noOfMonths: number) {
        const today = new Date();
        let d;
        let months : string[] = [];
        for (var i = noOfMonths; i > 0; i--) {
            d = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
            months.push(this.monthNames[d.getMonth()] + " " + d.getFullYear().toString().substring(2));
        }
        return months;
    }

}