import { Component, OnInit } from '@angular/core';
//import firebase additional library
import * as firebase from 'Firebase';
//navCtrl
import { NavController } from '@ionic/angular';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

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
	activity = [];//hold records
  ref = firebase.database().ref('activities');//firebase root
	
  constructor(public navCtrl: NavController, 
  				private router: Router, 
  				private route:ActivatedRoute) {

  	this.sub = this.route.params.subscribe(param =>{
      	//this.key=decodeURI(this.route.snapshot.params.key);
        this.key=this.route.snapshot.params.key;
        this.root='activities/'+this.key;
        //this.ref = firebase.database().ref('activities');//firebase root
      	
	  });
    
    /*firebase.database().ref(this.root).once('value', resp => {
  	//firebase.database().ref('activities/').child(this.key).on('value', resp => {
  		console.log("Resp: "+resp);
      console.log("Root: "+this.root);
      console.log("Key:"+this.key);
    	this.activity = snapshotToObject(resp);
  	});*/

    //search 1rec by acname
    this.ref.orderByChild('acname').
      startAt(this.route.snapshot.params.key).
      endAt(this.route.snapshot.params.key+"\uf8ff").
      limitToLast(1).
      once('value', resp => {
          this.activity = [];
          this.activity = snapshotToArray(resp);//fetch from firebase
          console.log("Data:");
          console.log(resp);
          //console.log("Root: "+this.root);
          console.log("Key:"+this.route.snapshot.params.key);
          console.log("Array: ");
          console.log(this.activity);
        });

  }//constructor


  ngOnInit() {
  }

}//end class Edit

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  console.log(item);

  return item;
}


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
