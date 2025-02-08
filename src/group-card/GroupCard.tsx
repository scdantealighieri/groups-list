import { useEffect, useRef } from "react";
import { Group } from "../models/group";
import { dayMapping } from "../services/group-service";

import styles from "./GroupCard.module.css";

export const GroupCard = ({
  group,
  onShowGroupDetails,
  onShowSignIn,
  onShowNotify,
}: {
  group: Group;
  onShowGroupDetails: (groupId: string) => Promise<void>;
  onShowSignIn: (groupId: string) => Promise<void>;
  onShowNotify: (groupId: string) => Promise<void>;
}) => {
  const groupLevelRef = useRef<HTMLDivElement>(null);
  const cardWidth = 230;

  const getFormattedGroupDays = (groupDays: string): string => {
    return groupDays
      .split("-")
      .map((day) => dayMapping[day] || day)
      .join("-");
  };

  const getFormattedGroupHours = (groupHours: string): string => {
    return groupHours.split("$")[0];
  };

  useEffect(() => {
    if (groupLevelRef.current) {
      const width = groupLevelRef.current.offsetWidth;
      if (width > cardWidth) {
        let fontSize = parseFloat(
          window.getComputedStyle(groupLevelRef.current).fontSize
        );

        while (groupLevelRef.current.offsetWidth > cardWidth && fontSize > 0) {
          fontSize -= 1;
          groupLevelRef.current.style.fontSize = `${fontSize}px`;
        }
      }
    }
  }, []);

  return (
    <div
      className={`${styles.groupCard} ${
        group.groupFreePlaces === 0 ? styles.fullGroupCard : ""
      } `}
      style={{ width: `${cardWidth}px` }}
    >
      {group.groupFreePlaces === 0 && (
        <div className={styles.groupFullBanner}>Pełna</div>
      )}
      <div className={styles.groupType}>{group.groupType}</div>
      <div className={styles.groupLevel} ref={groupLevelRef}>
        {group.groupShortName}
      </div>
      <div className={styles.groupDays}>
        {getFormattedGroupDays(group.groupDays)}{" "}
        {getFormattedGroupHours(group.groupHours)}
      </div>
      <div className={styles.groupLector}>{group.groupLector}</div>
      <div className={styles.buttonsContainer}>
        <div
          className={`${styles.showMoreBtn} ${styles.danteButton} ${styles.infoButton}`}
          onClick={() => onShowGroupDetails(group.groupId)}
        >
          Info
        </div>
        {group.groupFreePlaces === 0 ? (
          <div
            className={`${styles.signInBtn} ${styles.danteButton} ${styles.notifyButton}`}
            onClick={() => onShowNotify(group.groupId)}
          >
            Powiadom
          </div>
        ) : (
          <div
            className={`${styles.signInBtn} ${styles.danteButton}`}
            onClick={() => onShowSignIn(group.groupId)}
          >
            Zapisz się
          </div>
        )}
      </div>
    </div>
  );
};
