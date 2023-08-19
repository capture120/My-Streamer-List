export function addCommasToNums(num) {
    try {
        const followers = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return followers;
    } catch (err) {
        return num;
    }
}