import { GroupState } from "../enums/group-state";
import { Group } from "./group";
import { SpecialGroupDetails } from "./special-group-details";

export class SpecialGroup implements Group {
  groupId: string;
  groupType: string;
  groupLevel: string;
  groupDays: string;
  groupHours: string;
  groupLector: string;
  groupFirstMeet: string;
  groupState: GroupState;
  groupShortName: string;
  groupFreePlaces: number;
  groupAlwaysVisible: boolean;
  details: SpecialGroupDetails;

  constructor(group: Group, details: SpecialGroupDetails) {
    this.groupId = group.groupId;
    this.groupType = group.groupType;
    this.groupLevel = group.groupLevel;
    this.groupDays = group.groupDays;
    this.groupHours = group.groupHours;
    this.groupLector = group.groupLector;
    this.groupFirstMeet = group.groupFirstMeet;
    this.groupState = group.groupState;
    this.groupShortName = group.groupShortName;
    this.groupFreePlaces = group.groupFreePlaces;
    this.groupAlwaysVisible = group.groupAlwaysVisible;
    this.details = details;
  }
}