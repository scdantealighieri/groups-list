import { Component, OnInit, Input } from '@angular/core';
import { GroupsApiService } from '../services/groups-api.service';
import { Group } from '../models/group';
import { Lector } from '../models/lector';
import { IndividualGroup } from '../data/individual-group';
import { DuettoGroup } from '../data/duetto-group';

export type AppMode = 'list' | 'overview';

@Component({
  selector: 'dante-groups-app',
  template: `
    <div class="app">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <dante-groups-list 
        *ngIf="mode === 'list'"
        [groups]="groups" 
        [lectors]="lectors">
      </dante-groups-list>
      <dante-groups-overview 
        *ngIf="mode === 'overview'"
        [groups]="groups" 
        [rootElement]="rootElement">
      </dante-groups-overview>
    </div>
  `,
  styleUrls: ['./groups-app.component.css']
})
export class GroupsAppComponent implements OnInit {
  @Input() mode: AppMode = 'list';
  @Input() rootElement?: HTMLElement;

  groups: Group[] = [];
  lectors: Lector[] = [];

  constructor(private groupsApiService: GroupsApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.groupsApiService.fetchGroups().subscribe({
      next: (groups) => {
        this.addAlwaysVisibleGroups(groups);
        this.groups = groups;
      },
      error: (error) => {
        console.error('Error fetching groups:', error);
        this.groups = [];
      }
    });

    this.groupsApiService.fetchLectors().subscribe({
      next: (lectors) => {
        this.lectors = lectors;
      },
      error: (error) => {
        console.error('Error fetching lectors:', error);
        this.lectors = [];
      }
    });
  }

  private addAlwaysVisibleGroups(groups: Group[]): void {
    groups.push(IndividualGroup);
    groups.push(DuettoGroup);
  }
}