import { GroupState } from "../enums/group-state";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";
import { SpecialGroup } from "../models/special-group";

const groupId = "-1";

const individualGroupInfo: Group = {
    groupId: groupId,
    groupType: "STACJONARNA/ONLINE",
    groupLevel: "",
    groupDays: "",
    groupHours: "",
    groupLector: "Stwórz swoją grupę, podając swoje preferencje!",
    groupFirstMeet: "",
    groupState: GroupState.Active,
    groupShortName: "Indywidualna ",
    groupFreePlaces: 5,
    groupAlwaysVisible: true,
};

const individualGroupDetails: GroupDetails = {
    groupDays: "",
    groupDescription:
        "Lekcje indywidualne to doskonała metoda, aby otrzymać podejście bardziej dopasowane do własnych potrzeb. Dzięki lekcjom indywidualnym będziecie mogli bezpośrednio ustalić z nauczycielem program, koncentrując się bardziej na swoich słabszych punktach. Ponadto, jest to idealne rozwiązanie dla osób, które mają dynamiczny czas pracy i mogą mieć trudności z regularnym uczestniczeniem w kursie grupowym. Wreszcie, jeśli w danym momencie nie ma dostępnych kursów grupowych na twoim poziomie, możesz szybciej osiągnąć wymagany poziom indywidualnie, a następnie dołączyć do lekcji grupowych.",
    groupFirstMeet: "",
    groupFreePlaces: 10,
    groupHours: "",
    groupId: groupId,
    groupLastMeet: "",
    groupLector: "",
    groupLectorFotoContent: "",
    groupLectorFotoName: "",
    groupLectorFotoSize: 0,
    groupLectorFotoType: "",
    groupLevel: "",
    groupName: "Indywidualna",
    groupShortName: "Indywidualna",
    groupType: "Indywidualna",
}

export const IndividualGroup = new SpecialGroup(individualGroupInfo, individualGroupDetails);
