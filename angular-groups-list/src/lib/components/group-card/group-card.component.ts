import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'dante-group-card',
  template: `
    <div 
      class="group-card" 
      [ngClass]="{ 'full-group-card': group.groupFreePlaces === 0 }"
      [style.width.px]="cardWidth">
      
      <div *ngIf="group.groupFreePlaces === 0" class="group-full-banner">
        Pełna
      </div>
      
      <div class="group-type">{{ group.groupCityOrType }}</div>
      
      <div #groupLevelRef class="group-level">
        {{ group.groupShortName }}
      </div>
      
      <div class="group-days">
        {{ getFormattedGroupDays() }} {{ getFormattedGroupHours() }}
      </div>
      
      <div class="group-lector">{{ group.groupLector }}</div>
      
      <div class="buttons-container">
        <div *ngIf="!isLandingPage"
             class="show-more-btn dante-button info-button"
             (click)="onShowGroupDetails.emit(group.groupId)">
          Info
        </div>
        
        <div *ngIf="group.groupFreePlaces === 0 && !isLandingPage; else signInButton"
             class="sign-in-btn dante-button notify-button"
             (click)="onShowNotify.emit(group.groupId)">
          Powiadom
        </div>
        
        <ng-template #signInButton>
          <div class="sign-in-btn dante-button"
               (click)="onShowSignIn.emit(group.groupId)">
            Zapisz się
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit, AfterViewInit {
  @Input() group!: Group;
  @Input() isLandingPage?: boolean = false;
  
  @Output() onShowGroupDetails = new EventEmitter<string>();
  @Output() onShowSignIn = new EventEmitter<string>();
  @Output() onShowNotify = new EventEmitter<string>();

  @ViewChild('groupLevelRef') groupLevelRef!: ElementRef<HTMLDivElement>;

  cardWidth = 230;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.adjustFontSizeIfNeeded();
  }

  getFormattedGroupHours(): string {
    return this.group.groupHours.split('$')[0];
  }

  getFormattedGroupDays(): string {
    return this.groupService.getFormattedGroupDays(this.group.groupDays);
  }

  private adjustFontSizeIfNeeded(): void {
    if (this.groupLevelRef?.nativeElement) {
      const element = this.groupLevelRef.nativeElement;
      const width = element.offsetWidth;
      
      if (width > this.cardWidth) {
        let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        
        while (element.offsetWidth > this.cardWidth && fontSize > 0) {
          fontSize -= 1;
          element.style.fontSize = `${fontSize}px`;
        }
      }
    }
  }
}