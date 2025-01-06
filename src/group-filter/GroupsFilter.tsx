import { useState } from "react";
import { FilterType } from "../enums/filter-type";
import { Filter } from "../models/filter";
import { Group } from "../models/group";
import {
  convertToOptions,
  dayMapping,
  dayOrder,
  mapGroupHoursToPeriod,
  mapGroupState,
  periodOrder,
} from "../services/group-service";

import styles from "./GroupsFilter.module.css";
import { MultiSelect } from "react-multi-select-component";
import { FilterDropdownOption } from "../models/filter-dropdown-option";
import { GroupState } from "../enums/group-state";

export const GroupsFilter = ({
  groups,
  filterGroups,
}: {
  groups: Group[];
  filterGroups: (filter: Filter) => void;
}) => {
  const [filter, setFilter] = useState<Filter>({
    groupDays: [],
    groupLector: [],
    groupLevel: [],
    groupType: [],
    groupPeriod: [],
    groupState: [],
  });
  const [isFiltersListVisible, setIsFiltersListVisible] = useState(false);

  const toggleFiltersListVisibility = () => {
    setIsFiltersListVisible(!isFiltersListVisible);
  };

  const groupTypes = Array.from(
    new Set(groups.map((group) => group.groupType))
  );

  const groupStates = [GroupState.Active, GroupState.Icoming];

  const groupLevels = Array.from(
    new Set(groups.map((group) => group.groupLevel))
  );

  const groupDays = ["pon", "wto", "sro", "czw", "pia", "sob"];

  const groupLectors = Array.from(
    new Set(groups.map((group) => group.groupLector))
  );

  const groupPeriods = Array.from(
    new Set(groups.map((group) => mapGroupHoursToPeriod(group.groupHours)))
  ).sort((a, b) => periodOrder.indexOf(a) - periodOrder.indexOf(b));

  const filterList = (filterType: FilterType, value: string) => {
    const idx = filter[filterType].indexOf(value);

    if (idx === -1) {
      filter[filterType].push(value);
    } else {
      filter[filterType].splice(idx, 1);
    }

    setFilter({ ...filter });
    filterGroups(filter);
  };

  const constFilterListByArray = (
    filterType: FilterType,
    value: FilterDropdownOption[]
  ) => {
    filter[filterType] = value.map((option) => option.value) as (
      | string
      | undefined
    )[];
    setFilter({ ...filter });
    filterGroups(filter);
  };

  const isSelected = (filterType: FilterType, value: string): boolean => {
    return filter[filterType].includes(value);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterMobileContainer}>
        <div
          className={styles.filtersButton}
          onClick={toggleFiltersListVisibility}
        >
          <span className="material-symbols-outlined">tune</span>
          <span>Filtry</span>
        </div>
        <div
          className={
            isFiltersListVisible
              ? styles.filtersListsContainer
              : styles.filtersListsContainerHidden
          }
        >
          <div className={styles.filterLists}>
            <MultiSelect
              options={convertToOptions(groupTypes)}
              value={convertToOptions(filter.groupType)}
              labelledBy={"Wybierz tryb nauki"}
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie tryby nauki zostały wybrane",
                selectSomeItems: "Wybierz tryb nauki",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupType, selected)
              }
            />
            <MultiSelect
              options={convertToOptions(groupLevels)}
              value={convertToOptions(filter.groupLevel)}
              className="group-filters-multi-select"
              labelledBy={"Wybierz poziom zajęć"}
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie poziomy zajęć zostały wybrane",
                selectSomeItems: "Wybierz poziom zajęć",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupLevel, selected)
              }
            />
            <MultiSelect
              options={convertToOptions(groupDays, (day) => dayMapping[day])}
              value={convertToOptions(
                filter.groupDays,
                (day) => dayMapping[day]
              )}
              className="group-filters-multi-select"
              labelledBy={"Wybierz dzień tygodnia"}
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie dni tygodnia zostały wybrane",
                selectSomeItems: "Wybierz dzień tygodnia",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupDays, selected)
              }
            />
            <MultiSelect
              options={convertToOptions(groupPeriods)}
              value={convertToOptions(filter.groupPeriod)}
              className="group-filters-multi-select"
              labelledBy={"Wybierz porę dnia"}
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie pory dnia zostały wybrane",
                selectSomeItems: "Wybierz porę dnia",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupPeriod, selected)
              }
            />
            <MultiSelect
              options={convertToOptions(groupStates, (val) =>
                mapGroupState(val as GroupState)
              )}
              value={convertToOptions(filter.groupState, (val) =>
                mapGroupState(val as GroupState)
              )}
              className="group-filters-multi-select"
              labelledBy={"Wybierz datę rozpoczęcia"}
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              overrideStrings={{
                allItemsAreSelected:
                  "Wszystkie daty rozpoczęcia zostały wybrane",
                selectSomeItems: "Wybierz datę rozpoczęcia",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupState, selected)
              }
            />
            <MultiSelect
              options={convertToOptions(groupLectors)}
              value={convertToOptions(filter.groupLector)}
              className="group-filters-multi-select"
              labelledBy={"Wybierz lektora"}
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              overrideStrings={{
                allItemsAreSelected: "Wszyscy lektorzy zostali wybrani",
                selectSomeItems: "Wybierz lektora",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupLector, selected)
              }
            />
          </div>
          <div
            className={styles.acceptFiltersButton}
            onClick={toggleFiltersListVisibility}
          >
            Potwierdź zmiany
          </div>
        </div>
      </div>
      <div className={styles.filterDesktopContainer}>
        <div className={styles.filterLine}>
          <label className={styles.filterTitle}>Tryb nauki</label>
          <div className={styles.filterOptionsContainer}>
            {groupTypes.map((groupType) => (
              <div
                key={groupType}
                onClick={() => filterList(FilterType.GroupType, groupType)}
                className={`${styles.filterOption} ${
                  isSelected(FilterType.GroupType, groupType)
                    ? styles.selected
                    : ""
                }`}
              >
                {groupType}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterLine}>
          <label className={styles.filterTitle}>Poziom zajęć</label>
          <div className={styles.filterOptionsContainer}>
            {groupLevels.map((groupLevel) => (
              <div
                key={groupLevel}
                onClick={() => filterList(FilterType.GroupLevel, groupLevel)}
                className={`${styles.filterOption} ${
                  isSelected(FilterType.GroupLevel, groupLevel)
                    ? styles.selected
                    : ""
                }`}
              >
                {groupLevel}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterLine}>
          <label className={styles.filterTitle}>Dzień tygodnia</label>
          <div className={styles.filterOptionsContainer}>
            {groupDays.map((groupDay) => (
              <div
                key={groupDay}
                onClick={() => filterList(FilterType.GroupDays, groupDay)}
                className={`${styles.filterOption} ${
                  isSelected(FilterType.GroupDays, groupDay)
                    ? styles.selected
                    : ""
                }`}
              >
                {dayMapping[groupDay]}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterLine}>
          <label className={styles.filterTitle}>Pora dnia</label>
          <div className={styles.filterOptionsContainer}>
            {groupPeriods.map((groupPeriod) => (
              <div
                key={groupPeriod}
                onClick={() => filterList(FilterType.GroupPeriod, groupPeriod)}
                className={`${styles.filterOption} ${
                  isSelected(FilterType.GroupPeriod, groupPeriod)
                    ? styles.selected
                    : ""
                }`}
              >
                {groupPeriod}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterLine}>
          <label className={styles.filterTitle}>Data rozpoczęcia</label>
          <div className={styles.filterOptionsContainer}>
            {groupStates.map((groupState) => (
              <div
                key={groupState}
                onClick={() => filterList(FilterType.GroupState, groupState)}
                className={`${styles.filterOption} ${
                  isSelected(FilterType.GroupState, groupState)
                    ? styles.selected
                    : ""
                }`}
              >
                {mapGroupState(groupState)}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filterLine}>
          <label className={styles.filterTitle}>Lektor</label>
          <div className={styles.filterOptionsContainer}>
            {groupLectors.map((groupLector) => (
              <div
                key={groupLector}
                onClick={() => filterList(FilterType.GroupLector, groupLector)}
                className={`${styles.filterOption} ${
                  isSelected(FilterType.GroupLector, groupLector)
                    ? styles.selected
                    : ""
                }`}
              >
                {groupLector}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
