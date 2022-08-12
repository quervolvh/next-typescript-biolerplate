import {
    validateEmail, validateMobile, validateFullName, isNumber, containsLowerCase,
    containsUpperCase, containsNumeric
} from "utils/index";

export const quickValidation = (
    field: string,
    value: string,
    form: { [key: string]: any },
    extra: { [key: string]: any } = {},
    context?: string
) => {
    let error = [];
    let result: { [key: string]: string[] } = { ...(form.error ? form.error : {}) };
    var finalRes: { [key: string]: string[] | boolean } = {};

    if (field === "email" || (field === "email_mobile" && !isNumber(value))) {

        if (!value) error.push("Please enter email.");
        if (!validateEmail(value)) error.push("Invalid email provided.");

    } else if (field === "fullName" || field === "alias") {

        if (value.length < 2) error.push(`${field === "alias" ? "Alias" : "Name"} must be at least 2 characters long`);
        if (value.length > 50) error.push(`Provided ${field === "alias" ? "alias" : "name"} is too long`);

    } else if (field === "otp") {

        if (extra?.otpLength) {

            if ((value.length !== extra.otpLength)) {

                error.push(`Verification code must be ${extra?.otpLength} characters long`);

            }

        } else {

            if (value.length !== 4) error.push("Verification code must be 4 characters long");

        }

    } else if (field === "password") {

        const loginContext = context === "login";

        if (!loginContext && value.length < 8) error.push("Password must contain at least 8 characters.");

        if (!loginContext && !containsLowerCase(value || "")) error.push("Password must contain at least one lowercase character");

        if (!loginContext && !containsUpperCase(value || "")) error.push("Password must contain at least one uppercase character");

        if (!loginContext && !containsNumeric(value || "")) error.push("Password must contain at least one numeric character");

        if (loginContext && String(value || "").length < 6) error.push("Please enter a valid password");

        // if (!containsSpecialChar(value || "")) error.push("Password must contain at least one special character");

        if (form['confirmPassword'] && form['confirmPassword'] !== value) {

            error.push('Passwords do not match');

            if (!(result['password'] || []).find(item => item === 'Passwords do not match'))

                result['confirmPassword'] = [...(result['confirmPassword'] || []), 'Passwords do not match'];

        }

        if (form['confirmPassword'] === value)

            result['confirmPassword'] = (result['confirmPassword'] || []).filter((item: string) => item !== 'Passwords do not match');

    } else if (field === 'confirmPassword') {

        if (form['password'] && form['password'] !== value) {

            error.push('Passwords do not match');

            if (!(result['password'] || []).find(item => item === 'Passwords do not match'))

                result['password'] = [...(result['password'] || []), 'Passwords do not match'];

        }

        if (form['password'] === value)
            result['password'] = (result['password'] || []).filter(item => item !== 'Passwords do not match');

    } else if (field === "oldPassword") {

        if (value.length < 6) error.push("Old Password should contain at least 6 characters.");

    } else if (field === "amount") {

        const context = extra?.type === "add-money" ? "add" : "send";

        if (Number(value) === 0) error.push(`please enter amount to ${context}.`);

    } else if (field === "mobile" || (field === "email_mobile" && isNumber(value))) {

        const extraCondition = value.startsWith("0") && value.length === 11;

        if (!validateMobile(value) || !extraCondition) error.push("Please enter a valid phone number");

    } else if (field === "account") {

        if (!value) error.push('Please enter account number');

        if (!isNumber(value) || value.length !== 10) error.push(`Invalid account number`);

    } else if (field === "bank") {

        if (!value) error.push('Please select a bank');

    } else if (field === "narration") {

        if (value.length < 2) error.push("Narration should contain at least 2 characters!");

    } else if (field === "provider") {

        if (value.length < 1) error.push("Please select a network provider");

    } else if (field === "frequency") {

        if (value.length < 1) error.push("Please select frequency");

    } else if (field === "reminder") {

        if (value.length < 1) error.push("Please set a reminder");

    } else if (field === "title") {

        if (!value) error.push("Please enter a title");

        if (value && (value.length < 3)) error.push("Please set a valid title");

    } else if (field === "billingDate") {

        if (!value) error.push("Please enter billing date");

    } else if (field === "city") {

        if (!value) error.push("Please enter city");

    } else if (field === "state") {

        if (!value) error.push("Please enter state");

    } else if (field === "address") {

        if (!value) error.push("Please enter address");

        if (value && value.length < 3) error.push("Please enter a valid address");

    } else if (field === "recipients" ) {

        if (value?.length === 0) error.push("Please enter at least one recipient");

    } else if (field === "reason") {

        if (!value) error.push("Please enter a reason");

        if (value && value.length < 3) error.push("Please enter a valid reason");

    } else if (field === "pin") {

        if (!value) error.push("Please enter pin");

        if (value && String(value).length < 4) error.push("Pin must contain 4 digits");

        if (Object.keys(form || {}).includes('retypePin')) {

            if (form['retypePin'] && (form['retypePin'] !== value)) {

                error.push("Pins do not match");

            }

            if (!form['retypePin']) {

                error.push("Please confirm pin");

            }


            (result['pin'] || []).forEach(item => {

                if (item === "Pins do not match" && !(result['retypePin'] || []).includes("Pins do not match")) {

                    result['retypePin'] = [...(result['retypePin'] || []), "Pins do not match"];

                }

                if (item === "Please confirm pin" && !(result['retypePin'] || []).includes("Please confirm pin")) {

                    result['retypePin'] = [...(result['retypePin'] || []), "Please confirm pin"];

                }

            });

        }

        if (form['retypePin']) {

            result['retypePin'] = (result['retypePin'] || []).filter((item: string) => item !== "Please confirm pin");

        }

        if (form['retypePin'] === value) {

            result['retypePin'] = (result['retypePin'] || []).filter((item: string) => item !== "Pins do not match");

        }


    } else if (field === 'retypePin') {

        if (!value) error.push("Please enter pin");

        if (value && String(value).length < 4) error.push("Pin must contain 4 digits");

        if (Object.keys(form || {}).includes('pin')) {

            if (form['pin'] && form['pin'] !== value) {

                error.push('Pins do not match');

            }

            (result['retypePin'] || []).forEach(item => {

                if (item === "Pins do not match" && !(result['pin'] || []).includes("Pins do not match")) {

                    result['pin'] = [...(result['pin'] || []), "Pins do not match"];

                }

                if (item === "Please confirm pin" && !(result['pin'] || []).includes("Please confirm pin")) {

                    result['pin'] = [...(result['pin'] || []), "Please confirm pin"];

                }

            });

        }

        if (form['pin'] || form['retypePin']) {

            result['pin'] = (result['pin'] || []).filter((item: string) => item !== "Please confirm pin");

            result['retypePin'] = (result['retypePin'] || []).filter((item: string) => item !== "Please confirm pin");

        }

        if (form['pin'] === value) {

            result['pin'] = (result['pin'] || []).filter((item: string) => item !== "Pins do not match");

            result['confirmPin'] = (result['confirmPin'] || []).filter((item: string) => item !== "Pins do not match");

        }

    } else {

        if (field !== "recipients" && value.length < 2) error.push("Invalid credentials provided.");

    }

    if (["fullName", "otp"].includes(field)) {

        if (!validateFullName(value)) error.push("Field contains invalid characters");

    }

    if (["startDate", "endDate", "date"].includes(field)) {

        if (!value || String(value).length === 0) error.push("Please select a date");

    }

    Object.entries(result).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
            return (finalRes[key] = value);
        }

        if (value.length === 0) {
            return (finalRes[key] = false);
        }

        return (finalRes[key] = value);
    });

    return { ...finalRes, [field]: !error.length ? false : error };

}

export const errorItem = (error: { [key: string]: any }, field: string) => {
    if (Array.isArray(error?.[field]) && error?.[field].length > 0) {
        return error?.[field][error?.[field].length - 1];
    }
    return false;
}

export const getPredefinedErrors = (
    fields: Array<(string | undefined | false)> = [""],
    extra: { [key: string]: any } = {},
    context?: string
) => {

    const usableFields = fields.filter(item => typeof item === "string");

    const errorList = usableFields as Array<string>;

    const errorPlaceHolder = errorList.map((item) => quickValidation(item, "", {}, extra, context));

    let errorObject: { [key: string]: any } = {};

    errorPlaceHolder.forEach(item => {
        const key: string = Object.keys(item)[0];
        errorObject[key] = item[key];
    });

    return errorObject;

}
