import { SpecialGroupDetails } from "../models/special-group-details";
import styles from "../group-details/GroupDetailsModal.module.css";
import specialStyles from "./SpecialGroudDetails.module.css";
import { useShortNameSize } from "../hooks/useShortNameSize";

export const SpecialGroupDetailsContent = ({ groupDetails }: {
    groupDetails: SpecialGroupDetails;
}) => {
    const shortNameRef = useShortNameSize(220, 450, styles.medium, styles.small);

    return (
        <div className={styles.detailsTop}>
            <div className={specialStyles.detailsLeft}>
                <div className={styles.header}>
                    <div className={`${styles.level} ${styles.levelSpecial}`} ref={shortNameRef}>
                        {groupDetails.groupShortName}
                    </div>
                </div>
                <div className={specialStyles.description}>{groupDetails.groupDescription}</div>
                <div className={specialStyles.subHeader}>{groupDetails.groupSubHeader}</div>
                <div className={specialStyles.bulletPoints}>
                    {groupDetails.bulletPoints.map((point, index) => (
                        <div key={index} className={specialStyles.bulletPoint}>
                            <span className="material-symbols-outlined">{point.icon}</span>
                            {point.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};