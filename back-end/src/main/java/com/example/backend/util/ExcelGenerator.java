package com.example.backend.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.example.backend.api.user.User;
import com.example.backend.api.user.UserAnswer;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;


public class ExcelGenerator {

    public static ByteArrayInputStream groundStatisticsExcel(JSONObject data) throws IOException {
        String[] userColumns = {"이름", "기관", "학년", "반"};

        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        CreationHelper createHelper = workbook.getCreationHelper();

        Sheet sheet = workbook.createSheet("Customers");

        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.BLUE.getIndex());

        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);



        int rowIdx = 0;
        int cellIdx = 0;

        Row headerRow = sheet.createRow(rowIdx++);

        for (int col = 0; col < userColumns.length; col++) {
            Cell cell = headerRow.createCell(cellIdx++);
            cell.setCellValue(userColumns[col]);
            cell.setCellStyle(headerCellStyle);
        }

        headerCellStyle = workbook.createCellStyle();
        //headerCellStyle.setFillPattern(FillPatternType.DIAMONDS);

        for(Integer key : GroundUtil.resultMap.keySet()){

            Cell cell = headerRow.createCell(cellIdx++);
            cell.setCellValue(GroundUtil.resultMap.get(key));
            cell.setCellStyle(headerCellStyle);

        }

        Integer[] gradeColumns = {1, 2 ,3};

        for(int i : gradeColumns){
            Cell cell = headerRow.createCell(cellIdx++);
            cell.setCellValue(i + "순위");
            cell.setCellStyle(headerCellStyle);
        }

        Iterator<String> iter = data.keys();


        while(iter.hasNext()){
            cellIdx = 0;
            String key = iter.next();
            JSONObject value = data.getJSONObject(key);

            Row row = sheet.createRow(rowIdx++);

            Cell cell = row.createCell(cellIdx++);
            cell.setCellValue(value.optString("userName"));

            cell = row.createCell(cellIdx++);
            cell.setCellValue(value.optString("groupName"));

            cell = row.createCell(cellIdx++);
            cell.setCellValue(value.optString("userGrade"));

            cell = row.createCell(cellIdx++);
            cell.setCellValue(value.optString("userEtc"));

            JSONArray results = value.getJSONArray("results");

            for(Object o : results){
                JSONObject result = (JSONObject)o;
                cell = row.createCell(cellIdx++);
                cell.setCellValue(result.getInt("score"));
            }

            JSONArray grades = value.getJSONArray("grades");

            cellIdx = 19;

            for(int i : gradeColumns) {
                int currentIndex = i - 1;
                JSONObject grade = grades.optJSONObject(currentIndex);
                cell = row.createCell(cellIdx++);

                //System.out.println("grades : " + grade);
                if(grade != null){
                    cell.setCellValue(grade.optString("name"));
                }
            }
        }
        workbook.write(out);
        return new ByteArrayInputStream(out.toByteArray());

        //http://localhost:8088/api/admin/ground/excel/statistics?inspectionIdx=3
    }



    public static ByteArrayInputStream groundPersonalStatisticsExcel(User user) throws IOException {
        String[] userColumns = {"이름", "기관명", "학년(나이)", "반", "시행일"};

        Workbook workbook = new XSSFWorkbook();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("ttt");

        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setColor(IndexedColors.BLUE.getIndex());

        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setFont(headerFont);



        int rowIdx = 0;
        int cellIdx = 0;

        Row row = null;
        Cell cell = null;

        for (int i = 0; i < userColumns.length; i++) {
            //"이름", "기관명", "학년(나이)", "반", "시행일"
            String cellValue =
                    i == 0 ? user.getUserName()
                    : i == 1 ? (user.getGroup() != null ? user.getGroup().getName() : "")
                    : i == 2 ? user.getUserGrade()
                    : i == 3 ? user.getUserEtc()
                    : i == 4 ? user.getCdate()
                    : "";
            cellIdx = 0;
            row = sheet.createRow(rowIdx++);
            cell = row.createCell(cellIdx++);
            cell.setCellValue(userColumns[i]);
            cell = row.createCell(cellIdx++);
            cell.setCellValue(cellValue);

        }

        List<UserAnswer> answers = user.getUserAnswers();

        System.out.println(answers);






        workbook.write(out);
        return new ByteArrayInputStream(out.toByteArray());

    }
}
