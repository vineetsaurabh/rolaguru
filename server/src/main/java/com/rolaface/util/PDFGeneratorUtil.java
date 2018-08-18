package com.rolaface.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.rolaface.entities.FlexError;

public final class PDFGeneratorUtil {

	private static PDPage PAGE = new PDPage();
	private static final float PAGE_WIDTH = PAGE.getMediaBox().getWidth();
	private static final float PAGE_HEIGHT = PAGE.getMediaBox().getHeight();

	private static final int PAGE_MARGIN_X = 50;
	private static final int PAGE_MARGIN_Y = 20;
	private static final float TABLE_WIDTH = PAGE_WIDTH - 2 * PAGE_MARGIN_X;

	private static final String TITLE = "List of Errors";
	private static final PDType1Font TITLE_FONT = PDType1Font.TIMES_BOLD;
	private static final int TITLE_FONT_SIZE = 20;
	private static final int TITLE_MARGIN = 20;

	private static final float NEW_PAGE_TABLE_POSITION_Y = PAGE_HEIGHT - PAGE_MARGIN_Y;
	private static final float NEW_PAGE_TABLE_TEXT_POSITION_Y = NEW_PAGE_TABLE_POSITION_Y - 15;

	private static final int NO_OF_COLUMNS = 7;
	private static final int ROW_HEIGHT = 20;
	private static final int CELL_MARGIN = 5;
	private static final float[] COL_WIDTH = { 40.0f, TABLE_WIDTH - 380.0f, 80.0f, 80.0f, 80.0f, 50.0f, 50.0f, 0.0f };

	private static final String[] HEADERS = { "", "ERR_CODE", "DOMAIN", "MODULE", "OPERATION", "SEVER", "FREQ" };
	private static final PDType1Font HEADER_FONT = PDType1Font.HELVETICA_BOLD;
	private static final int HEADER_FONT_SIZE = 12;

	private static final PDType1Font CELL_FONT = PDType1Font.HELVETICA;
	private static final int CELL_FONT_SIZE = 12;

	private static float CURRENT_TEXT_POSITION_X = PAGE_MARGIN_X + CELL_MARGIN;
	private static float CURRENT_TEXT_POSITION_Y = NEW_PAGE_TABLE_TEXT_POSITION_Y;
	private static float CURRENT_ROW_POSITION_Y = NEW_PAGE_TABLE_POSITION_Y;
	private static float CURRENT_ROW_HEIGHT = ROW_HEIGHT;
	private static float FIRST_ROW_POSITION_Y = 0.0f;
	private static float END_ROW_POSITION_Y = 0.0f;

	private static int count = 1;

	private PDFGeneratorUtil() {
		throw new AssertionError();
	}

