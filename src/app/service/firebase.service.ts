import { Injectable } from '@angular/core';
//for firebase import 
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  createEntry(entry)
  {
    return new Promise((resolve,reject)=>{

      let post_key=firebase.database().ref().child('abcabc').push().key;
      //_pfaiadslahahbsd

      firebase.database().ref('activities/'+post_key+'/')
      .set(entry) //insert record to firebase
      .then(resp=>{
        resolve("OK");//record successfully added to root firebase
      },err=>{
        reject(err);//record failed to insert
      })

    })
  }//end create entry
}//end class FirebaseService
