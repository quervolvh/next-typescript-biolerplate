import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const generateUrlParams = (item: { [key: string]: string } | ParsedUrlQuery) => {

    let params = "";

    Object.entries(item).forEach(([key, value], index) => {

        params = params + `${key}=${value}` + (index + 1 !== Object.keys(Object(item)).length ? "&" : "");

    })

    return params;

}

export const queries = (router: NextRouter, modalUniqueId: string, remove = false) => {

    const currentPath = router?.pathname || "";

    const queries_ = router?.query || {};

    let newQueryString = "";

    const uniqueId = modalUniqueId?.split?.("-")?.[1];

    if (queries_["pointers"] && queries_["pointers"].includes(`-${uniqueId}`)) {

        return;

    }

    if (queries_["pointers"]) {

        queries_["pointers"] = queries_["pointers"] + `-${uniqueId}`;

    } else {

        queries_["pointers"] = uniqueId;

    }


    newQueryString = generateUrlParams(queries_);

    router.push(`${currentPath}?${newQueryString}`)

}

export const popARoutePath = (currentPath : string , modalUniqueId: string) => {

    const uniqueId = modalUniqueId?.split?.("-")?.[1];

    const pathAsObj = Object.fromEntries(new URLSearchParams(currentPath));

    if ((pathAsObj?.pointers || "").includes(uniqueId) && window ) {

        window.history.go(-1)

    }


}