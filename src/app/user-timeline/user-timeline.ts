import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationTimeline } from '../location-timeline';
import { Api } from '../api';
import { USER_TIMELINE } from '../const/urls';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-user-timeline',
  imports: [CommonModule],
  templateUrl: './user-timeline.html',
  styleUrl: './user-timeline.css',
})
export class UserTimeline {
  public userId: string = '';
  public timeline: LocationTimeline[] | undefined;

  constructor(private api: Api, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.getUserTimeline();
  }

  public getUserTimeline() {
    this.api.getData<User>(`${USER_TIMELINE}/${this.userId}`)
      .subscribe((user: User) => {
        this.timeline = user.timeline;
        console.log("timeline", this.timeline);
      })
  }
}
