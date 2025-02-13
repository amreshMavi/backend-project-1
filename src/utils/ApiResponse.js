class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400

        // If statusCode is less than 400, it is considered a successful request (true).
        // If statusCode is 400 or greater, it is considered a failure (false).
    }
}