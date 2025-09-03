import { GroupState } from "../enums/group-state";
import { Group } from "../models/group";
import { SpecialGroup } from "../models/special-group";
import { SpecialGroupDetails } from "../models/special-group-details";

export const groupId = "special_duetto";

const duettoGroupInfo: Group = {
    groupId: groupId,
    groupType: "STACJONARNA/ONLINE",
    groupLevel: "",
    groupDays: "",
    groupHours: "",
    groupLector: "Stwórz swoją grupę, podając swoje preferencje!",
    groupFirstMeet: "",
    groupState: GroupState.Active,
    groupShortName: "Duetto",
    groupFreePlaces: 5,
    groupAlwaysVisible: true,
    groupPremises: [],
    groupCity: "",
    groupCityOrType: "",
    groupForKids: false
};

const duettoGroupDetails: SpecialGroupDetails = {
    groupDays: "",
    groupDescription: "Kursy Duetto to idealne połączenie lekcji grupowych i kursów indywidualnych. Jeśli nie lubisz zbyt bezpośredniego podejścia do nauczyciela, ale nie chcesz również uczyć się w zbyt dużej grupie, Duetto jest rozwiązaniem idealnym dla Ciebie. Jeśli masz już partnera, zapiszcie się razem i otrzymajcie zniżkę, w przeciwnym razie postaramy się dopasować Cię do innych osób, które wyraziły chęć dołączenia!",
    groupSubHeader: "Zalety kursów duetto",
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
    groupName: "Duetto",
    groupShortName: "Duetto",
    groupType: "Duetto",
    bulletPoints: [
        {
            text: "Uwaga lektora skupiona jest tylko na dwóch osobach",
            icon: "group",
        },
        {
            text: "Indywidualne podejście i motywacja we dwoje",
            icon: "bolt",
        },
        {
            text: "Tańsze niż indywidualne, z zaletami kursu grupowego",
            icon: "attach_money",
        }
    ],
    groupForKids: false
}

export const DuettoGroup = new SpecialGroup(duettoGroupInfo, duettoGroupDetails);