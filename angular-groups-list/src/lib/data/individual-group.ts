import { GroupState } from "../enums/group-state";
import { Group } from "../models/group";
import { SpecialGroup } from "../models/special-group";
import { SpecialGroupDetails } from "../models/special-group-details";

export const INDIVIDUAL_GROUP_ID = "special_individual";

const individualGroupInfo: Group = {
    groupId: INDIVIDUAL_GROUP_ID,
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
    groupPremises: [],
    groupCity: "",
    groupCityOrType: ""
};

const individualGroupDetails: SpecialGroupDetails = {
    groupDays: "",
    groupDescription: "Dla osób, których oczekiwania dotyczące np. tempa nauki czy zakresu leksykalnego są odmienne od programu nauczania grupowego lub których poziom zaawansowania nie pozwala na przyłączenie się od razu do grupy",
    groupSubHeader: "Zalety kursów indywidualnych",
    groupFirstMeet: "",
    groupFreePlaces: 10,
    groupHours: "",
    groupId: INDIVIDUAL_GROUP_ID,
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
    bulletPoints: [
        {
            text: "Spersonalizowana struktura programu",
            icon: "menu_book",
        },
        {
            text: "Dopasowane godziny zajęć",
            icon: "schedule",
        },
        {
            text: "Całkowite skupienie się na indywidualnych potrzebach",
            icon: "lightbulb",
        }
    ]
};

export const IndividualGroup = new SpecialGroup(individualGroupInfo, individualGroupDetails);