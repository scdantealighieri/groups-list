import { GroupState } from "../enums/group-state";
import { GroupPremise } from "./group-premise";

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
  groupAlwaysVisible: boolean;
  groupPremises: GroupPremise[];
  groupCity: string;
  groupCityOrType: string;
  groupForKids: boolean;
}
