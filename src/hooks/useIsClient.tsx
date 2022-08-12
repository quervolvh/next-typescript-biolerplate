import { useEffect } from "react";

export const SetClientAvailability = (setClientMode: (e: boolean) => void) => {

    useEffect(() => {

        if (typeof window !== "undefined") {

            setClientMode(true);

        }

        // eslint-disable-next-line
    }, [typeof window === "undefined"]);

}
