import { useEffect, useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { GroupsFilter } from "../group-filter/GroupsFilter";
import { Group } from "../models/group";
import { Filter } from "../models/filter";

import styles from "./GroupsList.module.css";
import { mapGroupHoursToPeriod } from "../services/group-service";
import { GroupDetails } from "../models/group-details";
import { GroupDetailsModal } from "../group-details/GroupDetailsModal";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (filter.groupPeriod !== "") {
      filteredGroups = filteredGroups.filter(
        (group) =>
          mapGroupHoursToPeriod(group.groupHours) === filter.groupPeriod
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
      setGroupDetails(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGroupDetails(null);
  };

  const showModal = async (groupId: string) => {
    await fetchGroupDetails(groupId);
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.filters}>
        <GroupsFilter groups={groups} filterGroups={filterGroups} />
      </div>
      <div className={styles.groupList}>
        {filteredGroups.map((group) => (
          <GroupCard
            group={group}
            onShowModal={showModal}
            key={group.groupId}
          />
        ))}
      </div>
      {isModalOpen && groupDetails && (
        <GroupDetailsModal groupDetails={groupDetails} onClose={closeModal} />
      )}
    </div>
  );
};
