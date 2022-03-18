const wildCards = ["phone", "account number"];

export const exemptionSearch = (item: string) => {

    let result = false;

    wildCards.forEach(exempt => {

        if (item.toLowerCase().trim().includes(exempt)) {
            result = true;
        }

    });

    return result;
}
