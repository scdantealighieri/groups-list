import { GroupState } from "../enums/group-state";

export interface Group {
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
}
