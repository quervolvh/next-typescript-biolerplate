import { beneficiaryType } from "types";

export const beneficiarySearch = (item: beneficiaryType, searchString: string) => {
    const firstName = (item.firstName || "").toLowerCase().trim();
    const lastName = (item.lastName || "").toLowerCase().trim();
    const combinedString = (firstName && lastName) ? `${firstName} ${lastName}`: "";
    const searchEntry = searchString.toLowerCase().trim();

    const condition1 = lastName.includes(searchEntry);
    const condition2 = firstName.includes(searchEntry);
    const condition3 = combinedString ? combinedString.includes(searchEntry) : false;

    const condition4 = ((firstName[0] || "") + " " + (lastName[0] || "")).includes(searchEntry)

    const condition5 = searchEntry.includes(lastName);
    const condition6 = searchEntry.includes(firstName);
    const condition7 = combinedString ? searchEntry.includes(combinedString) : false;

    return condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7;
}
