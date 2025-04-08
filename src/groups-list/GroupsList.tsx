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
import { ExternalFormModal } from "../sign-in-modal/ExternalFormModal";
import { FilterTabs } from "../enums/filter-tabs";
import { GroupSort } from "../group-sort/GroupSort";
import { GroupSortType } from "../enums/group-sort-type";

import styles from "./GroupsList.module.css";
import { ListDisplayType } from "../enums/list-display-type";
import { GroupsTable } from "../groups-table/GroupsTable";
import { fetchGroup } from "../api/groups-api";
import { SpecialGroup } from "../models/special-group";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(groups);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState(FilterTabs.None);
  const [selectedSortType, setSelectedSortType] = useState<GroupSortType>(
    GroupSortType.Level
  );
  const [selectedListDisplayType, setSelectedListDisplayType] =
    useState<ListDisplayType>(ListDisplayType.Grid);
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
      filteredGroups = filteredGroups.filter(
        (group) =>
          filter.groupType.includes(group.groupType) || group.groupAlwaysVisible
      );
    }

    if (filter.groupLevel.length > 0) {
      filteredGroups = filteredGroups.filter(
        (group) =>
          filter.groupLevel.includes(group.groupLevel) ||
          group.groupAlwaysVisible
      );
    }

    if (filter.groupDays.length > 0) {
      filteredGroups = filteredGroups.filter((group) =>
        filter.groupDays.some(
          (day) =>
            group.groupDays.split("-").includes(day as string) ||
            group.groupAlwaysVisible
        )
      );
    }

    if (filter.groupLector.length > 0) {
      filteredGroups = filteredGroups.filter(
        (group) =>
          filter.groupLector.includes(group.groupLector) ||
          group.groupAlwaysVisible
      );
    }

    if (filter.groupPeriod.length > 0) {
      filteredGroups = filteredGroups.filter(
        (group) =>
          filter.groupPeriod.includes(
            mapGroupHoursToPeriod(group.groupHours)
          ) || group.groupAlwaysVisible
      );
    }

    if (filter.groupState.length > 0) {
      filteredGroups = filteredGroups.filter(
        (group) =>
          filter.groupState.includes(group.groupState) ||
          group.groupAlwaysVisible
      );
    }

    sort(selectedSortType, filteredGroups);
  };

  const fetchGroupDetails = async (groupId: string) => {
    const group = groups.find((group) => group.groupId === groupId);

    if (group && group instanceof SpecialGroup) {
      setGroupDetails(group.details);
      return;
    }

    const data = await fetchGroup(groupId);
    setGroupDetails(data);
  };

  const closeGroupDetails = () => {
    setIsGroupDetailsOpen(false);
    if (isSignInOpen) {
      setGroupDetails(null);
      setIsSignInOpen(false);
    }

    if (isNotifyOpen) {
      setGroupDetails(null);
      setIsNotifyOpen(false);
    }
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

    if (!isGroupDetailsOpen) {
      setGroupDetails(null);
    }
  };

  const onShowNotify = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setIsNotifyOpen(true);
  };

  const closeNotify = () => {
    setIsNotifyOpen(false);

    if (!isGroupDetailsOpen) {
      setGroupDetails(null);
    }
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
    let sortedGroups: Group[] = [];
    const specialGroups = groupsToSort.filter(
      (group) => group instanceof SpecialGroup
    );
    const nonSpecialGroups = groupsToSort.filter(
      (group) => !(group instanceof SpecialGroup)
    );
    switch (sortBy) {
      case GroupSortType.Level:
        sortedGroups =
          [...nonSpecialGroups].sort((a, b) =>
            a.groupShortName.localeCompare(b.groupShortName)
          );
        break;
      case GroupSortType.Day:
        sortedGroups =
          [...nonSpecialGroups].sort(
            (a, b) =>
              dayMappingToNumber[a.groupDays.split("-")[0]] -
              dayMappingToNumber[b.groupDays.split("-")[0]]
          );
        break;
      case GroupSortType.StartDate:
        sortedGroups =
          [...nonSpecialGroups].sort(
            (a, b) =>
              parseDateToNumber(a.groupFirstMeet) -
              parseDateToNumber(b.groupFirstMeet)
          );
        break;
      case GroupSortType.Lector:
        sortedGroups =
          [...nonSpecialGroups].sort((a, b) =>
            a.groupLector.localeCompare(b.groupLector)
          );
        break;
    }
    setFilteredGroups([...sortedGroups, ...specialGroups]);
  };

  const isSpecialGroup = (groupId: string) => {
    const group = groups.find((group) => group.groupId === groupId);
    return group && group instanceof SpecialGroup;
  }

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
        <div className={styles.displayTypeContainer}>
          <div
            className={`${styles.displayTypeItem} ${selectedListDisplayType === ListDisplayType.Grid
              ? styles.selected
              : ""
              }`}
            onClick={() => setSelectedListDisplayType(ListDisplayType.Grid)}
          >
            Kafelki
          </div>
          <div
            className={`${styles.displayTypeItem} ${selectedListDisplayType === ListDisplayType.List
              ? styles.selected
              : ""
              }`}
            onClick={() => setSelectedListDisplayType(ListDisplayType.List)}
          >
            Lista
          </div>
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
        ) : selectedListDisplayType === ListDisplayType.List ? (
          <GroupsTable
            groups={filteredGroups}
            onShowGroupDetails={onShowGroupDetails}
            onShowSignIn={onShowSignIn}
          ></GroupsTable>
        ) : (
          <div className={styles.groupList}>
            {filteredGroups.map((group) => (
              <GroupCard
                group={group}
                onShowGroupDetails={onShowGroupDetails}
                onShowSignIn={onShowSignIn}
                onShowNotify={onShowNotify}
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
          showNotifyModal={onShowNotify}
        />
      )}
      {isSignInOpen && groupDetails && groupDetails.groupId === "-1" && (
        <ExternalFormModal
          groupDetails={groupDetails}
          onClose={closeSignIn}
          formSectionId="signInIndividualFormSection"
        />
      )}
      {isSignInOpen && groupDetails && groupDetails.groupId === "-2" && (
        <ExternalFormModal
          groupDetails={groupDetails}
          onClose={closeSignIn}
          formSectionId="signInDuettoFormSection"
        />
      )}
      {isSignInOpen &&
        groupDetails &&
        !isSpecialGroup(groupDetails.groupId) && (
          <ExternalFormModal
            groupDetails={groupDetails}
            onClose={closeSignIn}
            formSectionId="signInFormSection"
          />
        )}
      {isNotifyOpen && groupDetails && (
        <ExternalFormModal
          groupDetails={groupDetails}
          onClose={closeNotify}
          formSectionId="notifyFormSection"
        />
      )}
    </div>
  );
};
