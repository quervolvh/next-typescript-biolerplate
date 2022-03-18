export type sendMoneyEntityType = {
    amount?: string,
    bank?: { Name: string, Code: string },
    narration?: string,
    account?: string,
}

export type beneficiaryType = {
    firstName?: string,
    lastName?: string,
    accountName?: string,
    accountNumber?: string,
    user?: string,
    _id?: string,
    account?: string,
    bank?: { Code : string , Name : string},
    bankName?: string,
    bankCode?: string
}

export interface sendMoneyStateType extends sendMoneyEntityType {
    validAccountDetails?: { KYC?: string, SessionID?: string, BVN?: string, Name?: string },
    error?: { [key: string]: any },
    success?: boolean,
    loading?: boolean,
    confirmTrigger: number,
    attempt: number,
    anonymous: boolean
}

export interface sendMoneyAsGhostProps {
    value: boolean,
    change(e: boolean): void,
    form: sendMoneyStateType,
    setForm: (e: sendMoneyStateType) => void,
    toggle: () => void
}
