import { useState } from "react";
import { FilterType } from "../enums/filter-type";
import { Filter } from "../models/filter";
import { Group } from "../models/group";
import {
  convertToOptions,
  dayMapping,
  mapGroupHoursToPeriod,
  mapGroupState,
  periodOrder,
} from "../services/group-service";

import styles from "./GroupsFilter.module.css";
import { MultiSelect } from "react-multi-select-component";
import { FilterDropdownOption } from "../models/filter-dropdown-option";
import { GroupState } from "../enums/group-state";
import { Lector } from "../models/lector";

export const GroupsFilter = ({
  groups,
  filterGroups,
  handleSetFilter,
  filter,
  lectors,
}: {
  groups: Group[];
  filterGroups: (filter: Filter) => void;
  handleSetFilter: (filter: Filter) => void;
  filter: Filter;
  lectors: Lector[];
}) => {
  const [isFiltersListVisible, setIsFiltersListVisible] = useState(false);

  const toggleFiltersListVisibility = () => {
    setIsFiltersListVisible(!isFiltersListVisible);
  };

  const groupLocations = Array.from(
    new Set(
      groups
        .filter((group) => group.groupCityOrType && !group.groupAlwaysVisible)
        .map((group) => group.groupCityOrType)
    )
  );

  const groupStates = [GroupState.Active, GroupState.Icoming];

  const groupLevels = Array.from(
    new Set(
      groups
        .filter((group) => group.groupLevel)
        .map((group) => group.groupLevel)
    )
  );

  const groupDays = ["pon", "wto", "sro", "czw", "pia", "sob"];

  const groupLectors = lectors.map(
    (lector) => `${lector.lectorFirstName} ${lector.lectorLastName}`
  );

  const groupPeriods = Array.from(
    new Set(
      groups
        .filter((group) => group.groupHours)
        .map((group) => mapGroupHoursToPeriod(group.groupHours))
    )
  ).sort((a, b) => periodOrder.indexOf(a) - periodOrder.indexOf(b));

  const constFilterListByArray = (
    filterType: FilterType,
    value: FilterDropdownOption[]
  ) => {
    const updatedFilter = {
      ...filter,
      [filterType]: value.map((option) => option.value) as (
        | string
        | undefined
      )[],
    };

    handleSetFilter(updatedFilter);
    filterGroups(updatedFilter);
  };

  const clearFilters = () => {
    const emptyFilter: Filter = {
      groupType: [],
      groupLevel: [],
      groupDays: [],
      groupPeriod: [],
      groupState: [],
      groupLector: [],
    };

    handleSetFilter(emptyFilter);
    filterGroups(emptyFilter);
  };

  const renderFilterLabel = (label: string) => (selected: any[]) => {
    const count = selected.length;

    return (
      <span className={styles.filterValue}>
        <span>{label}</span>
        {count > 0 && <span className={styles.filterCount}>{count}</span>}
      </span>
    );
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
              options={convertToOptions(groupLocations)}
              value={convertToOptions(filter.groupType)}
              labelledBy="Wszystkie lokalizacje"
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              valueRenderer={renderFilterLabel("Wszystkie lokalizacje")}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie lokalizacje",
                selectSomeItems: "Wszystkie lokalizacje",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupType, selected)
              }
            />

            <MultiSelect
              options={convertToOptions(groupLevels)}
              value={convertToOptions(filter.groupLevel)}
              labelledBy="Poziom"
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              valueRenderer={renderFilterLabel("Poziom")}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie poziomy",
                selectSomeItems: "Poziom",
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
              labelledBy="Dzień tygodnia"
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              valueRenderer={renderFilterLabel("Dzień tygodnia")}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie dni tygodnia",
                selectSomeItems: "Dzień tygodnia",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupDays, selected)
              }
            />

            <MultiSelect
              options={convertToOptions(groupPeriods)}
              value={convertToOptions(filter.groupPeriod)}
              labelledBy="Godzina"
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              valueRenderer={renderFilterLabel("Godzina")}
              overrideStrings={{
                allItemsAreSelected: "Wszystkie godziny",
                selectSomeItems: "Godzina",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupPeriod, selected)
              }
            />

            <MultiSelect
              options={convertToOptions(groupLectors)}
              value={convertToOptions(filter.groupLector)}
              labelledBy="Lektor"
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              valueRenderer={renderFilterLabel("Lektor")}
              overrideStrings={{
                allItemsAreSelected: "Wszyscy lektorzy",
                selectSomeItems: "Lektor",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupLector, selected)
              }
            />

            <MultiSelect
              options={convertToOptions(groupStates, (val) =>
                mapGroupState(val as GroupState)
              )}
              value={convertToOptions(filter.groupState, (val) =>
                mapGroupState(val as GroupState)
              )}
              labelledBy="Wybierz datę rozpoczęcia"
              className="group-filters-multi-select"
              disableSearch={true}
              hasSelectAll={false}
              ClearSelectedIcon={null}
              valueRenderer={renderFilterLabel("Data rozpoczęcia")}
              overrideStrings={{
                allItemsAreSelected:
                  "Wszystkie daty rozpoczęcia zostały wybrane",
                selectSomeItems: "Wybierz datę rozpoczęcia",
              }}
              onChange={(selected: any) =>
                constFilterListByArray(FilterType.GroupState, selected)
              }
            />
          </div>

          <div className={styles.mobileFilterActions}>
  <button
    type="button"
    className={styles.clearMobileFiltersButton}
    onClick={clearFilters}
  >
    Anuluj wszystkie filtry
  </button>

  <div
    className={styles.acceptFiltersButton}
    onClick={toggleFiltersListVisibility}
  >
    Potwierdź zmiany
  </div>
