function bToa(base64) {
    return Buffer.from(base64, 'base64');
}
  
function aTob(value) {
    return Buffer.from(value).toString('base64');
}