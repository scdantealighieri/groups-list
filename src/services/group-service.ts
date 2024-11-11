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
      return "Rano";
    } else if (startHour >= 12 && startHour < 18) {
      return "Popołudnie";
    } else if (startHour >= 18 && startHour < 24) {
      return "Wieczór";
    } else {
      return "";
    }
  };