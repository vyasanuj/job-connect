class ApiError extends Error {
    constructor(
        statuscode ,
        message = "",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statuscode = statuscode
        this.data = "null"
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
    toResponse() {
        return {
          status: this.statusCode,
          success: this.success,
          message: this.message,
          errors: this.errors,
          data: this.data,
        };
      }


}
export {ApiError}