import * as OTPAuth from 'otpauth';

export const totp = (secrete? : string) => new OTPAuth.TOTP({
    issuer: 'Stellas',
    label: 'Make a request !',
    algorithm: 'SHA1',
    digits: 15,
    period: 15,
    secret: secrete || process.env.NEXT_PUBLIC_REF_KEY
});
