import random from "random-string-generator";

export function GenerateRandomString() {
    let slug = random(6);
    return slug;
}
