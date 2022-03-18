
export const leftLinks: typeOfHeaderItem[] = [
    {
        "title": "Home",
        "link": "/"
    },
    {
        "title": "Pricing",
        "link": "/pricing"
    },
    {
        "title": "Contact us",
        "link": "/services"
    },
];

export const rightLinks: typeOfHeaderItem[] = [
    {
        "title": "Register",
        "link": "/register"
    },
    {
        "title": "Login",
        "link": "/login"
    }
];

export type typeOfHeaderItem = {
    title?: string,
    type?: string,
    link?: string,
    links?: { [key: string]: any }[],
    class?: string
};
