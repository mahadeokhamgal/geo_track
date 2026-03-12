import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LocationTimeline } from '../location-timeline';
import { Api } from '../api';
import { USERS_URL } from '../const/urls';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { Map } from '../map/map';

@Component({
  selector: 'app-user-timeline',
  standalone: true,
  imports: [CommonModule, Map],
  templateUrl: './user-timeline.html',
  styleUrls: ['./user-timeline.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimeline {

  public userId: string = '';
  public user$: Observable<User>;
  public timeline$: Observable<LocationTimeline[] | undefined>;

  constructor(private api: Api, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.user$ = this.api.getData<User>(`${USERS_URL}/${this.userId}`);
    this.timeline$ = this.user$.pipe(map(u => u.timeline));
  }
}
