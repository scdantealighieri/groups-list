import { useEffect, useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { GroupsFilter } from "../group-filter/GroupsFilter";
import { Group } from "../models/group";
import { Filter } from "../models/filter";
import {
  dayMappingToNumber,
  mapGroupHoursToPeriod,
  parseDateToNumber,
} from "../services/group-service";
import { GroupDetails } from "../models/group-details";
import { GroupDetailsModal } from "../group-details/GroupDetailsModal";
import { SignInModal } from "../sign-in-modal/SignInModal";
import { FilterTabs } from "../enums/filter-tabs";
import { GroupSort } from "../group-sort/GroupSort";
import { GroupSortType } from "../enums/group-sort-type";

import styles from "./GroupsList.module.css";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState(FilterTabs.None);
  const [selectedSortType, setSelectedSortType] = useState<GroupSortType>(
    GroupSortType.Level
  );
  const [filter, setFilter] = useState<Filter>({
    groupDays: [],
    groupLector: [],
    groupLevel: [],
    groupType: [],
    groupPeriod: [],
    groupState: [],
  });

  useEffect(() => {
    sort(GroupSortType.Level, groups);
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

    sort(selectedSortType, filteredGroups);
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

  const onToggleFilterTab = (tab: FilterTabs) => {
    if (selectedFilterTab === tab) {
      setSelectedFilterTab(FilterTabs.None);
    } else {
      setSelectedFilterTab(tab);
    }
  };

  const onToggleSort = (type: GroupSortType) => {
    let sortBy = GroupSortType.Level;

    if (selectedSortType === type) {
      setSelectedSortType(GroupSortType.Level);
    } else {
      setSelectedSortType(type);
      sortBy = type;
    }

    sort(sortBy, filteredGroups);
  };

  const sort = (sortBy: GroupSortType, groupsToSort: Group[]) => {
    switch (sortBy) {
      case GroupSortType.Level:
        setFilteredGroups(
          [...groupsToSort].sort((a, b) =>
            a.groupShortName.localeCompare(b.groupShortName)
          )
        );
        break;
      case GroupSortType.Day:
        setFilteredGroups(
          [...groupsToSort].sort(
            (a, b) =>
              dayMappingToNumber[a.groupDays.split("-")[0]] -
              dayMappingToNumber[b.groupDays.split("-")[0]]
          )
        );
        break;
      case GroupSortType.StartDate:
        setFilteredGroups(
          [...groupsToSort].sort(
            (a, b) =>
              parseDateToNumber(a.groupFirstMeet) -
              parseDateToNumber(b.groupFirstMeet)
          )
        );
        break;
      case GroupSortType.Lector:
        setFilteredGroups(
          [...groupsToSort].sort((a, b) =>
            a.groupLector.localeCompare(b.groupLector)
          )
        );
        break;
    }
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.toolbar}>
        <div
          className={styles.toolbarItem}
          onClick={() => onToggleFilterTab(FilterTabs.Filters)}
        >
          <span className="material-symbols-outlined">tune</span>
          Filtry
        </div>
        <div
          className={styles.toolbarItem}
          onClick={() => onToggleFilterTab(FilterTabs.Sort)}
        >
          <span className="material-symbols-outlined">swap_vert</span>
          Sortuj
        </div>
      </div>
      <div className={styles.toolbarTab}>
        {selectedFilterTab === FilterTabs.Filters && (
          <div className={styles.filters}>
            <GroupsFilter
              groups={groups}
              filterGroups={filterGroups}
              handleSetFilter={setFilter}
              filter={filter}
            />
          </div>
        )}
        {selectedFilterTab === FilterTabs.Sort && (
          <div className={styles.sort}>
            <GroupSort
              onSortChange={onToggleSort}
              sortType={selectedSortType}
            ></GroupSort>
          </div>
        )}
      </div>
      <div className={`${styles.filters} ${styles.filtersMobile}`}>
        <GroupsFilter
          groups={groups}
          filterGroups={filterGroups}
          handleSetFilter={setFilter}
          filter={filter}
        />
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
