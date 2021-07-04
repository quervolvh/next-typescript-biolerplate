
export const numberFormat = (number, currency) => {

    try {

        number = Number(number);
        currency = currency || 'NGN';
        const locale = 'en-NG';

        return Intl.NumberFormat(locale.trim(), { style: 'currency', currency : currency  }).format(number);

    } catch {

        return Intl.NumberFormat('en-NG', { style: 'currency', currency: currency || 'NGN' }).format(0.00);

    }

}
