export function prettyDate(dateString) {
    return new Date(dateString.split('T')[0]).toDateString();
}

export function isEmpty(arr) {
    return arr.length === 0;
}
