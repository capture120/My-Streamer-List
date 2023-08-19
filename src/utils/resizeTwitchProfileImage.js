export function resizeTwitchProfileImage(img_url, new_size) {
    try {
        const new_url = img_url.replace("300", `${new_size}`).replace("300", `${new_size}`);
        return new_url;
    } catch (err) {
        return img_url;
    }
    
}