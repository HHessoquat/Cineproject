const MAX_IMG_SIZE = 2 * 1024 * 1024;
const MAX_VIDEO_SIZE = 10 * 24 * 24;

function validateFileUpload(file, setErrorMsg) {
    const maxSize = file.type.startsWith('image/') ? MAX_IMG_SIZE : file.type.startsWith('video/') ? MAX_VIDEO_SIZE : null;
    if (!maxSize) {
        setErrorMsg(["Le type de fichier n'est pas valide"]);
        return false;
    }
    
    if (file.size > maxSize) {
        setErrorMsg([`Le fichier est trop volumineux. La taille maximale autorisée est de ${maxSize / (1024 * 1024)} Mo.`]);
        return false;
    }
    return true;
}
export default validateFileUpload