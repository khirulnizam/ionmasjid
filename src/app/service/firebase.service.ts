import { Injectable } from '@angular/core';
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
      .set(entry)
      .then(resp=>{
        resolve("OK");
      },err=>{
        reject(err);
      })

    })
  }
}
