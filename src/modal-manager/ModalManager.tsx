import { GroupDetails } from "../models/group-details";
import { ExternalFormModal } from "../sign-in-modal/ExternalFormModal";
import { GroupDetailsModal } from "../group-details/GroupDetailsModal";
import { ModalType } from "../enums/modal-type";

export const ModalManager = ({
    groupDetails,
    onCloseModal,
    modalType,
    isSpecialGroup,
    isGroupDetailsOpen,
    onShowSignIn,
    onShowNotify
}: {
    groupDetails: GroupDetails | null;
    onCloseModal: () => void;
    modalType: ModalType;
    isSpecialGroup: (groupId: string) => boolean;
    isGroupDetailsOpen?: boolean;
    onShowSignIn?: (groupId: string) => void;
    onShowNotify?: (groupId: string) => void;
}) => {
    if (!groupDetails) {
        return null;
    }

    let formSectionId = "";

    if (modalType === ModalType.SignIn) {
        if (groupDetails.groupId === "-1") {
            formSectionId = "signInIndividualFormSection";
        } else if (groupDetails.groupId === "-2") {
            formSectionId = "signInDuettoFormSection";
        } else if (!isSpecialGroup(groupDetails.groupId)) {
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