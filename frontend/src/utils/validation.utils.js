export const checkIfHasValid = (string) => {
    return string !== "" && string.length > 0
}

export const checkIfEmailIsValid = (email) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailPattern.test(email) || email == "") {
        return true;
    }
    return false;
}

