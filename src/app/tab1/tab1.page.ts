import { Component } from '@angular/core';
//import Firebase Service
import {FirebaseService} from '../service/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	data:any={};//object variable for record entry

  constructor(
  	//declare FirebaseService as fb
  	public fb:FirebaseService,
  	) {}

  createActivity(){//create data entry
  	//timestamp
  	let t=new Date();
  	this.data.zztimestamp=t.getTime();//time zone UTC time

  	this.fb.createEntry(this.data)//call function createEntry
  		.then(_=>{
  			alert("Activity stored");
  			this.data.acname="";
  			this.data.acpic="";
  		}, err=>{
  			console.log("ERROR", err);
  		})

  }//end createActivity
}//end class
