import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Group } from '../../models/group';
import { Lector } from '../../models/lector';
import { GroupDetails } from '../../models/group-details';
import { Filter } from '../../models/filter';
import { FilterTabs } from '../../enums/filter-tabs';
import { GroupSortType } from '../../enums/group-sort-type';
import { ListDisplayType } from '../../enums/list-display-type';
import { ModalType } from '../../enums/modal-type';
import { SpecialGroup } from '../../models/special-group';
import { GroupsApiService } from '../../services/groups-api.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'dante-groups-list',
  template: `
    <div class="groups-list-container">
      
      <!-- Filter and Sort Controls (simplified for now) -->
      <div class="controls">
        <div class="display-type-toggle">
          <button 
            [class.active]="selectedListDisplayType === listDisplayTypeEnum.Grid"
            (click)="setDisplayType(listDisplayTypeEnum.Grid)">
            Grid
          </button>
          <button 
            [class.active]="selectedListDisplayType === listDisplayTypeEnum.List"
            (click)="setDisplayType(listDisplayTypeEnum.List)">
            Table
          </button>
        </div>
        
        <div class="sort-controls">
          <label for="sortSelect">Sort by:</label>
          <select id="sortSelect" [(ngModel)]="selectedSortType" (ngModelChange)="onSortChange()">
            <option [value]="groupSortTypeEnum.Level">Level</option>
            <option [value]="groupSortTypeEnum.Day">Day</option>
            <option [value]="groupSortTypeEnum.StartDate">Start Date</option>
            <option [value]="groupSortTypeEnum.Lector">Lector</option>
          </select>
        </div>
      </div>

      <!-- Groups Display -->
      <div class="groups-content">
        
        <!-- Table View -->
        <dante-groups-table 
          *ngIf="selectedListDisplayType === listDisplayTypeEnum.List"
          [groups]="filteredGroups"
          (onShowGroupDetails)="onShowGroupDetails($event)"
          (onShowSignIn)="onShowSignIn($event)"
          (onShowNotify)="onShowNotify($event)">
        </dante-groups-table>
        
        <!-- Grid View -->
        <div *ngIf="selectedListDisplayType === listDisplayTypeEnum.Grid" class="group-list">
          <dante-group-card
            *ngFor="let group of filteredGroups; trackBy: trackByGroupId"
            [group]="group"
            (onShowGroupDetails)="onShowGroupDetails($event)"
            (onShowSignIn)="onShowSignIn($event)"
            (onShowNotify)="onShowNotify($event)">
          </dante-group-card>
        </div>
        
      </div>
      
      <!-- Modal Manager -->
      <dante-modal-manager
        *ngIf="modalType !== modalTypeEnum.None"
        [groupDetails]="groupDetails"
        [group]="selectedGroup"
        [modalType]="modalType"
        [isGroupDetailsOpen]="isGroupDetailsOpen"
        (onCloseModal)="closeModals()"
        (onShowSignIn)="onShowSignIn($event)"
        (onShowNotify)="onShowNotify($event)">
      </dante-modal-manager>
      
    </div>
  `,
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit, OnChanges {
  @Input() groups: Group[] = [];
  @Input() lectors: Lector[] = [];

  filteredGroups: Group[] = [];
  selectedGroup: Group | null = null;
  groupDetails: GroupDetails | null = null;
  isGroupDetailsOpen = false;
  modalType = ModalType.None;
  selectedFilterTab = FilterTabs.None;
  selectedSortType = GroupSortType.Level;
  selectedListDisplayType = ListDisplayType.Grid;
  
  // Enum references for template
  modalTypeEnum = ModalType;
  listDisplayTypeEnum = ListDisplayType;
  groupSortTypeEnum = GroupSortType;

  filter: Filter = {
    groupDays: [],
    groupLector: [],
    groupLevel: [],
    groupType: [],
    groupPeriod: [],
    groupState: [],
  };

  constructor(
    private groupsApiService: GroupsApiService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.updateFilteredGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groups']) {
      this.updateFilteredGroups();
    }
  }

  trackByGroupId(index: number, group: Group): string {
    return group.groupId;
  }

  setDisplayType(type: ListDisplayType): void {
    this.selectedListDisplayType = type;
  }

  onSortChange(): void {
    this.updateFilteredGroups();
  }

  private updateFilteredGroups(): void {
    let filtered = [...this.groups];
    
    // Apply sorting
    filtered = this.sortGroups(filtered);
    
    this.filteredGroups = filtered;
  }

  private sortGroups(groups: Group[]): Group[] {
    return groups.sort((a, b) => {
      switch (this.selectedSortType) {
        case GroupSortType.Level:
          return a.groupLevel.localeCompare(b.groupLevel);
        
        case GroupSortType.Day:
          const aDayNum = this.groupService.dayMappingToNumber[a.groupDays.split('-')[0]] || 8;
          const bDayNum = this.groupService.dayMappingToNumber[b.groupDays.split('-')[0]] || 8;
          return aDayNum - bDayNum;
        
        case GroupSortType.StartDate:
          return this.groupService.parseDateToNumber(a.groupFirstMeet) - 
                 this.groupService.parseDateToNumber(b.groupFirstMeet);
        
        case GroupSortType.Lector:
          return a.groupLector.localeCompare(b.groupLector);
        
        default:
          return 0;
      }
    });
  }

  private async fetchGroupDetails(groupId: string): Promise<void> {
    const group = this.groups.find((group) => group.groupId === groupId) ?? null;

    if (group && group instanceof SpecialGroup) {
      this.groupDetails = group.details;
      return;
    }

    this.selectedGroup = group;
    
    this.groupsApiService.fetchGroup(groupId).subscribe({
      next: (data) => {
        this.groupDetails = data;
      },
      error: (error) => {
        console.error('Error fetching group details:', error);
        this.groupDetails = null;
      }
    });
  }

  closeModals(): void {
    this.isGroupDetailsOpen = false;
    this.modalType = ModalType.None;
    this.groupDetails = null;
  }

  async onShowGroupDetails(groupId: string): Promise<void> {
    await this.fetchGroupDetails(groupId);
    this.isGroupDetailsOpen = true;
    this.modalType = ModalType.Details;
  }

  async onShowSignIn(groupId: string): Promise<void> {
    await this.fetchGroupDetails(groupId);
    this.modalType = ModalType.SignIn;
  }

  async onShowNotify(groupId: string): Promise<void> {
    await this.fetchGroupDetails(groupId);
    this.modalType = ModalType.Notify;
  }
}