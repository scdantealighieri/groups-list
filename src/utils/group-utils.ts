import { DuettoGroup } from "../special-groups/duetto-group";
import { IndividualGroup } from "../special-groups/individual-group";

export function isSpecialGroup(groupId: string): boolean {
    return groupId.startsWith("special_");
}

export function isIndividualGroup(groupId: string): boolean {
    return groupId === IndividualGroup.groupId;
}

export function isDuettoGroup(groupId: string): boolean {
    return groupId === DuettoGroup.groupId;
}