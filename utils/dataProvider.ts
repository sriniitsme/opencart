import fs from 'fs';
import {parse} from 'csv-parse/sync';

export class  DataProvider{

    static getTestDataFromJson(filepath:any){
        let data:any = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        return data
    } 

    static getTestDataFromCSV(filepath:any){
        let data:any = parse(fs.readFileSync(filepath),{columns:true, skip_empty_lines:true});
        return data;  
    }

}