export type loginBodyType = {
    accesstoken: string,
    data: {
        accountCreated: boolean,
        accountId?: string,
        accountNumber: string,
        accountTrackingRef: string,
        active: boolean,
        address?: string,
        birthdate?: string,
        createdAt: string,
        deviceLocked: boolean,
        deviceToken: string,
        firstname?: string,
        gender?: string,
        id: string,
        idCreated: boolean,
        identity?: string,
        identityNumber?: string,
        identityType?: string,
        image?: string,
        lastname?: string,
        migrated?: boolean,
        onboarded?: boolean,
        othername?: string,
        passwordUpdated: string,
        phone?: string,
        pinCreated?: boolean,
        smsNotification: boolean,
        twoFactorAuth: boolean,
        updatedAt: string,
        verified: boolean,
    },

    message: string,
    refreshtoken: string
}