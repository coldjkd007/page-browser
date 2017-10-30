import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import 'rxjs/Rx' ;

@Injectable()
export class ScriptService{


    constructor(private http:Http){}


    deletePageHistory(){
        return this.http.delete('http://192.168.1.136:8080/scriptserver/webapi/servicehistory');
    }

    storePageHistory(serviceRequest: {location : { sequenceNo:number }, visitingTime:Date}){
        return this.http.post('http://192.168.1.136:8080/scriptserver/webapi/servicehistory',serviceRequest);
    }

    getPageHistory(){
        return this.http.get('http://192.168.1.136:8080/scriptserver/webapi/servicehistory/list');
    }

}
