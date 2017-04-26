const data=["东莞","广州","广东","广东","广东","东广","西广","深圳"];
function hideRemind(keyWord) {
    if (!keyWord.trim()) { //keyword为空
        return true;
    }
    return false;
}
function getRemind(keyWord) {
    let re = new RegExp(".*" + keyWord + ".*", "g");
    let keywords = [];
    let reminds = data.map(function (item) {
        if (item.match(re)) {
            keywords.push(item);
        } else {
            return item;
        }
    });
    re = new RegExp(".*" + keyWord + ".*", "g");
    reminds.forEach(function (item) {
        if (item && item.match(re)) {
                keywords.push(item);
        }
    });
return keywords;
}
export {hideRemind,getRemind}