import { Component } from '@angular/core';
//import firebase additional library
import * as firebase from 'Firebase';
//navCtrl
import { NavController } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	activities = [];//hold records
	ref = firebase.database().ref('activities/');//firebase root
	
  constructor(public navCtrl: NavController, private router: Router) {
  	this.ref.once('value', resp => {
    		this.activities = [];
    		this.activities = snapshotToArray(resp);//fetch from firebase
    		console.log(resp);
  		});
  }//end constructor

	filterList(searchterm){
		if (searchterm!=null){//no search term
			//almost sql LIKE search in firebase
			this.ref.orderByChild('acname').
			startAt(searchterm).
			endAt(searchterm+"\uf8ff").
			on('value', resp => {
	    		this.activities = [];
	    		this.activities = snapshotToArray(resp);//fetch from firebase
	  			console.log("Search: "+searchterm);
	  			console.log(resp);
	  		});

		}else{//display all
	  		this.ref.on('value', resp => {
	    		this.activities = [];
	    		this.activities = snapshotToArray(resp);//fetch from firebase
	  			console.log("Search: "+"display all records");
	  		});
	  	}//end else
	  }//end filterList

	//key:any;
  	goEditpage(key) {
      this.router.navigate(['/edit/',key]);
    } // end goEditpage

}//end Tab2Page


export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
        console.log("Data:");
        console.log(item);
    });

    return returnArr;
};//end snapShot
