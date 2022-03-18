export const authorizedHeader = (token: string, isImageUpload?: boolean) => ({
    headers: {
        "Authorization": token,
        "Content-Type": isImageUpload ? 'multipart/form-data' : 'application/json'
    }
});
