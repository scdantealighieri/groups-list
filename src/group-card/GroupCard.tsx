import { Group } from "../models/group";
import { dayMapping } from "../services/group-service";
import styles from "./GroupCard.module.css";

export const GroupCard = ({ group }: { group: Group }) => {
  
  const getFormattedGroupDays = (groupDays: string): string => {
    return groupDays
      .split("-")
      .map((day) => dayMapping[day] || day)
      .join("-");
  };

  const getFormattedGroupHours = (groupHours: string): string => {
    return groupHours.split("$")[0];
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupType}>{group.groupType}</div>
      <div className={styles.groupLevel}>{group.groupLevel}</div>
      <div className={styles.groupDays}>
        {getFormattedGroupDays(group.groupDays)}{" "}
        {getFormattedGroupHours(group.groupHours)}
      </div>
      <div className={styles.groupLector}>{group.groupLector}</div>
      <div className={styles.showMoreBtn}>więcej info →</div>
    </div>
  );
};
