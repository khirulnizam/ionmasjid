import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private socialSharing:SocialSharing ) {}

  compilemsg(){
	  var msg = "Sharing activity app by FSTM KUIS \n "+
	  		"Visit us at http://fstm.kuis.edu.my  \n"+
	  		" \n Sent from our Awesome App !";
	  return msg;
	}
	regularShare(){
	  var msg = this.compilemsg();
	  this.socialSharing.share(msg, null, null, null);
	}
	whatsappShare(){
	  var msg  = this.compilemsg();
	   this.socialSharing.shareViaWhatsApp(msg, null, null);
	 }
	 twitterShare(){
	  var msg  = this.compilemsg();
	  this.socialSharing.shareViaTwitter(msg, null, null);
	}
	facebookShare(){
	   var msg  = this.compilemsg();
	    this.socialSharing.shareViaFacebook(msg, null, null);
	  }

}
