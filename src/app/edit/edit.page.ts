import { Component, OnInit } from '@angular/core';
//import firebase additional library
import * as firebase from 'Firebase';
//navCtrl
import { NavController } from '@ionic/angular';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from '../service/firebase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	name:any;
	sub:any;
  key:any;
  root:any;
	activity = {};//hold the record
  ref = firebase.database().ref('activities');//firebase root
  rec:any={};//object variable for record entry
	
  constructor(public navCtrl: NavController, 
  				private router: Router, 
  				private route:ActivatedRoute,
          public fb:FirebaseService,) {

  	this.sub = this.route.params.subscribe(param =>{
      	//this.key=decodeURI(this.route.snapshot.params.key);
        this.key=this.route.snapshot.params.key;
        this.root='activities/'+this.key;
        //this.ref = firebase.database().ref('activities');//firebase root
      	
	  });

    //search 1rec by acname
    this.ref.orderByChild('acname').
      startAt(this.route.snapshot.params.key).
      endAt(this.route.snapshot.params.key+"\uf8ff").
      limitToLast(1).
      once('value', resp => {
          this.activity = {};
          this.activity = snapshotToObject(resp);//fetch from firebase
          console.log("Data:");
          console.log(resp);
          //console.log("Root: "+this.root);
          console.log("Key:"+this.route.snapshot.params.key);
          //console.log("Array: ");
          //console.log(this.activity);
        });

  }//constructor

  saveUpdateActivity() {

    this.fb.updateEntry( this.rec.data, this.rec.data.key)//call function createEntry
      .then(_=>{
        alert("Activity saved update: key: "+this.rec.key +
          " acname: "+this.rec.acname );
        //back to previous page
        this.navCtrl.back();

      }, err=>{
        console.log("ERROR", err);
      })
  }


  ngOnInit() {
  }

}//end class Edit

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  console.log("Item: ");
  console.log(item);
  console.log("acname: ");
  console.log(item);

  return item;
}


export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
        console.log("Data: ");
        console.log(item);
    });

    return returnArr;
};//end snapShot