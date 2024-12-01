import { GroupState } from "../enums/group-state";

export const dayOrder = ["pon", "wto", "sro", "czw", "pia", "sob", "nie"];

export const periodOrder = ["rano", "popołudnie", "wieczór"];

export const dayMapping: { [key: string]: string } = {
    pon: "poniedziałek",
    wto: "wtorek",
    sro: "środa",
    czw: "czwartek",
    pia: "piątek",
    sob: "sobota",
    nie: "niedziela",
  };

export const mapGroupHoursToPeriod = (groupHours: string): string => {
    const startHour = parseInt(groupHours.split("-")[0].split(":")[0], 10);
    if (startHour >= 6 && startHour < 12) {
      return "rano";
    } else if (startHour >= 12 && startHour < 18) {
      return "popołudnie";
    } else if (startHour >= 18 && startHour < 24) {
      return "wieczór";
    } else {
      return "";
    }
  };

  export const mapGroupState = (state: GroupState): string => {
    const stateMapping: { [key in GroupState]: string } = {
      [GroupState.Active]: "Trwające",
      [GroupState.Icoming]: "Nadchodzące",
    };
  
    return stateMapping[state];
  };