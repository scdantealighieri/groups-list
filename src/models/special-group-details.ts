import { GroupDetails } from "./group-details";
import { SpecialGroupBulletPoint } from "./special-group-bullet-point";

export interface SpecialGroupDetails extends GroupDetails {
    groupSubHeader: string;
    bulletPoints: SpecialGroupBulletPoint[];
}