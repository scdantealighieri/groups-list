import { GroupDetails } from "../models/group-details";
import { ExternalFormModal } from "../sign-in-modal/ExternalFormModal";
import { GroupDetailsModal } from "../group-details/GroupDetailsModal";
import { ModalType } from "../enums/modal-type";
import { isDuettoGroup, isIndividualGroup } from "../utils/group-utils";
import { Group } from "../models/group";

export const ModalManager = ({
  groupDetails,
  group,
  onCloseModal,
  modalType,
  isGroupDetailsOpen,
  onShowSignIn,
  onShowNotify,
}: {
  groupDetails: GroupDetails | null;
  group: Group | null;
  onCloseModal: () => void;
  modalType: ModalType;
  isGroupDetailsOpen?: boolean;
  onShowSignIn?: (groupId: string) => void;
  onShowNotify?: (groupId: string) => void;
}) => {
  if (!groupDetails) {
    return null;
  }

  let formSectionId = "";

  if (modalType === ModalType.SignIn) {
    if (isIndividualGroup(groupDetails.groupId)) {
      formSectionId = "signInIndividualFormSection";
    } else if (isDuettoGroup(groupDetails.groupId)) {
      formSectionId = "signInDuettoFormSection";
    } else if (group && group.groupForKids) {
      formSectionId = "signInKidsFormSection";
    } else {
      formSectionId = "signInFormSection";
    }
  } else if (modalType === ModalType.Notify) {
    formSectionId = "notifyFormSection";
  }

  return (
    <>
      {modalType === ModalType.Details &&
        isGroupDetailsOpen &&
        groupDetails &&
        onShowSignIn &&
        onShowNotify && (
          <GroupDetailsModal
            groupDetails={groupDetails}
            group={group}
            onClose={onCloseModal}
            showSignInModal={onShowSignIn}
            showNotifyModal={onShowNotify}
          />
        )}

      {modalType !== ModalType.None &&
        modalType !== ModalType.Details &&
        formSectionId && (
          <ExternalFormModal
            groupDetails={groupDetails}
            onClose={onCloseModal}
            formSectionId={formSectionId}
          />
        )}
    </>
  );
};
