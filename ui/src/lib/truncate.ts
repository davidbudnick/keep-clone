export const truncateBody = (str: string, length = 75) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
}

export const truncateTitle = (str: string, length = 15) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
}
