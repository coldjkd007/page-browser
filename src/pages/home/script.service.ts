import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import 'rxjs/Rx' ;

@Injectable()
export class ScriptService{


    constructor(private http:Http){}


    deletePageHistory(){
        return this.http.delete('http://192.168.1.136:8080/scriptserver/webapi/pagehistory');
    }

    storePageHistory(pagehistory: {pageNo:number,browseTime:Date}){
        return this.http.post('http://192.168.1.136:8080/scriptserver/webapi/pagehistory',pagehistory);
    }
    
    getPageHistory(){
        return this.http.get('http://192.168.1.136:8080/scriptserver/webapi/pagehistory/list').map(

        (response:Response) =>{
            const data = response.json();

            for(const history of data){
                history.browseTime= new Date(history.browseTime); 
            }
            return data;
        }

        );
    }

}