export const classnames = (...args: Array<string | boolean | undefined>) => {

    let ret = '';

    [...args].forEach((arr) => {
        if (arr) ret += arr + " ";
    }
    );

    return ret;
}
