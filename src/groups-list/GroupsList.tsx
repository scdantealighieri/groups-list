import { useEffect, useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { GroupsFilter } from "../group-filter/GroupsFilter";
import { Group } from "../models/group";
import { Filter } from "../models/filter";

import styles from "./GroupsList.module.css";
import { mapGroupHoursToPeriod } from "../services/group-service";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);

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

  return (
    <div className={styles.listContainer}>
      <div className={styles.filters}>
        <GroupsFilter groups={groups} filterGroups={filterGroups} />
      </div>
      <div className={styles.groupList}>
        {filteredGroups.map((group) => (
          <GroupCard group={group} key={group.groupId} />
        ))}
      </div>
    </div>
  );
};
