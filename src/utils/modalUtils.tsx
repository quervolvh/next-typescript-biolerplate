export const getModalHierarchy = (uniqueID?: string) => {

    if (!uniqueID) return { modalNumber: 0, hierarchy: 0 };

    const modalList = document.getElementsByClassName("modal-overlay");
    let modalNumber = -1;
    let hierarchy = 1;

    for (var i = 0; i < modalList.length; i++) {

        if (modalList[i].id === uniqueID) {

            modalNumber = i;
        }

    }

    if ((modalNumber === (modalList.length > 0 ? modalList.length - 1 : 0)) || !uniqueID) {
        hierarchy = 0;
    }

    return { modalNumber, hierarchy }

}
