import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';

type SortColumn = 'level' | 'day' | 'hour' | 'lector' | 'type' | null;
type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'dante-groups-table',
  template: `
    <div class="table-container">
      <table class="groups-table">
        <thead>
          <tr>
            <th (click)="handleSort('level')" [class.sortable]="true">
              Poziom
              <span *ngIf="sortColumn === 'level'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th (click)="handleSort('day')" [class.sortable]="true">
              Dzień
              <span *ngIf="sortColumn === 'day'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th (click)="handleSort('hour')" [class.sortable]="true">
              Godzina
              <span *ngIf="sortColumn === 'hour'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th (click)="handleSort('lector')" [class.sortable]="true">
              Lektor
              <span *ngIf="sortColumn === 'lector'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th (click)="handleSort('type')" [class.sortable]="true">
              Typ
              <span *ngIf="sortColumn === 'type'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let group of getSortedGroups(); trackBy: trackByGroupId" 
              [class.full-group]="group.groupFreePlaces === 0">
            
            <td class="level">{{ group.groupShortName }}</td>
            
            <td class="day">
              {{ group.groupDays ? getFormattedGroupDays(group.groupDays) : '-' }}
            </td>
            
            <td class="hour">
              {{ group.groupHours ? getFormattedGroupHours(group.groupHours) : '-' }}
            </td>
            
            <td class="lector">{{ group.groupLector }}</td>
            
            <td class="type">
              <div class="type-content">
                <div class="lector">{{ group.groupLector }}</div>
                <div class="type-indicator">
                  <div class="icon" *ngIf="group.groupType === 'stacjonarna'">
                    <span class="material-symbols-outlined">home</span>
                  </div>
                  <div class="icon" *ngIf="group.groupType !== 'stacjonarna'">
                    <span class="material-symbols-outlined">computer</span>
                  </div>
                </div>
              </div>
            </td>
            
            <td class="actions">
              <div class="icon info-icon" (click)="onShowGroupDetails.emit(group.groupId)">
                <span class="material-symbols-outlined">info</span>
              </div>
              
              <div *ngIf="group.groupFreePlaces === 0; else signInButton"
                   class="sign-in-btn dante-button sign-in"
                   (click)="onShowNotify.emit(group.groupId)">
                Powiadom mnie
              </div>
              
              <ng-template #signInButton>
                <div class="sign-in-btn dante-button sign-in"
                     (click)="onShowSignIn.emit(group.groupId)">
                  Zapisz się
                </div>
              </ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./groups-table.component.css']
})
export class GroupsTableComponent {
  @Input() groups: Group[] = [];
  
  @Output() onShowGroupDetails = new EventEmitter<string>();
  @Output() onShowSignIn = new EventEmitter<string>();
  @Output() onShowNotify = new EventEmitter<string>();

  sortColumn: SortColumn = null;
  sortDirection: SortDirection = null;

  constructor(private groupService: GroupService) {}

  trackByGroupId(index: number, group: Group): string {
    return group.groupId;
  }

  handleSort(column: SortColumn): void {
    if (this.sortColumn === column) {
      if (this.sortDirection === 'desc') {
        this.sortDirection = 'asc';
      } else if (this.sortDirection === 'asc') {
        this.sortDirection = null;
        this.sortColumn = null;
      } else {
        this.sortDirection = 'desc';
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
  }

  getSortedGroups(): Group[] {
    const regularGroups = this.groups.filter(group => !!group.groupDays);
    const specialGroups = this.groups.filter(group => !group.groupDays);

    const sortedRegularGroups = !this.sortColumn || !this.sortDirection
      ? regularGroups
      : [...regularGroups].sort((a, b) => {
        let valueA: string;
        let valueB: string;

        switch (this.sortColumn) {
          case 'level':
            valueA = a.groupLevel;
            valueB = b.groupLevel;
            break;
          case 'day':
            valueA = a.groupDays;
            valueB = b.groupDays;
            break;
          case 'hour':
            valueA = a.groupHours;
            valueB = b.groupHours;
            break;
          case 'lector':
            valueA = a.groupLector;
            valueB = b.groupLector;
            break;
          case 'type':
            valueA = a.groupType;
            valueB = b.groupType;
            break;
          default:
            return 0;
        }

        const comparison = valueA.localeCompare(valueB);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });

    return [...sortedRegularGroups, ...specialGroups];
  }

  getFormattedGroupDays(groupDays: string): string {
    return this.groupService.getFormattedGroupDays(groupDays);
  }

  getFormattedGroupHours(groupHours: string): string {
    return groupHours.split('$')[0];
  }
}