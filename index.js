var crypto = require('crypto');
const uuidv4 = require('uuid/v4');

const object_pattern = "";
const experiment_pattern = 'BAY-1234';
console.log(`Experiment: '${experiment_pattern}'`)
//const experiment_pattern = uuidv4();



Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

//const max_size = parseInt("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", 16);
const sizes = [50, 250, 500, 1500];
sizes.forEach((size) => {
    const result = {
        A1: 0,
        A2: 0,
        B: 0,
    }

    console.log(` `);
    console.log(`--------------------- size: ${size}K ---------------------`);
    for (let i = 1; i <= size*1000; i++) {
            const id = i;// 000000001
            // var id = getRandomIntInclusive(0, 100);
            const source = `${experiment_pattern},${id.pad(7)}`;
           
            const hash = crypto.createHash('md5').update(source).digest("hex");
            //var raw_variant = parseInt(hash, 16) / max_size;
            const raw_variant = parseInt(hash.substr(0, 6), 16) / 16777215;

            if(i==1){
                console.log('source', source);
                console.log('hash', hash);
                console.log('raw_variant', raw_variant);
            }

            if (raw_variant >= 0.666666667) {
                result.B++;
            } else if (raw_variant >= 0.333333333) {
                result.A2++;
            } else {
                result.A1++;
            }

            // console.log(source);
            // console.log(hash);
            // console.log(hash.substr(0, 6));
            // console.log(parseInt(hash.substr(0, 6), 16))
            // console.log(parseInt(hash.substr(0, 6), 16)/16777215);
            if(i%1000 == 0){
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(JSON.stringify(result));
            }
    }

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    const total = result.A1 + result.A2 + result.B;
    const A1_percentage = result.A1 * 100 / total;
    const A2_percentage = result.A2 * 100 / total;
    const B_percentage = result.B * 100 / total;
    const mean_percentage = (A1_percentage + A2_percentage + B_percentage) / 3;
    const deviation_mean_percentage = (Math.abs(mean_percentage - A1_percentage) + Math.abs(mean_percentage - A2_percentage) + Math.abs(mean_percentage - B_percentage)) / 3;
    console.log(` `);
    console.log(` total: ${total}`);
    console.log(` A1: ${result.A1}(${A1_percentage} %), A2: ${result.A2}(${A2_percentage} %), B: ${result.B}(${B_percentage} %)`)
    console.log(` mean: ${mean_percentage}`);
    console.log(` deviation: ${deviation_mean_percentage}`);

    const avg = (result.A1 + result.A2 + result.B) / 3;
    const deviation_2 = ((Math.abs(avg - result.A1) + Math.abs(avg - result.A2) + Math.abs(avg - result.B)) / 3) * 100 / total;

    console.log(` deviation2: ${deviation_2}`);

    console.log(`--------------------- end of size: ${size}K ---------------------`);
    console.log(` `);
}
);


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

//console.log('4dfe4a', parseInt('4dfe4a', 16));
  //convert(substring(md5(concat(expid, hotelid)),1,6), 16,10)/convert('ffffff',16,10)