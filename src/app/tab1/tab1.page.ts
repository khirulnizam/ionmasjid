import { Component } from '@angular/core';
import {FirebaseService} from '../service/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	data:any={};//object variable

  constructor(
  	public fb:FirebaseService,
  	) {}

  createActivity(){
  	//timestamp
  	let t=new Date();
  	this.data.zztimestamp=t.getTime();//time zone UTC time

  	this.fb.createEntry(this.data)
  		.then(_=>{
  			alert("Activity stored");
  			this.data.acname="";
  			this.data.acpic="";
  			this.data.acdate="";
  			this.data.acvenue="";
  			this.data.acdesc="";
  		}, err=>{
  			console.log("ERROR", err);
  		})

  }//end createnote

}
