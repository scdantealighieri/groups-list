import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group';
import { GroupDetails } from '../../models/group-details';
import { ModalType } from '../../enums/modal-type';

@Component({
  selector: 'dante-modal-manager',
  template: `
    <div class="modal-overlay" *ngIf="modalType !== modalTypeEnum.None" (click)="onClose()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        
        <!-- Group Details Modal -->
        <div *ngIf="modalType === modalTypeEnum.Details && groupDetails" class="modal">
          <div class="modal-header">
            <h2>{{ groupDetails.groupName }}</h2>
            <button class="close-btn" (click)="onClose()">×</button>
          </div>
          <div class="modal-body">
            <p>{{ groupDetails.groupDescription }}</p>
            <div class="group-info">
              <p><strong>Poziom:</strong> {{ groupDetails.groupLevel }}</p>
              <p><strong>Dni:</strong> {{ groupDetails.groupDays }}</p>
              <p><strong>Godziny:</strong> {{ groupDetails.groupHours }}</p>
              <p><strong>Lektor:</strong> {{ groupDetails.groupLector }}</p>
              <p><strong>Wolne miejsca:</strong> {{ groupDetails.groupFreePlaces }}</p>
            </div>
          </div>
        </div>
        
        <!-- Sign In Modal -->
        <div *ngIf="modalType === modalTypeEnum.SignIn" class="modal">
          <div class="modal-header">
            <h2>Zapisz się na kurs</h2>
            <button class="close-btn" (click)="onClose()">×</button>
          </div>
          <div class="modal-body">
            <p>Funkcjonalność zapisu zostanie zaimplementowana.</p>
          </div>
        </div>
        
        <!-- Notify Modal -->
        <div *ngIf="modalType === modalTypeEnum.Notify" class="modal">
          <div class="modal-header">
            <h2>Powiadomienia</h2>
            <button class="close-btn" (click)="onClose()">×</button>
          </div>
          <div class="modal-body">
            <p>Funkcjonalność powiadomień zostanie zaimplementowana.</p>
          </div>
        </div>
        
      </div>
    </div>
  `,
  styleUrls: ['./modal-manager.component.css']
})
export class ModalManagerComponent {
  @Input() groupDetails: GroupDetails | null = null;
  @Input() group: Group | null = null;
  @Input() modalType: ModalType = ModalType.None;
  @Input() isGroupDetailsOpen = false;
  
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onShowSignIn = new EventEmitter<string>();
  @Output() onShowNotify = new EventEmitter<string>();

  modalTypeEnum = ModalType;

  onClose(): void {
    this.onCloseModal.emit();
  }
}