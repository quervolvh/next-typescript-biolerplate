export type authType = {
    accesstoken?: string,
    refreshtoken?: string,
    expiresAt?: string
}

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

export interface storeInterface {
    auth: authType,
    route: routeType
    toast: toastType,
    util: utilType,
    worker: workerType
}
