define('utils', [], function () {
    var isVector = function (v) {
        return v.x && v.y && typeof v.x === 'number' && typeof v.y === 'number';
    },
    vLen = function (v) {
        !isVector(v) && console.error('the parameter is not a vector.');

        return Math.sqrt(v.x * v.x + v.y * v.y);
    },
    vSub = function (v1, v2) {
        !(isVector(v1) && isVector(v2)) && console.error('the parameter is not a vector.');

        return { x: v1.x - v2.x, y: v1.y - v2.y };
    },
    toJson = function (rElem) {
        return JSON.stringify({
            type: rElem.type,
            attrs: rElem.attrs,
            transform: rElem.matrix.toTransformString(),
            id: rElem.id
        });
    },
   fromJson = function (paper, elJson) {
       if (typeof elJson === 'string') elJson = JSON.parse(elJson);

       return paper[elJson.type]().attr(elJson.attrs).transform(elJson.transform);
   };

   return {
        vLen: vLen,
        vSub: vSub,
        toJson: toJson,
        fromJson: fromJson
    };
});