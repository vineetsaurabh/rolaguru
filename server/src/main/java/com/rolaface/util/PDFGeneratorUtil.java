package com.rolaface.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.rolaface.entities.FlexError;

public final class PDFGeneratorUtil {

	private PDFGeneratorUtil() {
		throw new AssertionError();
	}

	public static byte[] generateListOfErrors(List<FlexError> flexErrors) {
		byte[] ret = null;
		try (PDDocument document = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
			PDPage page = new PDPage();
			document.addPage(page);
			PDPageContentStream contentStream = new PDPageContentStream(document, page);
			drawTitle(page, contentStream);
			drawTable(page, contentStream, flexErrors);
			contentStream.close();
			document.save(out);
			ret = out.toByteArray();
		} catch (IOException e) {
			// TODO Exception Handling
		}
		return ret;
	}

	private static void drawTitle(PDPage page, PDPageContentStream contentStream) throws IOException {
		String title = "List of Errors";
		PDType1Font font = PDType1Font.TIMES_BOLD;
		int fontSize = 20;
		float titleWidth = font.getStringWidth(title) / 1000 * fontSize;
		float titleX = (page.getMediaBox().getWidth() - 2.0f - titleWidth) / 2;

		contentStream.beginText();
		contentStream.setFont(font, fontSize);
		contentStream.newLineAtOffset(titleX, 700);
		contentStream.showText(title);
		contentStream.endText();
	}

	private static void drawTable(PDPage page, PDPageContentStream contentStream, List<FlexError> flexErrors)
			throws IOException {
		final int rows = flexErrors.size() + 1;
		final int cols = 5;

		float y = 680.0f;
		float margin = 50.0f;
		final float rowHeight = 20.0f;
		final float tableWidth = page.getMediaBox().getWidth() - 2.0f * margin;
		final float tableHeight = rowHeight * rows;
		float[] colWidths = { 30.0f, 90.0f, tableWidth - 160.0f, 20.0f, 20.0f, 0.0f };

		// draw the rows
		float nexty = y;
		for (int i = 0; i <= rows; i++) {
			contentStream.moveTo(margin, nexty);
			contentStream.lineTo(margin + tableWidth, nexty);
			contentStream.stroke();
			nexty -= rowHeight;
		}

		// draw the columns
		float nextx = margin;
		for (int i = 0; i <= cols; i++) {
			contentStream.moveTo(nextx, y);
			contentStream.lineTo(nextx, y - tableHeight);
			contentStream.stroke();
			nextx += colWidths[i];
		}

		// now add the text
		final float cellMargin = 5.0f;
		float textx = margin + cellMargin;
		float texty = y - 15.0f;

		// add header
		contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12.0f);
		String[] headerValues = { "", "ERR_CODE", "MESSAGE", "T", "B" };
		for (int j = 0; j < 5; j++) {
			contentStream.beginText();
			contentStream.newLineAtOffset(textx, texty);
			contentStream.showText(headerValues[j]);
			contentStream.endText();
			textx += colWidths[j];
		}
		texty -= rowHeight;
		textx = margin + cellMargin;

		// add rows
		PDType1Font font = PDType1Font.HELVETICA;
		int fontSize = 12;
		contentStream.setFont(font, fontSize);
		int count = 1;
		for (final FlexError flexError : flexErrors) {
			String[] flexErrorValues = new String[cols];
			flexErrorValues[0] = String.valueOf(count++);
			flexErrorValues[1] = flexError.getErrcode();
			flexErrorValues[2] = flexError.getMessage();
			flexErrorValues[3] = flexError.getErrortype();
			flexErrorValues[4] = flexError.getBatchtype();

			int colCount = 0;
			for (String flexErrorValue : flexErrorValues) {
				contentStream.beginText();
				contentStream.newLineAtOffset(textx, texty);
				contentStream.showText(flexErrorValue);
				contentStream.endText();
				textx += colWidths[colCount];
				colCount++;
			}
			texty -= rowHeight;
			textx = margin + cellMargin;
		}
	}

}