</div>
        </div>
      </div>

      <div className={styles.filterDesktopContainer}>
        <MultiSelect
          options={convertToOptions(groupLocations)}
          value={convertToOptions(filter.groupType)}
          labelledBy="Wszystkie lokalizacje"
          className="group-filters-multi-select desktop-filter-select"
          disableSearch={true}
          hasSelectAll={false}
          ClearSelectedIcon={null}
          valueRenderer={renderFilterLabel("Wszystkie lokalizacje")}
          overrideStrings={{
            allItemsAreSelected: "Wszystkie lokalizacje",
            selectSomeItems: "Wszystkie lokalizacje",
          }}
          onChange={(selected: any) =>
            constFilterListByArray(FilterType.GroupType, selected)
          }
        />

        <MultiSelect
          options={convertToOptions(groupLevels)}
          value={convertToOptions(filter.groupLevel)}
          labelledBy="Poziom"
          className="group-filters-multi-select desktop-filter-select"
          disableSearch={true}
          hasSelectAll={false}
          ClearSelectedIcon={null}
          valueRenderer={renderFilterLabel("Poziom")}
          overrideStrings={{
            allItemsAreSelected: "Wszystkie poziomy",
            selectSomeItems: "Poziom",
          }}
          onChange={(selected: any) =>
            constFilterListByArray(FilterType.GroupLevel, selected)
          }
        />

        <MultiSelect
          options={convertToOptions(groupDays, (day) => dayMapping[day])}
          value={convertToOptions(filter.groupDays, (day) => dayMapping[day])}
          labelledBy="Dzień tygodnia"
          className="group-filters-multi-select desktop-filter-select"
          disableSearch={true}
          hasSelectAll={false}
          ClearSelectedIcon={null}
          valueRenderer={renderFilterLabel("Dzień tygodnia")}
          overrideStrings={{
            allItemsAreSelected: "Wszystkie dni tygodnia",
            selectSomeItems: "Dzień tygodnia",
          }}
          onChange={(selected: any) =>
            constFilterListByArray(FilterType.GroupDays, selected)
          }
        />

        <MultiSelect
          options={convertToOptions(groupPeriods)}
          value={convertToOptions(filter.groupPeriod)}
          labelledBy="Godzina"
          className="group-filters-multi-select desktop-filter-select"
          disableSearch={true}
          hasSelectAll={false}
          ClearSelectedIcon={null}
          valueRenderer={renderFilterLabel("Godzina")}
          overrideStrings={{
            allItemsAreSelected: "Wszystkie godziny",
            selectSomeItems: "Godzina",
          }}
          onChange={(selected: any) =>
            constFilterListByArray(FilterType.GroupPeriod, selected)
          }
        />

        <MultiSelect
          options={convertToOptions(groupLectors)}
          value={convertToOptions(filter.groupLector)}
          labelledBy="Lektor"
          className="group-filters-multi-select desktop-filter-select"
          disableSearch={true}
          hasSelectAll={false}
          ClearSelectedIcon={null}
          valueRenderer={renderFilterLabel("Lektor")}
          overrideStrings={{
            allItemsAreSelected: "Wszyscy lektorzy",
            selectSomeItems: "Lektor",
          }}
          onChange={(selected: any) =>
            constFilterListByArray(FilterType.GroupLector, selected)
          }
        />

        <button
          type="button"
          className={styles.clearFiltersButton}
          onClick={clearFilters}
        >
          <span className="material-symbols-outlined">sync</span>
          Wyczyść filtry
        </button>
      </div>
    </div>
  );
};