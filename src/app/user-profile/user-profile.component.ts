import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedInUser: string;

  constructor(private storageService: StorageService,
              private route: Router) { }
  
  logOut() {
    this.route.navigateByUrl('/login');
  }

  ngOnInit() {
    let users = this.storageService.getItem('userDetails');
    let loggedInUser = this.storageService.getLoggedInUser();
    this.loggedInUser = users.find((elem) => { return elem.password === loggedInUser.password; });
  }
}
