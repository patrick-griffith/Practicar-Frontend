/**
 *
 * @type {{tableItemsPerPage: int}}
 */
export const globals = {
    tableItemsPerPage: 20
}

/**
 *  Build year list structure
 *
 * @param firstItem object {}
 *
 * @returns {Array}
 */
export function yearList(firstItem = null) {
    var data = []

    if (firstItem) {
        var json = firstItem
        data.push(json)
    }

    for (var i = new Date().getFullYear(); i !== new Date().getFullYear() - 101; i--) {
        var json = {value: i, text: i}
        data.push(json)
    }
    return data
}

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}   