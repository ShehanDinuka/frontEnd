import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-user-add-assets',
  templateUrl: './user-add-assets.component.html',
  styleUrls: ['./user-add-assets.component.css']
})
export class UserAddAssetsComponent implements OnInit {
  assets = new FormControl('');
  userId: any;
  userName: any;
  user: User = new User();
  amount: any;

  constructor(public userService: UserService) {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit() {

    this.getAssets();
  }

  addAssets(): void {
    this.user.user_id = this.userId;
    this.user.name = this.userName;
    this.user.assets = this.assets.value;
    this.userService.updateUserAssets(this.user).subscribe(res => {
      this.user.assets = res.body;
      this.amount = res.body;
    });
  }

  getAssets(): void {
    this.user.user_id = this.userId;
    this.user.name = this.userName;
    this.userService.getAssetsAmount(this.user).subscribe(res => {
      console.log(res.body);
      this.amount = res.body;
    });
  }
}
