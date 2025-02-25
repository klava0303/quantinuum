import { PageManager } from '../pages/pageManager';
import * as XLSX from 'xlsx';
import fs from 'fs';

export async function loginFunc(page) {
    const pm = new PageManager(page);
    await pm.onLoginPage().goto();
    await page.waitForLoadState('domcontentloaded');
    await pm.onLoginPage().logIn();
    return pm;
}

export async function bugReport(testCase, errorMessage) {
    const filePath = `bug_report_${testCase}.xlsx`;
    let workbook;
    let sheet;
    let newRow = [[testCase, errorMessage]];

    //workbook = XLSX.readFile(filePath);
    //sheet = workbook.Sheets['Bugs'];

    //create new workbook and add headers
    workbook = XLSX.utils.book_new();
    sheet = XLSX.utils.aoa_to_sheet([["Test Case", "Error Message"]]);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Bugs');

    //get existing data
    const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1'); //get current sheet range
    const nextRow = range.e.r + 1; //find the next blank row

    //append new data
    XLSX.utils.sheet_add_aoa(sheet, newRow, { origin: `A${nextRow + 1}` });

    //write back to the XLS file
    XLSX.writeFile(workbook, filePath);
}
