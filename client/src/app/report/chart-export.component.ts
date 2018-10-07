import * as jsPDF from 'jspdf';

export class ChartExportComponent {

    title: string = "chart";

    constructor() { }

    saveAsPdf() {
        const canvas = document.querySelector('canvas');

        const doc = new jsPDF("l", "px", "a4");
        doc.setFontSize(20);
        this.centeredText(doc, this.title, 20);
        this.centeredImage(doc, canvas, 30);

        const name = this.title.split(' ').join('_') + "_" + Date.now();
        doc.save(name + '.pdf');
    }

    centeredText(doc, text, y) {
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textOffset = (doc.internal.pageSize.getWidth() - textWidth) / 2;
        doc.text(textOffset, y, text);
    }

    centeredImage(doc, canvas, y) {
        const canvasImg = canvas.toDataURL("image/png", 1.0);
        
        if(canvas.clientWidth == 400) {
            doc.addImage(canvasImg, 'PNG', 217, y);
        } else {
            doc.addImage(canvasImg, 'PNG', 110, y);
        }
    }

}

