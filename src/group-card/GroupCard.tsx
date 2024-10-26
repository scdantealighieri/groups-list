import { Group } from "../models/group";
import styles from "./GroupCard.module.css";

export const GroupCard = ({ group }: { group: Group }) => {
  const dayMapping: { [key: string]: string } = {
    pon: "poniedziałek",
    wto: "wtorek",
    sro: "środa",
    czw: "czwartek",
    pia: "piątek",
    sob: "sobota",
    nie: "niedziela",
  };

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
