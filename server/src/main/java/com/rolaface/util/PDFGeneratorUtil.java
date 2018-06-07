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

	private static PDPage PAGE = new PDPage();
	private static final float PAGE_WIDTH = PAGE.getMediaBox().getWidth(); // 612.0
	private static final float PAGE_HEIGHT = PAGE.getMediaBox().getHeight(); // 792.0

	private static final int PAGE_MARGIN_X = 50;
	private static final int PAGE_MARGIN_Y = 20;
	private static final float TABLE_WIDTH = PAGE_WIDTH - 2 * PAGE_MARGIN_X; // 512.0
	private static final float TABLE_HEIGHT = PAGE_HEIGHT - 2 * PAGE_MARGIN_Y;

	private static final String TITLE = "List of Errors";
	private static final PDType1Font TITLE_FONT = PDType1Font.TIMES_BOLD;
	private static final int TITLE_FONT_SIZE = 20;
	private static final int TITLE_MARGIN = 20;

	private static final float NEW_PAGE_TABLE_POSITION_Y = PAGE_HEIGHT - PAGE_MARGIN_Y - 2 * TITLE_MARGIN;
	private static final float NEW_PAGE_TABLE_TEXT_POSITION_Y = NEW_PAGE_TABLE_POSITION_Y - 15;

	private static final int NO_OF_COLUMNS = 5;
	private static final int ROW_HEIGHT = 20;
	private static final int CELL_MARGIN = 5;
	private static final float[] COL_WIDTH = { 30.0f, 90.0f, TABLE_WIDTH - 160.0f, 20.0f, 20.0f, 0.0f };

	private static final String[] HEADERS = { "", "ERR_CODE", "MESSAGE", "T", "B" };
	private static final PDType1Font HEADER_FONT = PDType1Font.HELVETICA_BOLD;
	private static final int HEADER_FONT_SIZE = 12;

	private static final PDType1Font CELL_FONT = PDType1Font.HELVETICA;
	private static final int CELL_FONT_SIZE = 12;

	private static float CURRENT_TEXT_POSITION_X = PAGE_MARGIN_X + CELL_MARGIN;
	private static float CURRENT_TEXT_POSITION_Y = NEW_PAGE_TABLE_TEXT_POSITION_Y;
	private static float END_ROW_POSITION_Y = 0.0f;

	private PDFGeneratorUtil() {
		throw new AssertionError();
	}

	public static byte[] generateListOfErrors(List<FlexError> flexErrors) {
		byte[] ret = null;
		try (PDDocument document = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
			document.addPage(PAGE);
			PDPageContentStream contentStream = new PDPageContentStream(document, PAGE);
			drawTitle(contentStream);
			drawTable(contentStream, flexErrors);
			contentStream.close();
			document.save(out);
			ret = out.toByteArray();
		} catch (IOException e) {
			// TODO Exception Handling
		}
		return ret;
	}

	private static void drawTitle(PDPageContentStream contentStream) throws IOException {
		float titleWidth = TITLE_FONT.getStringWidth(TITLE) / 1000 * TITLE_FONT_SIZE; // 117.76
		float titleX = (PAGE_WIDTH - titleWidth) / 2; // 247.12

		contentStream.beginText();
		contentStream.setFont(TITLE_FONT, TITLE_FONT_SIZE);
		contentStream.newLineAtOffset(titleX, PAGE_HEIGHT - PAGE_MARGIN_Y - TITLE_MARGIN);
		contentStream.showText(TITLE);
		contentStream.endText();
	}

	private static void drawTable(PDPageContentStream contentStream, List<FlexError> flexErrors) throws IOException {
		drawRows(contentStream, flexErrors);
		drawColumns(contentStream);

		addTextInHeader(contentStream, flexErrors);
		addTextInCell(contentStream, flexErrors);
	}

	private static void drawRows(PDPageContentStream contentStream, List<FlexError> flexErrors) throws IOException {
		int rows = flexErrors.size() + 1;
		float nextY = NEW_PAGE_TABLE_POSITION_Y;
		for (int i = 0; i <= rows; i++) {
			if (nextY <= PAGE_MARGIN_Y) {
				break;
			}
			contentStream.moveTo(PAGE_MARGIN_X, nextY);
			contentStream.lineTo(PAGE_MARGIN_X + TABLE_WIDTH, nextY);
			contentStream.stroke();
			nextY -= ROW_HEIGHT;
		}
		END_ROW_POSITION_Y = nextY + ROW_HEIGHT;
	}

	private static void drawColumns(PDPageContentStream contentStream) throws IOException {
		float nextX = PAGE_MARGIN_X;
		for (int i = 0; i <= NO_OF_COLUMNS; i++) {
			contentStream.moveTo(nextX, NEW_PAGE_TABLE_POSITION_Y);
			contentStream.lineTo(nextX, END_ROW_POSITION_Y);
			contentStream.stroke();
			nextX += COL_WIDTH[i];
		}
	}

	private static void addTextInHeader(PDPageContentStream contentStream, List<FlexError> flexErrors)
			throws IOException {
		contentStream.setFont(HEADER_FONT, HEADER_FONT_SIZE);
		for (int j = 0; j < NO_OF_COLUMNS; j++) {
			contentStream.beginText();
			contentStream.newLineAtOffset(CURRENT_TEXT_POSITION_X, CURRENT_TEXT_POSITION_Y);
			contentStream.showText(HEADERS[j]);
			contentStream.endText();
			CURRENT_TEXT_POSITION_X += COL_WIDTH[j];
		}
		CURRENT_TEXT_POSITION_X = PAGE_MARGIN_X + CELL_MARGIN;
		CURRENT_TEXT_POSITION_Y -= ROW_HEIGHT;
	}

	private static void addTextInCell(PDPageContentStream contentStream, List<FlexError> flexErrors)
			throws IOException {
		contentStream.setFont(CELL_FONT, CELL_FONT_SIZE);
		int count = 1;
		for (final FlexError flexError : flexErrors) {
			String[] flexErrorValues = new String[NO_OF_COLUMNS];
			flexErrorValues[0] = String.valueOf(count++);
			flexErrorValues[1] = flexError.getErrcode();
			flexErrorValues[2] = flexError.getMessage();
			flexErrorValues[3] = flexError.getErrortype();
			flexErrorValues[4] = flexError.getBatchtype();

			int colCount = 0;
			for (String flexErrorValue : flexErrorValues) {
				contentStream.beginText();
				contentStream.newLineAtOffset(CURRENT_TEXT_POSITION_X, CURRENT_TEXT_POSITION_Y);
				contentStream.showText(flexErrorValue);
				contentStream.endText();
				CURRENT_TEXT_POSITION_X += COL_WIDTH[colCount];
				colCount++;
			}
			CURRENT_TEXT_POSITION_X = PAGE_MARGIN_X + CELL_MARGIN;
			CURRENT_TEXT_POSITION_Y -= ROW_HEIGHT;
		}
	}

}
