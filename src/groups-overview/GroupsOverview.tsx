import { useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";
import { fetchGroup } from "../api/groups-api";
import { SpecialGroup } from "../models/special-group";
import { ModalManager } from "../modal-manager/ModalManager";
import { ModalType } from "../enums/modal-type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import styles from "./GroupsOverview.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { IndividualGroup } from "../special-groups/individual-group";
import { DuettoGroup } from "../special-groups/duetto-group";
import { dayMappingToNumber } from "../services/group-service";

export const GroupsOverview = ({
  groups,
  rootElement,
}: {
  groups: Group[];
  rootElement?: HTMLElement;
}) => {
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.None);

  const isLandingPage = !!rootElement?.getAttribute("dante-lp");

  const getFilteredGroups = () => {
    if (!rootElement) return groups;

    const level = rootElement.getAttribute("dante-level")?.toLowerCase();
    const type = rootElement.getAttribute("dante-type")?.toLowerCase();
    const lector = rootElement.getAttribute("dante-lector")?.toLowerCase();
    const hideInd = rootElement.getAttribute("dante-hide-ind")?.toLowerCase();
    const name = rootElement.getAttribute("dante-name")?.toLowerCase();
    const city = rootElement.getAttribute("dante-city")?.toLowerCase();

    const hideDuetto = rootElement
      .getAttribute("dante-hide-duetto")
      ?.toLowerCase();

    let filtered = groups.filter((group) => !(group instanceof SpecialGroup));

    if (level) {
      filtered = filtered.filter((group) =>
        group.groupLevel.toLowerCase().startsWith(level)
      );
    }

    if (type) {
      filtered = filtered.filter((group) =>
        group.groupType.toLowerCase().startsWith(type)
      );
    }

    if (lector) {
      filtered = filtered.filter((group) =>
        group.groupLector.toLowerCase().startsWith(lector)
      );
    }

    if (!hideInd) {
      const thisLectorIndividualGroup = { ...IndividualGroup };
      if (lector) {
        thisLectorIndividualGroup.details.groupLector = lector.toUpperCase();
      }
      filtered = [...filtered, thisLectorIndividualGroup];
    }

    if (!hideDuetto) {
      const thisLectorDuettoGroup = { ...DuettoGroup };
      if (lector) {
        thisLectorDuettoGroup.details.groupLector = lector.toUpperCase();
      }
      filtered = [...filtered, thisLectorDuettoGroup];
    }

    if (name) {
      filtered = filtered.filter((group) =>
        group.groupShortName.toLowerCase().includes(name)
      );
    }

    if (city) {
      filtered = filtered.filter((group) =>
        group.groupCity.toLowerCase().includes(city)
      );
    }

    filtered.sort((a, b) => {
      const res = a.groupShortName
        .trim()
        .localeCompare(b.groupShortName.trim());

      if (res === 0) {
        return (
          dayMappingToNumber[a.groupDays.split("-")[0]] -
          dayMappingToNumber[b.groupDays.split("-")[0]]
        );
      }
      return res;
    });

    return filtered;
  };

  const fetchGroupDetails = async (groupId: string) => {
    const group = groups.find((group) => group.groupId === groupId) ?? null;

    if (group && group instanceof SpecialGroup) {
      setGroupDetails(group.details);
      return;
    }

    setSelectedGroup(group);
    const data = await fetchGroup(groupId);
    setGroupDetails(data);
  };

  const closeModals = () => {
    setIsGroupDetailsOpen(false);
    setModalType(ModalType.None);
    setGroupDetails(null);
  };

  const onShowGroupDetails = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setIsGroupDetailsOpen(true);
    setModalType(ModalType.Details);
  };

  const onShowSignIn = async (groupId: string) => {
    if (isLandingPage) {
      window.location.hash = "#zapisz-sie";
      return;
    }

    await fetchGroupDetails(groupId);
    setModalType(ModalType.SignIn);
  };

  const onShowNotify = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setModalType(ModalType.Notify);
  };

  const filteredGroups = getFilteredGroups();

  return (
    <div className={styles.overviewContainer}>
      {filteredGroups.length === 0 ? (
        <p className={styles.noGroupsMessage}>
          W tej chwili brak dostępnych kursów
        </p>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={"auto"}
          centeredSlides={false}
          navigation={true}
          className={styles.groupList}
          slidesOffsetAfter={30}
          slidesOffsetBefore={30}
          centerInsufficientSlides={true}
        >
          {filteredGroups.map((group) => (
            <SwiperSlide key={group.groupId} className={styles.swiperSlide}>
              <GroupCard
                group={group}
                onShowGroupDetails={onShowGroupDetails}
                onShowSignIn={onShowSignIn}
                onShowNotify={onShowNotify}
                isLandingPage={isLandingPage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <ModalManager
        groupDetails={groupDetails}
        group={selectedGroup}
        onCloseModal={closeModals}
        modalType={modalType}
        isGroupDetailsOpen={isGroupDetailsOpen}
        onShowSignIn={onShowSignIn}
        onShowNotify={onShowNotify}
      />
    </div>
  );
};
