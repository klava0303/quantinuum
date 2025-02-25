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
    let row = [[testCase, errorMessage]];

    //create new workbook and add cell titles
    workbook = XLSX.utils.book_new();
    sheet = XLSX.utils.aoa_to_sheet([["Test Case", "Error Message"]]);
    XLSX.utils.book_append_sheet(workbook, sheet);

    //add data
    XLSX.utils.sheet_add_aoa(sheet, row);

    //write XLS file
    XLSX.writeFile(workbook, filePath);
}
