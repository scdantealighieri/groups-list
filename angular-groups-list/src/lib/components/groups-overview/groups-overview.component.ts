import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Group } from '../../models/group';
import { GroupDetails } from '../../models/group-details';
import { SpecialGroup } from '../../models/special-group';
import { ModalType } from '../../enums/modal-type';
import { GroupsApiService } from '../../services/groups-api.service';
import { GroupService } from '../../services/group.service';
import { IndividualGroup } from '../../data/individual-group';
import { DuettoGroup } from '../../data/duetto-group';

// Note: For Swiper in Angular, we'll use Swiper Element (Web Components)
// This requires swiper/element bundle to be imported

@Component({
  selector: 'dante-groups-overview',
  template: `
    <div class="overview-container">
      <p *ngIf="filteredGroups.length === 0" class="no-groups-message">
        W tej chwili brak dostępnych kursów
      </p>
      
      <div *ngIf="filteredGroups.length > 0" class="swiper-container">
        <!-- Using Swiper Web Component -->
        <swiper-container
          #swiperContainer
          space-between="30"
          slides-per-view="auto"
          centered-slides="false"
          navigation="true"
          slides-offset-after="30"
          slides-offset-before="30"
          center-insufficient-slides="true"
          class="group-list">
          
          <swiper-slide 
            *ngFor="let group of filteredGroups; trackBy: trackByGroupId"
            class="swiper-slide">
            <dante-group-card
              [group]="group"
              [isLandingPage]="isLandingPage"
              (onShowGroupDetails)="onShowGroupDetails($event)"
              (onShowSignIn)="onShowSignIn($event)"
              (onShowNotify)="onShowNotify($event)">
            </dante-group-card>
          </swiper-slide>
        </swiper-container>
      </div>
      
      <!-- Modal Manager will be implemented separately -->
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
  styleUrls: ['./groups-overview.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for Swiper web components
})
export class GroupsOverviewComponent implements OnInit, AfterViewInit {
  @Input() groups: Group[] = [];
  @Input() rootElement?: HTMLElement;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  groupDetails: GroupDetails | null = null;
  selectedGroup: Group | null = null;
  isGroupDetailsOpen = false;
  modalType = ModalType.None;
  modalTypeEnum = ModalType;
  
  filteredGroups: Group[] = [];
  isLandingPage = false;

  constructor(
    private groupsApiService: GroupsApiService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.isLandingPage = !!this.rootElement?.getAttribute('dante-lp');
    this.updateFilteredGroups();
  }

  ngAfterViewInit(): void {
    // Configure Swiper after view init if needed
    if (this.swiperContainer?.nativeElement) {
      // Swiper web component configuration can be done here if needed
    }
  }

  trackByGroupId(index: number, group: Group): string {
    return group.groupId;
  }

  private updateFilteredGroups(): void {
    this.filteredGroups = this.getFilteredGroups();
  }

  private getFilteredGroups(): Group[] {
    if (!this.rootElement) return this.groups;

    const level = this.rootElement.getAttribute('dante-level')?.toLowerCase();
    const type = this.rootElement.getAttribute('dante-type')?.toLowerCase();
    const lector = this.rootElement.getAttribute('dante-lector')?.toLowerCase();
    const hideInd = this.rootElement.getAttribute('dante-hide-ind')?.toLowerCase();
    const name = this.rootElement.getAttribute('dante-name')?.toLowerCase();
    const city = this.rootElement.getAttribute('dante-city')?.toLowerCase();
    const hideDuetto = this.rootElement.getAttribute('dante-hide-duetto')?.toLowerCase();

    let filtered = this.groups.filter((group) => !(group instanceof SpecialGroup));

    if (level) {
      filtered = filtered.filter((group) =>
        group.groupLevel.toLowerCase().startsWith(level)
      );
    }

    if (type) {
      filtered = filtered.filter((group) =>
        group.groupType.toLowerCase().startsWith(type)
      );
    }

    if (lector) {
      filtered = filtered.filter((group) =>
        group.groupLector.toLowerCase().startsWith(lector)
      );
    }

    if (!hideInd) {
      const thisLectorIndividualGroup = { ...IndividualGroup };
      if (lector) {
        thisLectorIndividualGroup.details.groupLector = lector.toUpperCase();
      }
      filtered = [...filtered, thisLectorIndividualGroup];
    }

    if (!hideDuetto) {
      const thisLectorDuettoGroup = { ...DuettoGroup };
      if (lector) {
        thisLectorDuettoGroup.details.groupLector = lector.toUpperCase();
      }
      filtered = [...filtered, thisLectorDuettoGroup];
    }

    if (name) {
      filtered = filtered.filter((group) =>
        group.groupShortName.toLowerCase().includes(name)
      );
    }

    if (city) {
      filtered = filtered.filter((group) =>
        group.groupCity.toLowerCase().includes(city)
      );
    }

    // Sort groups
    filtered.sort((a, b) => {
      const res = a.groupShortName.trim().localeCompare(b.groupShortName.trim());

      if (res === 0) {
        return (
          this.groupService.dayMappingToNumber[a.groupDays.split('-')[0]] -
          this.groupService.dayMappingToNumber[b.groupDays.split('-')[0]]
        );
      }
      return res;
    });

    return filtered;
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
    if (this.isLandingPage) {
      window.location.hash = '#zapisz-sie';
      return;
    }

    await this.fetchGroupDetails(groupId);
    this.modalType = ModalType.SignIn;
  }

  async onShowNotify(groupId: string): Promise<void> {
    await this.fetchGroupDetails(groupId);
    this.modalType = ModalType.Notify;
  }
}