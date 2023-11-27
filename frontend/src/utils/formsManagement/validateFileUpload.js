const MAX_IMG_SIZE = 2 * 1024 * 1024;
const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMG_TYPE = ["jpg", "jpeg", "png", "webp"];
const ALLOWED_VIDEO_TYPE = ["mp4", "mov", "mkv"];

function validateFileSize(file, setErrorMsg) {
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

function validateImageType(file, setErrorMsg) {
    const extension = getExtension(file);
    
    if (!ALLOWED_IMG_TYPE.includes(extension)) {
        setErrorMsg(["Les fichiers images doivent être au format jpg, jpeg, png ou webp"]);
        return false;
    }
    return true;
}

function validateVideoType(file, setErrorMsg) {
    const extension = getExtension(file);
    
    if (!ALLOWED_VIDEO_TYPE.includes(extension)) {
        setErrorMsg(["Les fichiers video doivent être au format mp4, mov ou mkv"]);
        return false;
    }
    return true;
}

function getExtension(file) {
    const fileName = file.name.toLowerCase();
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    return extension;
}

function validateFileUpload(name, file, setErrorMsg){
    let isFileTypeCompliant;
    let isFileSizeCompliant;
    
    setErrorMsg([]);
    
    if (name === "posterFile" || name === "coverImgFile") {
        isFileTypeCompliant = validateImageType(file, setErrorMsg);
    }else {
        isFileTypeCompliant = validateVideoType(file, setErrorMsg);
    }
    
    if (!isFileTypeCompliant) {
        return false;
    }
    
    isFileSizeCompliant = validateFileSize(file, setErrorMsg);
    
    return isFileSizeCompliant;
}

export default validateFileUpload