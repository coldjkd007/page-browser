import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScriptService } from './script.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  pageNo:number=1;
  pageBrowseHistories:{
    pageNo:number,
    browseTime  :Date
  }[];

  time:Date = new Date();

  
  constructor(public navCtrl: NavController,private scriptService:ScriptService) {

  }

  ngOnInit(): void {
    this.scriptService.getPageHistory().subscribe(

      (history:any[])=>{
        this.pageBrowseHistories = history;
      }
    );
  }

  onNextPage(){
    //if(this.pageNo <10){
      this.pageNo++;
      this.scriptService.storePageHistory({pageNo:this.pageNo,browseTime:new Date()}).subscribe(
        (response)=>{
          console.log(response);

          this.scriptService.getPageHistory().subscribe(
            
                  (history:any[])=>{
                    this.pageBrowseHistories = history;
                  }
                );
        }
      );



   // }
  }

  onPrevPage(){
   // if(this.pageNo > 1){
      this.pageNo--;
      this.scriptService.storePageHistory({pageNo:this.pageNo,browseTime:new Date()}).subscribe(
        (response)=>{

    

          console.log(response);

          this.scriptService.getPageHistory().subscribe(
            
                  (history:any[])=>{
                    this.pageBrowseHistories = history;
                  }
                );
        }
      );


    }
  //}

  onClearPage(){
    this.scriptService.deletePageHistory().subscribe(
      (response) => {
        while(!response.ok){
          
                    }
        console.log(response);

        this.scriptService.getPageHistory().subscribe(
          
                (history:any[])=>{
                  this.pageBrowseHistories = history;
                }
              ) ;
      }
    );




  }

  

}
