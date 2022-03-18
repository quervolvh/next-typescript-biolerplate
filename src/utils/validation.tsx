export const validateEmail: (email: string) => boolean = (email) => {
    //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isNumber: (value: string) => boolean = (value) => /^\d+\.\d+$|^\d+$/.test(value)

export const validateMobile: (mobile: string) => boolean = (mobile) => {
    const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g;
    return re.test(mobile);
}

export const validateFullName: (name: string) => boolean = (name) => {
    const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return name.match(re) ? false : true;
}

export const hasWhiteSpace: (s: string) => boolean = (s) => {
    const re = /[\s/g]/;
    return re.test(s) === true;
}
