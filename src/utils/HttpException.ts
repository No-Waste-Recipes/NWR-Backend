class HttpException extends Error{
    private status: any;
    private data: any;
    constructor(status, message, data) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpException;
