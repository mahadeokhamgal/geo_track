import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationTimeline } from '../location-timeline';
import { Api } from '../api';
import { USER_TIMELINE } from '../const/urls';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { Map } from '../map/map';

@Component({
  selector: 'app-user-timeline',
  standalone: true,
  imports: [CommonModule, Map],
  templateUrl: './user-timeline.html',
  styleUrl: './user-timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimeline {

  public userId: string = '';

  public timeline = signal<LocationTimeline[] | undefined>(undefined);

  constructor(private api: Api, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.getUserTimeline();
  }

  public getUserTimeline() {
    this.api.getData<User>(`${USER_TIMELINE}/${this.userId}`)
      .subscribe((user: User) => {
        this.timeline.set(user.timeline);
        console.log("timeline", this.timeline());
      });
  }
}