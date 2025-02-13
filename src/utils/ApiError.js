// It is specifically designed to handle API-related errors in a structured way.
// This class extends the native Error class, meaning it inherits all properties and methods of Error, while also adding additional functionality specific to API error handling.

class ApiError extends Error{
    constructor(
        statusCode, // The HTTP status code representing the type of error (e.g., 400 for Bad Request, 500 for Internal Server Error).
        message= "Something went wrong",
        errors= [],
        stack= ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack) {
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.
            constructor)
        }
    }

}

export {ApiError}