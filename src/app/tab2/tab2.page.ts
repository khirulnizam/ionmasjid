import { Component } from '@angular/core';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	activities = [];//hold records
	ref = firebase.database().ref('activities/');

  constructor() {
  	this.ref.on('value', resp => {
    this.activities = [];
    this.activities = snapshotToArray(resp);
  });
  }//end constructor

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
