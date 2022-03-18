import Cors from 'cors'
import { NextApiResponse } from 'next';

// Initializing the cors middleware
export const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

type genericObj = { [key: string]: any };

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req: genericObj, res: genericObj, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const setResHeader = (

    res: NextApiResponse,
    header: string[]
    
) => {

    res.setHeader(header[0], header[1])

}
