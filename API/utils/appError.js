class AppError extends Error{
    constructor(message,statusCode){
        super(message);

        this.statusCode=statusCode;
        this.status = `${statusCode}`.startsWith('4')?'fail':'error'
        this.isOperational=true;
        this.messages=message;

        Error.captureStackTrace(this,this.constructor)

        this.handle();
    }
    handle() {
        // Log the error to the console
        console.error(`Error: ${this.message}`);
        // Optionally, you can also send the error response here if needed
      }
}

module.exports= AppError