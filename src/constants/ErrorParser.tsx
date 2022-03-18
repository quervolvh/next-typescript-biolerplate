export const errorParser = (message: string, context?: string) => {

    const defaultValue = message || "Unexpected error encountered while processing your request.";

    if ( context === "bank-statement" ) return message;

    if ( context === "transaction" ) return message || defaultValue ;

    switch (message) {
        case "invalid pin":
            return context === "transaction" ?
                "Incorrect PIN. Payment has been declined" :
                "Incorrect PIN. Request declined"

        case "create a transaction pin to proceed":
            return "Please create a transaction pin to make payments";
            
        case "insufficient balance":
            return "Insufficient Balance";

        default:
            return context === "bank-codes" ?
                "Error retrieving banks" :
                context === "account-enquiry" ? "Error retrieving account information" :
                    defaultValue

    }

}
