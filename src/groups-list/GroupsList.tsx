import { useEffect, useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { GroupsFilter } from "../group-filter/GroupsFilter";
import { Group } from "../models/group";
import { Filter } from "../models/filter";

import styles from "./GroupsList.module.css";
import { mapGroupHoursToPeriod } from "../services/group-service";
import { GroupDetails } from "../models/group-details";
import { GroupDetailsModal } from "../group-details/GroupDetailsModal";
import { SignInModal } from "../sign-in-modal/SignInModal";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  const filterGroups = (filter: Filter) => {
    let filteredGroups = groups;

    if (filter.groupType.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupType.includes(group.groupType)
      );
    }

    if (filter.groupLevel.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupLevel.includes(group.groupLevel)
      );
    }

    if (filter.groupDays.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupDays.some((day) =>
          group.groupDays.split("-").includes(day as string)
        )
      );
    }

    if (filter.groupLector.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupLector.includes(group.groupLector)
      );
    }

    if (filter.groupPeriod.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupPeriod.includes(mapGroupHoursToPeriod(group.groupHours))
      );
    }

    if (filter.groupState.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupState.includes(group.groupState)
      );
    }

    setFilteredGroups(filteredGroups);
  };

  const fetchGroupDetails = async (groupId: string) => {
    try {
      const response = await fetch(
        "https://dantealighieri.appblue.pl/api/get_group_details.php",
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
      setGroupDetails(data);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  const closeGroupDetails = () => {
    setIsGroupDetailsOpen(false);
    setGroupDetails(null);
  };

  const onShowGroupDetails = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setIsGroupDetailsOpen(true);
  };

  const onShowSignIn = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setIsSignInOpen(true);
  };

  const closeSignIn = () => {
    setIsSignInOpen(false);
    setGroupDetails(null);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.filters}>
        <GroupsFilter groups={groups} filterGroups={filterGroups} />
      </div>

      <div className={styles.groupsListContainer}>
        {filteredGroups.length === 0 ? (
          <div className={styles.noGroups}>
            Brak grup dla wybranych kryteriów
          </div>
        ) : (
          <div className={styles.groupList}>
            {filteredGroups.map((group) => (
              <GroupCard
                group={group}
                onShowGroupDetails={onShowGroupDetails}
                onShowSignIn={onShowSignIn}
                key={group.groupId}
              />
            ))}
          </div>
        )}
      </div>

      {isGroupDetailsOpen && groupDetails && (
        <GroupDetailsModal
          groupDetails={groupDetails}
          onClose={closeGroupDetails}
          showSignInModal={onShowSignIn}
        />
      )}
      {isSignInOpen && groupDetails && (
        <SignInModal groupDetails={groupDetails} onClose={closeSignIn} />
      )}
    </div>
  );
};
