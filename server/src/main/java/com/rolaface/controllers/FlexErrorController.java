package com.rolaface.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rolaface.entities.FlexError;
import com.rolaface.entities.FlexErrorSubscribe;
import com.rolaface.services.FlexErrorService;
import com.rolaface.services.FlexErrorSubscribeService;
import com.rolaface.util.PDFGeneratorUtil;

@RestController
@RequestMapping({ "/flex-error" })
public class FlexErrorController {

	@Autowired
	private FlexErrorService flexErrorService;

	@Autowired
	private FlexErrorSubscribeService flexErrorSubscribeService;

	@PostMapping
	public FlexError create(@RequestBody FlexError flexError) {
		return flexErrorService.create(flexError);
	}

	@GetMapping(path = { "/{id}" })
	public FlexError findOne(@PathVariable("id") int id) {
		return flexErrorService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public FlexError update(@RequestBody FlexError flexError) {
		return flexErrorService.update(flexError);
	}

	@DeleteMapping(path = { "/{id}" })
	public FlexError delete(@PathVariable("id") int id) {
		FlexError deletedFlexError = flexErrorService.delete(id);
		if (deletedFlexError != null) {
			List<FlexErrorSubscribe> subscribedErrors = flexErrorSubscribeService.findByErrid(id);
			for (FlexErrorSubscribe subscribedError : subscribedErrors) {
				flexErrorSubscribeService.delete(subscribedError);
			}
		}
		return deletedFlexError;
	}

	@GetMapping(params = "module")
	public List<FlexError> findAll(@RequestParam("module") String module) {
		return flexErrorService.findAll(module);
	}

	@GetMapping(value = "/finderrors", params = "input")
	public List<FlexError> findErrors(@RequestParam("input") String input) {
		return flexErrorService.findErrors(input);
	}

	@GetMapping(value = "/findbyerrcode", params = "code")
	public FlexError findByErrorCode(@RequestParam("code") String errCode) {
		return flexErrorService.findByErrorCode(errCode);
	}

	@Transactional
	@GetMapping(value = "/deleteerrors", params = "errids")
	public boolean deleteErrors(@RequestParam("errids") String errids) {
		try {
			for (String id : errids.split(",")) {
				delete(Integer.parseInt(id));
			}
			return true;
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		return false;
	}

	@Transactional
	@PostMapping("/importerrors")
	public int importFlexErrors(@RequestParam("file") MultipartFile file, @RequestParam("module") String module) {
		int noOfRowInserted = 0;
		try (InputStream stream = file.getInputStream(); HSSFWorkbook workbook = new HSSFWorkbook(stream)) {
			HSSFSheet sheet = workbook.getSheetAt(0);
			sheet.forEach(row -> {
				if (row.getRowNum() != 0) {
					FlexError flexError = new FlexError();
					flexError.setErrcode(row.getCell(1).toString());
					flexError.setDescription(row.getCell(2).toString());
					flexError.setOperation(row.getCell(3).toString());
					flexError.setSeverity(row.getCell(4).toString());
					flexError.setFrequency(row.getCell(5).toString());
					flexError.setModule(module);
					create(flexError);
				}
			});
			noOfRowInserted = sheet.getLastRowNum();
		} catch (IOException e) {
			// TODO Exception Handling
		}
		return noOfRowInserted;
	}

	@GetMapping("/exporterrorsinexcel")
	public ResponseEntity<byte[]> exportErrorsInExcel() {
		byte[] err_code = null;
		String[] columns = { "", "ERR_CODE", "DESCRIPTION", "OPERATION", "SEVERITY", "FREQUENCY", "MODULE" };
		try (HSSFWorkbook workbook = new HSSFWorkbook(); ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
			HSSFSheet sheet = workbook.createSheet("Errors");
			HSSFFont headerFont = workbook.createFont();
			headerFont.setBold(true);
			HSSFCellStyle headerCellStyle = workbook.createCellStyle();
			headerCellStyle.setFont(headerFont);
			HSSFRow headerRow = sheet.createRow(0);
			for (int i = 0; i < columns.length; i++) {
				HSSFCell cell = headerRow.createCell(i);
				cell.setCellValue(columns[i]);
				cell.setCellStyle(headerCellStyle);
			}
			int rowNum = 1;
			for (FlexError flexError : flexErrorService.findAll()) {
				HSSFRow row = sheet.createRow(rowNum);
				row.createCell(0).setCellValue(rowNum++);
				row.createCell(1).setCellValue(flexError.getErrcode());
				flexError.setDescription(row.getCell(2).toString());
				flexError.setOperation(row.getCell(3).toString());
				flexError.setSeverity(row.getCell(4).toString());
				flexError.setFrequency(row.getCell(5).toString());
				flexError.setModule(row.getCell(6).toString());
			}
			for (int i = 0; i < columns.length; i++) {
				sheet.autoSizeColumn(i);
			}
			workbook.write(baos);
			err_code = baos.toByteArray();
		} catch (IOException e) {
			// TODO Exception Handling
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/vnd.ms-excel"));
		headers.setContentDispositionFormData("attachment", "err_code.xls");
		return new ResponseEntity<>(err_code, headers, HttpStatus.OK);
	}

	@GetMapping("/exporterrorsinpdf")
	public ResponseEntity<byte[]> exportErrorsInPDF() {
		byte[] err_code = PDFGeneratorUtil.generateListOfErrors(flexErrorService.findAll());
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("application/pdf"));
		headers.setContentDispositionFormData("attachment", "err_code.pdf");
		return new ResponseEntity<>(err_code, headers, HttpStatus.OK);
	}

}