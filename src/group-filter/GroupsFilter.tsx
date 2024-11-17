import { useState } from "react";
import { FilterType } from "../enums/filter-type";
import { Filter } from "../models/filter";
import { Group } from "../models/group";
import {
  dayMapping,
  dayOrder,
  mapGroupHoursToPeriod,
  periodOrder,
} from "../services/group-service";

import styles from "./GroupsFilter.module.css";

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
  });

  const groupTypes = Array.from(
    new Set(groups.map((group) => group.groupType))
  );

  const groupLevels = Array.from(
    new Set(groups.map((group) => group.groupLevel))
  );

  const groupDays = Array.from(
    new Set(groups.flatMap((group) => group.groupDays.split("-")))
  ).sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

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

  const isSelected = (filterType: FilterType, value: string): boolean => {
    return filter[filterType].includes(value);
  };

  return (
    <div className={styles.filterContainer}>
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
  );
};
