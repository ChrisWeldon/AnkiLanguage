
export default function validatePassword(pass: string) {
    var re = /^(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(pass)
};
