import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import { ScriptService } from './script.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  pageNo:number=0;
  pageBrowseHistories:{
    location : { sequenceNo:number },
    visitingTime:Date
  }[];

  //time:Date = new Date();


  constructor(public  navCtrl: NavController,
              private scriptService:ScriptService,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {

  }

  ngOnInit(): void {
      this.loadPageBrowseHistories();
  }

  onNextPage(){
    this.pageNo++;
    this.storePageBrowseHistories();
    //this.loadPageBrowseHistories();
  }

  onPrevPage(){
    this.pageNo--;
    this.storePageBrowseHistories();
   // this.loadPageBrowseHistories();
  }

  loadPageBrowseHistories(){
    const loading = this.loadingCtrl.create({
      content: 'Loading history from server ..'
    });
    loading.present();

    this.scriptService.getPageHistory().subscribe(
      (response)=>{
        const data = response.json();
        for(const history of data){
          history.visitingTime= new Date(history.visitingTime);
        }
        this.pageBrowseHistories = data;
        loading.dismiss();
      },
      (error)=>{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Loading history from server failed!',
          message: error.json().message,
          buttons: ['Ok']
        });
        alert.present();
      }
    );
  }

  storePageBrowseHistories(){
/*    const loading = this.loadingCtrl.create({
      content: 'Saving into server ..'
    });
    loading.present();*/

    this.scriptService.storePageHistory({location : { sequenceNo : this.pageNo },visitingTime:new Date()}).subscribe(
      (response)=>{
        console.log(response);
       // loading.dismiss();
        this.loadPageBrowseHistories();

      },
      (error)=>{
        console .log(error);
        //loading .dismiss();
        const alert = this.alertCtrl.create({
          title: 'Saving into server failed!',
          message: error.json().message,
          buttons: ['Ok']
        });
        alert.present();
      }
    );


  }

  onClearPage(){
    this.scriptService.deletePageHistory().subscribe(
      (response) => {
        while(!response.ok){}
        console.log(response);
        this.loadPageBrowseHistories();
      },
      (error)=>{

      }

    );
  }

}
