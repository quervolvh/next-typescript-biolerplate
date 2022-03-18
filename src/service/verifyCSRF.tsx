import { totp } from 'service/totp';
import CryptoJS from 'crypto-js';

export function verifyCSRF(req: any, res: any) {
    return new Promise((resolve, reject) => {

        const decryptedToken = CryptoJS.AES.decrypt(req.headers["csrf-token"], process.env.NEXT_PUBLIC_REF_ENCRYPTION_KEY);

        let delta = totp(process.env.NEXT_PUBLIC_REF_KEY).validate({
            token: decryptedToken.toString(CryptoJS.enc.Utf8),
            window: 1
        });

        if (delta !== 0) {
            const err = {
                data: {
                    response: { error: "Unexpected error encountered. Cannot process your request at the moment." },
                    token: req.headers["csrf-token"]
                },
                delta
            };

            res.status(500).json(err);

        }

        resolve(req);

    })
}
