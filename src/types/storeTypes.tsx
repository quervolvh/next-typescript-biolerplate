import { beneficiaryType } from "./sendMoneyTypes";

export type userType = {
    firstname?: string,
    lastname?: string,
    othername?: string,
    phone?: string,
    onboarded?: boolean,
    city?: string,
    state?: string,
    address?: string,
    image?: string,
    email?: string,
    accountNumber?: string,
    pinCreated?: boolean,
    verified?: boolean,
    birthdate?: string,
    gender?: string,
    identity?: string
}

export type authType = {
    accesstoken?: string,
    refreshtoken?: string,
    expiresAt?: string
}

export type bankCodeType = { Code: string, Name: string, image?: string };

export type transactionChannelType = 'transfer' | 'bill' | 'airtime' | 'anonymous' | 'cable' | 'electricity';
export interface baseTransactionType {
    description?: string,
    destinationAccountName?: string,
    destinationAccountNumber?: string,
    destinationBank?: string,
    date?: string,
    amount?: number,
    totalAmount?: number,
    channel: transactionChannelType,
    reference: string,
    id?: string,
    user?: string,
    completed?: boolean,
    createdAt?: string,
    type?: string,
    prevItem?: baseTransactionType,
    previousBalance?: number
}

export type transactionType = {
    bankCodes?: bankCodeType[],
    transactions: {
        data: baseTransactionType[],
        base: { [key: string]: baseTransactionType[] },
        page?: number,
        pageCount?: number,
        perPage?: number,
        dataLoader?: boolean,
        baseLoader?: boolean,
        baseError?: boolean,
        dataError?: boolean
    },
    transactionFee: number,
    ownBankCode: string,
    analytics?: { loader?: boolean, expenditure?: number, income?: number },
    chart?: { loader?: boolean, data: { income: number, expenditure: number, no: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 10 | 11 | 12 }[] },
}

export type customTransactionType = {
    firstname: string,
    lastname: string,
    amount: number,
    totalAmount?: number,
    type: string,
    date?: string,
    description: string,
    id: string,
    reference: string,
    baseItem: baseTransactionType
}

export type billType = {
    id: number | string,
    name: string,
    billers: string[]
}

export type billPackageType = {
    Code: string,
    BillerId: string,
    Amount: number,
    ID: string,
    Name: string
}

export type billCategoryType = {
    ID: string,
    CategoryId: string,
    Name?: string,
    Narration?: string,
    packages?: billPackageType[],
    BillerID?: number
}

export type billCategoryGroup = {
    [key: string]: {
        [key: string]: billCategoryType
    }
}

export type beneficiariesTypes = {
    items: beneficiaryType[],
}

export type billContentBlock = {
    parent?: boolean,
    categories?: { [key: string]: boolean },
    packages?: { [key: string]: boolean },
    recurring?: { [key: string]: boolean },
    scheduled?: { [key: string]: boolean },
};

export type payedBillType = {
    recipientId: string,
    amount: number,
    packageName: string,
    productName: string,
    productId: string,
    billerId: string,
    productCategory: string
};

export type scheduledBillType = {
    active: boolean,
    id: string,
    name: string,
    billingDate: string,
    productId: string,
    amount: number,
    billerId: string,
    packageName: string,
    productCategory: string,
};

export type recurringBillType = {
    active: boolean,
    id: string,
    productId: string,
    amount: number,
    billerId: string,
    packageName: string,
    productCategory: string,
    nextBillingDate: string,
    frequency: string,
};

export type routeType = {
    currentPath: {
        fullPath?: string,
        queries?: { [key: string]: string },
        specificPath?: string
    },
    previousPath: {
        fullPath?: string,
        queries?: { [key: string]: string },
        specificPath?: string
    },
    tempPath: {
        fullPath?: string,
        queries?: { [key: string]: string },
        specificPath?: string
    },
    navigating: boolean,
    visitationTrack: string[]
}

export type toastType = {
    timer: number,
    nature?: string,
    manualDismiss?: boolean,
    toDismiss?: string,
    toast?: { id: string, text: string },
    toasts: { id: string, text: string, new: boolean }[]
}

export type workerType = {
    activity: string[],
    refreshing: boolean
}

export type utilType = {
    cities: {
        loader: boolean,
        error: boolean,
        data: {
            [key: string]: { name: string, id: string }[]
        }
    },
    states: {
        loader: boolean,
        error: boolean,
        data: { name: string, id: string }[]
    }
}

export type accountNumberObjType = {
    accountNumber: string,
    tier: number,
    type: "savings" | "current",
    balance: string
};

export type accountType = {
    balance?: number,
    accountNumber?: accountNumberObjType[],
    activeAccountNumber?: string
};
export interface storeInterface {
    account: accountType,
    auth: authType,
    bill: {
        bills: billType[],
        categories: billCategoryGroup,
        loader: billContentBlock,
        error: billContentBlock
    },
    beneficiaries: beneficiariesTypes,
    route: routeType
    toast: toastType,
    transaction: transactionType,
    user: userType,
    util: utilType,
    worker: workerType
}
