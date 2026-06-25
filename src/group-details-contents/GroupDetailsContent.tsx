import { ReactNode } from "react";
import { GroupType } from "../enums/group-type";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";
import { getFormattedGroupDays } from "../services/group-service";
import styles from "./GroupDetailsContent.module.css";

export const GroupDetailsContent = ({
  groupDetails,
  group,
  toolbar,
}: {
  groupDetails: GroupDetails;
  group: Group | null;
  toolbar: ReactNode;
}) => {
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const city =
    groupDetails.groupType === GroupType.OnSite ? group?.groupCity : "Online";
  const address =
    groupDetails.groupType === GroupType.OnSite
      ? group?.groupPremises[0]?.premiseAddress
      : "Zoom";
  const hours = groupDetails.groupHours.split("$")[0];
  const [startHour, endHour] = hours.split("-");

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const durationMinutes =
  toMinutes(endHour) - toMinutes(startHour);
  const days = getFormattedGroupDays(groupDetails.groupDays);

const lessonsUnits = Number(group?.groupLessUnits || 0);

const lessonsCount =
  durationMinutes > 0
    ? Math.round(lessonsUnits / (durationMinutes / 45))
    : 0;

const applyMarkdown = (text: string) =>
  text
    // rimuove intere righe di keyword {{...}}
    .replace(/^\s*(\{\{.*?\}\}\s*)+\n?/gm, "")
    // sicurezza: rimuove eventuali keyword inline rimaste
    .replace(/\{\{(.*?)\}\}/g, "")
    // trasforma [[...]] in bold
    .replace(/\[\[(.*?)\]\]/g, "<strong>$1</strong>")
    .trim();

  const kosztIndex = groupDetails.groupDescription.indexOf("Koszt");
  const beforeKoszt =
    kosztIndex !== -1
      ? groupDetails.groupDescription.slice(0, kosztIndex).trimEnd()
      : groupDetails.groupDescription;
  const fromKoszt =
    kosztIndex !== -1
      ? groupDetails.groupDescription.slice(kosztIndex).trim()
      : "";

const totalSeats = 10;
const freePlaces = Math.max(0, groupDetails.groupFreePlaces);
const takenSeats = Math.min(totalSeats, totalSeats - freePlaces);

const ratio = takenSeats / totalSeats;

let peopleCount = 0;

if (ratio > 0 && ratio <= 0.33) {
  peopleCount = 1;
} else if (ratio <= 0.66) {
  peopleCount = 2;
} else {
  peopleCount = 3;
}

  return (
    <div className={styles.container}>
      {/* Header with decorative background element */}
      <div className={styles.header}>
        <div className={styles.title}>{groupDetails.groupShortName}</div>
      </div>

      {/* Info row */}
      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            location_city
          </span>
          <span>{city}</span>
        </div>
        <div className={styles.infoSeparator} />
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            location_on
          </span>
          <span>{address}</span>
        </div>
        <div className={styles.infoSeparator} />
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            schedule
          </span>
          <span>{hours}</span>
        </div>
        <div className={styles.infoSeparator} />
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            calendar_month
          </span>
          <span>{days}</span>
        </div>
      </div>

      {/* Two-column content: description + photo */}
      <div className={styles.contentArea}>
        <div className={styles.contentLeft}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: applyMarkdown(beforeKoszt) }}
          />
          {fromKoszt && (
            <div className={styles.priceCard}>
              <span
                className={`material-symbols-outlined ${styles.priceCardIcon}`}
              >
                sell
              </span>
              <div
                className={styles.priceCardText}
                dangerouslySetInnerHTML={{
                  __html: applyMarkdown(fromKoszt).replace(
                    /^Koszt/,
                    '<span style="font-weight:700;color:var(--dante-dark-brown)">Koszt</span>',
                  ),
                }}
              />
            </div>
          )}
        </div>
        {groupDetails.groupLectorFotoContent && (
          <div className={styles.photoCard}>
            <img
              src={`data:${groupDetails.groupLectorFotoType};base64,${groupDetails.groupLectorFotoContent}`}
              alt={groupDetails.groupLector}
              className={styles.photo}
            />
            <div className={styles.lectorOverlay}>
              <div className={styles.lectorName}>
                {groupDetails.groupLector}
              </div>
              <div className={styles.lectorRole}>Lektor</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer: dates | free places | CTA */}
      <div className={styles.footer}>
        {groupDetails.groupFirstMeet && (
          <div className={styles.footerSection}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>
              calendar_month
            </span>
            <div>
              <div className={styles.footerLabel}>Terminy zajęć</div>
              <div className={styles.footerValue}>
              {`${formatDate(groupDetails.groupFirstMeet)} – ${formatDate(
                groupDetails.groupLastMeet,
              )}`}

              <div className={styles.meetingsCount}>
              ({lessonsCount} spotkań x {durationMinutes} min)
            </div>
            </div>
            </div>
          </div>
        )}
        <div className={styles.footerSection}>
          <span className={`material-symbols-outlined ${styles.footerIcon}`}>
            group
          </span>
          <div className={styles.placesContainer}>
            <div className={styles.footerLabel}>Liczebność grupy</div>
            <div className={styles.peopleAvailability}>
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className={`material-symbols-outlined ${
                    index < peopleCount ? styles.personActive : styles.personInactive
                  }`}
                >
                  person
                </span>
              ))}
            </div>

          </div>
        </div>
        <div className={styles.footerCta}>
          {toolbar}
          <div className={styles.secureLabel}>
            <span className={`material-symbols-outlined ${styles.secureIcon}`}>
              verified_user
            </span>
            <span>Bezpieczne zapisy online</span>
          </div>
        </div>
      </div>
    </div>
  );
};
