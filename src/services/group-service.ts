import { GroupState } from "../enums/group-state";
import { FilterDropdownOption } from "../models/filter-dropdown-option";

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

export const dayMappingShort: { [key: string]: string } = {
    pon: "pon",
    wto: "wto",
    sro: "śro",
    czw: "czw",
    pia: "pią",
    sob: "sob",
    nie: "nie",
  };
  
export const dayMappingToNumber: { [key: string]: number } = {
  pon: 1,
  wto: 2,
  sro: 3,
  czw: 4,
  pia: 5,
  sob: 6,
  nie: 7};

export const parseDateToNumber = (dateString: string): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
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

  const capitalize = (str: string): string => {
    const words = str.split(" ");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  export const convertToOptions = (strings: (string | undefined)[], labelConverter?: (value: string) => string): FilterDropdownOption[] => {
    let getLabel = (str: string) => str;

    if(labelConverter) {
      getLabel = labelConverter;
    }

    return strings
      .filter((str): str is string => str !== undefined)
      .map((str) => ({
        label: capitalize(getLabel(str)),
        value: str,
        disabled: false,
      }));
  };