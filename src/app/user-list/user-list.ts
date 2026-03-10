import { Component } from '@angular/core';
import { Api } from '../api';
import { User } from '../user';
import { USERS_URL } from '../const/urls';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  public users: User[] = [];

  constructor(private api: Api, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getData<User[]>(USERS_URL).subscribe((users: User[]) => {
      this.users = users;
      console.log("users", this.users);
    });
  }

  navigateToUser(id: string) {
    console.log("navigate to user", id);
    // this.router.navigate(['/user', id]);
  }
}
