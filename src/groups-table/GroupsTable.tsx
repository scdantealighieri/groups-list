import { Group } from "../models/group";
import { dayMappingShort } from "../services/group-service";
import { useState } from "react";

import styles from "./GroupsTable.module.css";

type SortColumn = 'level' | 'day' | 'hour' | 'lector' | 'type' | null;
type SortDirection = 'asc' | 'desc' | null;

export const GroupsTable = ({
  groups,
  onShowGroupDetails,
  onShowSignIn,
  onShowNotify,
}: {
  groups: Group[];
  onShowGroupDetails: (groupId: string) => Promise<void>;
  onShowSignIn: (groupId: string) => Promise<void>;
  onShowNotify: (groupId: string) => Promise<void>;
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection('desc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const getSortedGroups = () => {
    const regularGroups = groups.filter(group => !!group.groupDays);
    const specialGroups = groups.filter(group => !group.groupDays);

    const sortedRegularGroups = !sortColumn || !sortDirection
      ? regularGroups
      : [...regularGroups].sort((a, b) => {
        let valueA: string;
        let valueB: string;

        switch (sortColumn) {
          case 'level':
            valueA = a.groupShortName;
            valueB = b.groupShortName;
            break;
          case 'day':
            valueA = a.groupDays || '';
            valueB = b.groupDays || '';
            break;
          case 'hour':
            valueA = a.groupHours ? a.groupHours.split('$')[0] : '';
            valueB = b.groupHours ? b.groupHours.split('$')[0] : '';
            break;
          case 'lector':
            valueA = a.groupLector;
            valueB = b.groupLector;
            break;
          case 'type':
            valueA = a.groupType;
            valueB = b.groupType;
            break;
          default:
            return 0;
        }

        const compareResult = valueA.localeCompare(valueB);
        return sortDirection === 'asc' ? compareResult : -compareResult;
      });

    return [...sortedRegularGroups, ...specialGroups];
  };

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return null;
    }

    return (
      <span className={`material-symbols-outlined ${styles.sortIcon}`}>
        {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
      </span>
    );
  };

  const sortedGroups = getSortedGroups();

  return (
    <div className={styles.groupsTable}>
      <div className={styles.tableHeader}>
        <div
          className={`${styles.firstColumn} ${styles.levelHeader}}`}
          onClick={() => handleSort('level')}
        >
          POZIOM {renderSortIcon('level')}
        </div>
        <div
          className={styles.dayHeader}
          onClick={() => handleSort('day')}
        >
          DZIEŃ {renderSortIcon('day')}
        </div>
        <div
          className={styles.hourHeader}
          onClick={() => handleSort('hour')}
        >
          GODZINA {renderSortIcon('hour')}
        </div>
        <div
          className={styles.lectorHeader}
          onClick={() => handleSort('lector')}
        >
          NAUCZYCIEL {renderSortIcon('lector')}
        </div>
        <div
          className={styles.typeHeader}
          onClick={() => handleSort('type')}
        >
          TRYB {renderSortIcon('type')}
        </div>
        <div className={`${styles.infoHeader} ${styles.nonSortable}`}>INFO</div>
        <div className={`${styles.signInHeader} ${styles.nonSortable}`}></div>
      </div>
      <div className={styles.tableBody}>
        {sortedGroups.map((group) => (
          <div key={group.groupId} className={styles.tableRow}>
            <div className={`${styles.firstColumn} ${styles.level}`}>
              {group.groupFreePlaces === 0 && <div className={styles.fullTag}>Pełna</div>}
              {group.groupShortName}
            </div>
            {!group.groupDays && (
              <>
                <div className={styles.specialRow}>{group.groupLector}</div>
                <div className={styles.type}>
                  <span className={styles.icon}>
                    <span className="material-symbols-outlined">home</span>
                  </span>

                  <span className={styles.icon}>
                    <span className="material-symbols-outlined">computer</span>
                  </span>
                </div>
              </>
            )}
            {group.groupDays && (
              <>
                {" "}
                <div className={styles.day}>
                  {group.groupDays
                    .split("-")
                    .map((d) => dayMappingShort[d])
                    .join(", ")}
                </div>
                <div className={styles.hour}>
                  {group.groupHours.split("$")[0]}
                </div>
                <div className={styles.lector}>{group.groupLector}</div>{" "}
                <div className={styles.type}>
                  {group.groupType === "stacjonarna" ? (
                    <div className={styles.icon}>
                      <span className="material-symbols-outlined">home</span>
                    </div>
                  ) : (
                    <div className={styles.icon}>
                      <span className="material-symbols-outlined">
                        computer
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            <div
              className={`${styles.icon} ${styles.infoIcon} ${styles.info}`}
              onClick={() => onShowGroupDetails(group.groupId)}
            >
              <span className="material-symbols-outlined">info</span>
            </div>
            {group.groupFreePlaces === 0 ? (
              <div
                className={`${styles.signInBtn} ${styles.danteButton} ${styles.signIn}`}
                onClick={() => onShowNotify(group.groupId)}
              >
                Powiadom mnie
              </div>
            ) : (
              <div
                className={`${styles.signInBtn} ${styles.danteButton} ${styles.signIn}`}
                onClick={() => onShowSignIn(group.groupId)}
              >
                Zapisz się
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
