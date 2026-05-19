import React from "react";
import { Group } from "../models/group";

import styles from "./GroupCard.module.css";
import { getFormattedGroupDays } from "../services/group-service";


export const GroupCard = ({
  group,
  onShowGroupDetails,
  onShowSignIn,
  onShowNotify,
  isLandingPage,
}: {
  group: Group;
  onShowGroupDetails: (groupId: string) => Promise<void>;
  onShowSignIn: (groupId: string) => Promise<void>;
  onShowNotify: (groupId: string) => Promise<void>;
  isLandingPage?: boolean;
}) => {
  const cardWidth = 230;

  const getFormattedGroupHours = (groupHours: string): string => {
    return groupHours.split("$")[0];
  };

  const maxPlaces = group.groupType === "stacjonarna" ? 12 : 10;

const occupiedPlaces = maxPlaces - group.groupFreePlaces;

const fillPercent = Math.min(
  100,
  Math.max(0, (occupiedPlaces / maxPlaces) * 100)
);

  return (
    <div
      className={`${styles.groupCard} ${
        group.groupFreePlaces === 0 ? styles.fullGroupCard : ""
      }`}
      style={{ width: `${cardWidth}px` }}
    >
      {group.groupFreePlaces === 0 && (
        <div className={styles.groupFullBanner}>Pełna</div>
      )}

      <div className={styles.groupType}>

        {group.groupId === "special_individual" ||
group.groupId === "special_duetto" ? (
  <>
    <span className={`material-symbols-outlined ${styles.groupTypeIcon}`}>
      location_on
    </span>

    <span className={`material-symbols-outlined ${styles.groupTypeIcon}`}>
      wifi
    </span>
  </>
) : (
  <>
    <span className={`material-symbols-outlined ${styles.groupTypeIcon}`}>
      {group.groupCityOrType.toLowerCase() === "online" ? "wifi" : "location_on"}
    </span>

    <span>{group.groupCityOrType}</span>
  </>
)}
            </div>

      {group.groupId !== "special_individual" &&
        group.groupId !== "special_duetto" && (
          <div className={styles.capacityWrapper}>
            <div className={styles.capacityBar}>
              <div
                className={styles.capacityFill}
                style={{ width: `${fillPercent}%` }}
              />

              <div className={styles.capacityTextDark}>
                {occupiedPlaces}/{maxPlaces}
              </div>

              <div
                className={styles.capacityTextLight}
                style={{ width: `${fillPercent}%` }}
              >
                <span>
                  {occupiedPlaces}/{maxPlaces}
                </span>
              </div>
            </div>
          </div>
        )}


      <div className={styles.groupLevel}>
        {group.groupShortName}
      </div>

      {group.groupId === "special_individual" ||
group.groupId === "special_duetto" ? (

<div className={styles.specialDescription}>
  Stwórz swoją grupę, podając swoje preferencje!
</div>

) : (
  <>
    <div className={styles.groupDays}>
            <span className={`material-symbols-outlined ${styles.cardIcon}`}>
              calendar_month
            </span>

            <span>
              {getFormattedGroupDays(group.groupDays)}{" "}
              {getFormattedGroupHours(group.groupHours)}
            </span>
          </div>

          <div className={styles.groupLector}>
            {group.groupLectorFotoContent ? (
              <img
                src={`data:${group.groupLectorFotoType};base64,${group.groupLectorFotoContent}`}
                alt={group.groupLector}
                className={styles.lectorAvatar}
              />
            ) : (
              <span className={`material-symbols-outlined ${styles.cardIcon}`}>
                person
              </span>
            )}

            <span>{group.groupLector}</span>
          </div>
        </>
      )}

      <div className={styles.buttonsContainer}>
        {!isLandingPage && (
          <div
            className={`${styles.showMoreBtn} ${styles.danteButton} ${styles.infoButton}`}
            onClick={() => onShowGroupDetails(group.groupId)}
          >
            Info
          </div>
        )}

        {group.groupFreePlaces === 0 && !isLandingPage ? (
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