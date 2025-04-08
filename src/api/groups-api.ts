import { GroupState } from "../enums/group-state";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";

const domain = () => process.env.NODE_ENV === "development" ? "" : "https://dantealighieri.appblue.pl"

export async function fetchGroups(): Promise<Group[]> {
    try {
        const response = await fetch(
            `${domain()}/api/get_groups.php`
        );
        const data = (await response.json()) as Group[];

        data.forEach((group) => {
            if (Date.parse(group.groupFirstMeet) > Date.now()) {
                group.groupState = GroupState.Icoming;
            } else {
                group.groupState = GroupState.Active;
            }
        });

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export async function fetchGroup(groupId: string): Promise<GroupDetails | null> {
    try {
        const response = await fetch(
            `${domain()}/api/get_group_details.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ id: groupId }).toString(),
            }
        );
        const data: GroupDetails = (await response.json())[0];

        data.groupId = groupId;

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}