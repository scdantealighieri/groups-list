import { GroupDetails } from "../models/group-details";
import { BaseGroupDetailsModal } from "./BaseGroupDetailsModal";
import { GroupDetailsContent } from "../group-details-contents/GroupDetailsContent";
import { SpecialGroupDetailsContent } from "../group-details-contents/SpecialGroupDetailsContent";

import styles from "./GroupDetailsModal.module.css";
import { isSpecialGroup } from "../utils/group-utils";
import { SpecialGroupDetails } from "../models/special-group-details";

export const GroupDetailsModal = ({
  groupDetails,
  onClose,
  showSignInModal,
  showNotifyModal,
}: {
  groupDetails: GroupDetails;
  onClose: () => void;
  showSignInModal: (groupId: string) => void;
  showNotifyModal: (groupId: string) => void;
}) => {

  const toolbar = (
    <>
      {groupDetails.groupFreePlaces === 0 ? (
        <button
          className={styles.signInButton}
          onClick={() => showNotifyModal(groupDetails.groupId)}
        >
          Powiadom mnie
        </button>
      ) : (
        <button
          className={styles.signInButton}
          onClick={() => showSignInModal(groupDetails.groupId)}
        >
          Zapisz się
        </button>
      )}
    </>
  );

  return (
    <BaseGroupDetailsModal onClose={onClose} toolbar={toolbar} centerToolbar={isSpecialGroup(groupDetails.groupId)}>
      {isSpecialGroup(groupDetails.groupId) ? (
        <SpecialGroupDetailsContent groupDetails={groupDetails as SpecialGroupDetails} />
      ) : (
        <GroupDetailsContent groupDetails={groupDetails} />
      )}
    </BaseGroupDetailsModal>
  );
};
