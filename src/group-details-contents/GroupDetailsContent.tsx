import { GroupDetails } from "../models/group-details";
import { dayMapping, getFormattedGroupDays } from "../services/group-service";
import styles from "../group-details/GroupDetailsModal.module.css";
import { useShortNameSize } from "../hooks/useShortNameSize";
import { useRef, useEffect } from "react";

export const GroupDetailsContent = ({
  groupDetails,
}: {
  groupDetails: GroupDetails;
}) => {
  const shortNameRef = useShortNameSize(220, 450, styles.medium, styles.small);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && descriptionRef.current) {
      const headerWidth = headerRef.current.offsetWidth;
      descriptionRef.current.style.maxWidth = `${headerWidth}px`;
    }
  }, []);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className={styles.detailsTop}>
        <div className={styles.detailsLeft}>
          <div className={styles.header} ref={headerRef}>
            <div className={styles.level} ref={shortNameRef}>
              {groupDetails.groupShortName}
            </div>
            <div className={styles.separator}></div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className={styles.infoValue}>{groupDetails.groupType}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className={`${styles.infoValue} ${styles.hours}`}>
                  {groupDetails.groupHours.split("$")[0]}
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                </div>
                <div className={styles.infoValue}>
                  {getFormattedGroupDays(groupDetails.groupDays)}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.description} ref={descriptionRef}>
            {groupDetails.groupDescription}
          </div>
        </div>

        {groupDetails.groupLectorFotoContent && (
          <div className={styles.detailsRight}>
            <div className={styles.description}>
              {groupDetails.groupDescription}
            </div>
            <div className={styles.photo}>
              <img
                src={`data:${groupDetails.groupLectorFotoType};base64,${groupDetails.groupLectorFotoContent}`}
                alt={groupDetails.groupLector}
              />
              <div className={styles.photoTitle}>
                {groupDetails.groupLector}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.detailsBottom}>
        {groupDetails.groupFirstMeet && (
          <div className={styles.classDates}>
            <div className={styles.datesHeader}>Terminy zajęć</div>
            <div className={styles.dates}>
              <span>{`${formatDate(groupDetails.groupFirstMeet)} - ${formatDate(
                groupDetails.groupLastMeet
              )}`}</span>
            </div>
          </div>
        )}
        {groupDetails.groupFreePlaces < 3 &&
          groupDetails.groupFreePlaces > 0 && (
            <div className={styles.freePlacesContainer}>
              <div className={styles.freePlacesHeader}>Wolne miejsca</div>
              <div className={styles.freePlaces}>
                Ostatnie {groupDetails.groupFreePlaces}!
              </div>
            </div>
          )}
        {groupDetails.groupFreePlaces === 0 && (
          <div className={styles.freePlacesContainer}>
            <div className={styles.freePlacesHeader}></div>
            <div className={styles.freePlaces}>Brak wolnych miejsc</div>
          </div>
        )}
      </div>
    </>
  );
};
