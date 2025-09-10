import { GroupState } from "../enums/group-state";
import { GroupType } from "../enums/group-type";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";
import { Lector } from "../models/lector";

const domain = () =>
  process.env.NODE_ENV === "development"
    ? ""
    : "https://dantealighieri.appblue.pl";

export async function fetchGroups(): Promise<Group[]> {
  try {
    const response = await fetch(`${domain()}/api/get_groups.php`);
    const rawData = await response.json();

    rawData.forEach((group: any) => {
      if (Date.parse(group.groupFirstMeet) > Date.now()) {
        group.groupState = GroupState.Icoming;
      } else {
        group.groupState = GroupState.Active;
      }

      if (group.groupType === GroupType.OnSite) {
        group.groupCityOrType = group.groupCity;
      } else {
        group.groupCityOrType = group.groupType;
      }

      group.groupForKids = group.groupForKids === "1";
    });

    return rawData as Group[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function fetchGroup(
  groupId: string
): Promise<GroupDetails | null> {
  try {
    const response = await fetch(`${domain()}/api/get_group_details.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ id: groupId }).toString(),
    });
    const data: GroupDetails = (await response.json())[0];

    data.groupId = groupId;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchLectors(): Promise<Lector[]> {
  try {
    const response = await fetch(`${domain()}/api/get_lectors.php`);
    const data: Lector[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
