var crypto = require('crypto');
const uuidv4 = require('uuid/v4');

const object_pattern = "";
const experiment_pattern = 'BAY-1234';
const hotel_id = 1;
console.log(`Experiment: '${experiment_pattern}', HotelId: '${hotel_id}'`)
//const experiment_pattern = uuidv4();



Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

const id = hotel_id;// 000000001
// var id = getRandomIntInclusive(0, 100);
const source = `${experiment_pattern},${id.pad(7)}`;

const hash = crypto.createHash('md5').update(source).digest("hex");
//var raw_variant = parseInt(hash, 16) / max_size;
const raw_variant = parseInt(hash.substr(0, 6), 16) / 16777215;

if (raw_variant >= 0.666666667) {
    console.log('variant -> B');
} else if (raw_variant >= 0.333333333) {
    console.log('variant -> A2');
} else {
    console.log('variant -> A1');
}
