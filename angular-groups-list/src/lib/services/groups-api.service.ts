import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Group } from '../models/group';
import { GroupDetails } from '../models/group-details';
import { Lector } from '../models/lector';
import { GroupState } from '../enums/group-state';
import { GroupType } from '../enums/group-type';

@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {
  private readonly baseUrl = 'https://dantealighieri.appblue.pl';

  constructor(private http: HttpClient) {}

  fetchGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/api/get_groups.php`)
      .pipe(
        map((data: Group[]) => {
          data.forEach((group) => {
            if (Date.parse(group.groupFirstMeet) > Date.now()) {
              group.groupState = GroupState.Incoming;
            } else {
              group.groupState = GroupState.Active;
            }

            if (group.groupType === GroupType.OnSite) {
              group.groupCityOrType = group.groupCity;
            } else {
              group.groupCityOrType = group.groupType;
            }
          });
          return data;
        }),
        catchError((error) => {
          console.error('Error fetching groups:', error);
          return throwError(() => error);
        })
      );
  }

  fetchGroup(groupId: string): Observable<GroupDetails | null> {
    const body = new URLSearchParams({ id: groupId });
    
    return this.http.post<GroupDetails[]>(`${this.baseUrl}/api/get_group_details.php`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).pipe(
      map((response: GroupDetails[]) => {
        if (response && response.length > 0) {
          const data = response[0];
          data.groupId = groupId;
          return data;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error fetching group details:', error);
        return throwError(() => error);
      })
    );
  }

  fetchLectors(): Observable<Lector[]> {
    return this.http.get<Lector[]>(`${this.baseUrl}/api/get_lectors.php`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching lectors:', error);
          return throwError(() => error);
        })
      );
  }
}