	public static byte[] generateListOfErrors(List<FlexError> flexErrors) {
		byte[] ret = null;
		try (PDDocument document = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {

			int pageNumber = 1;
			while (count <= flexErrors.size()) {
				PDPage page = new PDPage();
				document.addPage(page);
				PDPageContentStream contentStream = new PDPageContentStream(document, page);
				if (pageNumber == 1) {
					drawTitle(contentStream);
				}
				drawTable(contentStream, flexErrors);
				insertPageNumber(contentStream, pageNumber);
				contentStream.close();
				pageNumber++;
			}
			count = 1;

			document.save(out);
			ret = out.toByteArray();
		} catch (IOException e) {
			// TODO Exception Handling
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ret;
	}

	private static void drawTitle(PDPageContentStream contentStream) throws IOException, Exception {
		float titleWidth = TITLE_FONT.getStringWidth(TITLE) / 1000 * TITLE_FONT_SIZE;
		float titleX = (PAGE_WIDTH - titleWidth) / 2;

		contentStream.beginText();
		contentStream.setFont(TITLE_FONT, TITLE_FONT_SIZE);
		contentStream.newLineAtOffset(titleX, PAGE_HEIGHT - PAGE_MARGIN_Y - TITLE_MARGIN);
		contentStream.showText(TITLE);
		contentStream.endText();

		CURRENT_TEXT_POSITION_Y = CURRENT_TEXT_POSITION_Y - 2 * TITLE_MARGIN;
		CURRENT_ROW_POSITION_Y = CURRENT_ROW_POSITION_Y - 2 * TITLE_MARGIN;
	}

	private static void drawTable(PDPageContentStream contentStream, List<FlexError> flexErrors)
			throws IOException, Exception {
		FIRST_ROW_POSITION_Y = CURRENT_ROW_POSITION_Y;

		drawRowLine(contentStream);
		drawHeader(contentStream);
		drawRows(contentStream, flexErrors);
		drawColumns(contentStream);

		CURRENT_TEXT_POSITION_X = PAGE_MARGIN_X + CELL_MARGIN;
		CURRENT_TEXT_POSITION_Y = NEW_PAGE_TABLE_TEXT_POSITION_Y;
		CURRENT_ROW_POSITION_Y = NEW_PAGE_TABLE_POSITION_Y;
	}

	private static void drawRowLine(PDPageContentStream contentStream) throws IOException, Exception {
		contentStream.moveTo(PAGE_MARGIN_X, CURRENT_ROW_POSITION_Y);
		contentStream.lineTo(PAGE_MARGIN_X + TABLE_WIDTH, CURRENT_ROW_POSITION_Y);
		contentStream.stroke();
		CURRENT_ROW_POSITION_Y -= CURRENT_ROW_HEIGHT;
	}

	private static void drawHeader(PDPageContentStream contentStream) throws IOException, Exception {
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
		drawRowLine(contentStream);
	}

	private static void drawRows(PDPageContentStream contentStream, List<FlexError> flexErrors)
			throws IOException, Exception {
		while (!(CURRENT_ROW_POSITION_Y <= PAGE_MARGIN_Y || count > flexErrors.size())) {
			addTextInRow(contentStream, flexErrors.get(count - 1), count++);
			CURRENT_ROW_HEIGHT = ROW_HEIGHT;
			drawRowLine(contentStream);
		}
		END_ROW_POSITION_Y = CURRENT_ROW_POSITION_Y + ROW_HEIGHT;
	}

	private static void addTextInRow(PDPageContentStream contentStream, FlexError flexError, int count)
			throws IOException, Exception {
		String[] flexErrorValues = new String[NO_OF_COLUMNS];
		flexErrorValues[0] = String.valueOf(count);
		flexErrorValues[1] = flexError.getErrcode();
		flexErrorValues[2] = flexError.getDomain();
		flexErrorValues[3] = flexError.getModule();
		flexErrorValues[4] = flexError.getOperation();
		flexErrorValues[5] = String.valueOf(flexError.getSeverity());
		flexErrorValues[6] = String.valueOf(flexError.getFrequency());

		int colCount = 0;
		for (String flexErrorValue : flexErrorValues) {
			flexErrorValue = flexErrorValue != null ? flexErrorValue : StringUtils.EMPTY_STRING;
			addTextInCell(contentStream, flexErrorValue, colCount);
			CURRENT_TEXT_POSITION_X += COL_WIDTH[colCount];
			colCount++;
		}
		CURRENT_TEXT_POSITION_X = PAGE_MARGIN_X + CELL_MARGIN;
		CURRENT_TEXT_POSITION_Y -= CURRENT_ROW_HEIGHT;
	}

	private static void addTextInCell(PDPageContentStream contentStream, String text, int colCount)
			throws IOException, Exception {
		contentStream.setFont(CELL_FONT, CELL_FONT_SIZE);
		float textWidth = 0.0f;
		textWidth = CELL_FONT.getStringWidth(text) / 1000 * CELL_FONT_SIZE;
		float cellWidth = COL_WIDTH[2];
		if (colCount == 2 && textWidth > cellWidth) {
			int length = (int) (cellWidth / (CELL_FONT.getAverageFontWidth() / 1000 * CELL_FONT_SIZE));
			String[] lines = wrapText(text, length);

			for (int i = 0; i < lines.length; i++) {
				contentStream.beginText();
				contentStream.newLineAtOffset(CURRENT_TEXT_POSITION_X, CURRENT_TEXT_POSITION_Y);
				contentStream.showText(lines[i]);
				contentStream.endText();

				CURRENT_TEXT_POSITION_Y -= ROW_HEIGHT;
			}
			CURRENT_TEXT_POSITION_Y = CURRENT_TEXT_POSITION_Y + lines.length * ROW_HEIGHT;
			CURRENT_ROW_POSITION_Y = CURRENT_ROW_POSITION_Y - (lines.length - 1) * ROW_HEIGHT;
			CURRENT_ROW_HEIGHT = CURRENT_ROW_HEIGHT + (lines.length - 1) * ROW_HEIGHT;
		} else {
			contentStream.beginText();
			contentStream.newLineAtOffset(CURRENT_TEXT_POSITION_X, CURRENT_TEXT_POSITION_Y);
			contentStream.showText(text);
			contentStream.endText();
		}
	}

	private static void drawColumns(PDPageContentStream contentStream) throws IOException, Exception {
		float nextX = PAGE_MARGIN_X;
		for (int i = 0; i <= NO_OF_COLUMNS; i++) {
			contentStream.moveTo(nextX, FIRST_ROW_POSITION_Y);
			contentStream.lineTo(nextX, END_ROW_POSITION_Y);
			contentStream.stroke();
			nextX += COL_WIDTH[i];
		}
	}

	private static void insertPageNumber(PDPageContentStream contentStream, int pageNumber)
			throws IOException, Exception {
		contentStream.beginText();
		contentStream.newLineAtOffset(PAGE_WIDTH - PAGE_MARGIN_X / 2, PAGE_MARGIN_Y / 2);
		contentStream.showText(String.valueOf(pageNumber));
		contentStream.endText();
	}

	public static String[] wrapText(String text, int len) {
		char[] chars = text.toCharArray();
		List<String> lines = new ArrayList<>();
		StringBuffer line = new StringBuffer();
		StringBuffer word = new StringBuffer();

		for (int i = 0; i < chars.length; i++) {
			word.append(chars[i]);
			if (chars[i] == ' ') {
				if ((line.length() + word.length()) > len) {
					lines.add(line.toString());
					line.delete(0, line.length());
				}
				line.append(word);
				word.delete(0, word.length());
			}
		}

		// handle any extra chars in current word
		if (word.length() > 0) {
			if ((line.length() + word.length()) > len) {
				lines.add(line.toString());
				line.delete(0, line.length());
			}
			line.append(word);
		}

		// handle extra line
		if (line.length() > 0) {
			lines.add(line.toString());
		}

		String[] ret = new String[lines.size()];
		for (int i = 0; i < lines.size(); i++) {
			ret[i] = lines.get(i);
		}
		return ret;
	}

}
