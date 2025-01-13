import { GroupSortType } from "../enums/group-sort-type";
import styles from "./GroupSort.module.css";

export const GroupSort = ({
  onSortChange,
  sortType,
}: {
  onSortChange: (sortType: GroupSortType) => void;
  sortType: GroupSortType;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Sortuj według</div>
      <div
        className={`${styles.type} ${
          sortType === GroupSortType.Level ? styles.active : ""
        }`}
        onClick={() => onSortChange(GroupSortType.Level)}
      >
        poziomu
      </div>
      <div
        className={`${styles.type} ${
          sortType === GroupSortType.Day ? styles.active : ""
        }`}
        onClick={() => onSortChange(GroupSortType.Day)}
      >
        dnia tygodnia
      </div>
      <div
        className={`${styles.type} ${
          sortType === GroupSortType.StartDate ? styles.active : ""
        }`}
        onClick={() => onSortChange(GroupSortType.StartDate)}
      >
        daty rozpoczęcia
      </div>
      <div
        className={`${styles.type} ${
          sortType === GroupSortType.Lector ? styles.active : ""
        }`}
        onClick={() => onSortChange(GroupSortType.Lector)}
      >
        nauczyciela
      </div>
    </div>
  );
};
