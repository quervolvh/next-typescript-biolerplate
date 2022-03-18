import { bankCodeType } from "types";

export const bankSearch = (item: bankCodeType, searchString: string) => {
    const bankName = (item.Name || "").toLowerCase().trim();
    const searchEntry = searchString.toLowerCase().trim();

    const condition1 = bankName.includes(searchEntry);

    return condition1;
}
