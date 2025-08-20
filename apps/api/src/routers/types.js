function okResponse(status, data) {
    return {
        status,
        data
    };
}
function errResponse(status, err) {
    return {
        status,
        err
    };
}
export { errResponse, okResponse };
