import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private authSvc: AuthService,
                private navCtrl: NavController) { }

  ngOnInit() {
  }
   async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        this.navCtrl.navigateForward('admin/administracion');
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }


}
