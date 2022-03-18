export const resizer = (callBack: (value: boolean) => void , widthCallBack?: (value: number) => void ) => {

    const width = document?.body?.clientWidth;

    if ( widthCallBack ) widthCallBack(width);

    if (width < 601) {
        callBack(true);
        return;
    }

    if (width > 600) {
        callBack(false);
        return;
    }
}
