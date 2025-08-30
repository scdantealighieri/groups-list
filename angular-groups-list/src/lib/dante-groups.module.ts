import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Components
import { GroupsAppComponent } from './components/groups-app/groups-app.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupsOverviewComponent } from './components/groups-overview/groups-overview.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { GroupsTableComponent } from './components/groups-table/groups-table.component';
import { ModalManagerComponent } from './components/modal-manager/modal-manager.component';

// Services
import { GroupsApiService } from './services/groups-api.service';
import { GroupService } from './services/group.service';

@NgModule({
  declarations: [
    GroupsAppComponent,
    GroupsListComponent,
    GroupsOverviewComponent,
    GroupCardComponent,
    GroupsTableComponent,
    ModalManagerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    GroupsApiService,
    GroupService
  ],
  exports: [
    GroupsAppComponent,
    GroupsListComponent,
    GroupsOverviewComponent,
    GroupCardComponent,
    GroupsTableComponent,
    ModalManagerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // For Swiper web components
})
export class DanteGroupsModule { }