const BASE_URL=`https://superheroapi.com/api.php/1465107837320516`;
let superheroes = [];
let iterable = 0;
let imperialMeas = false;
let lastid = 0;
let srchIDS = [];
let recentSearches = [0, 1, 2]
let recentIDS = [0, 1, 2]

function searches(id, strength) {
    this.id = id;
    this.strength = strength;
}

function Superhero(nameItr, name, id, imgURL, publisher, eyeColor, hairColor) {
    this.nameItr = nameItr;
    this.name = name;
    this.id = id;
    this.imgURL = imgURL;
    this.publisher = publisher;
    this.eyeColor = eyeColor;
    this.hairColor = hairColor;
}
//combat durability intelligence power speed cstrenght
async function getSuperheroes() {
    try {
        console.log("Try entered")
        for (let i=1; i <= 732; i++) {
            if (i == 732) {
                iterable = 731;
                console.log("Finished fetching");
                console.log(superheroes);
                break;
            }
            let response = await fetch(`${BASE_URL}/${i}`);
            let data = await response.json()
            .then(json => {
                document.getElementById("fetchCount").innerText = `${i} / 731`;
                iterable = i;
                superheroes[i] = new Superhero(json.name.toLowerCase(), json.name, i, json.image.url, json.biography.publisher, json.appearance["eye-color"], json.appearance["hair-color"]);
            });
        }
    }
    catch(error) {
        console.error(`Fetch fatal error: ${error}`);
    }
} 
getSuperheroes();
//combat durability intelligence power speed cstrenght
// return id CHANGE 50 TO 731 CHANGE IT

const ddsr = () => {
    /*if (document.getElementById("userInput").value.length == 0) {
        document.getElementById("option1").innerText = `${lastNames[0]}`;
        document.getElementById("publisher1").innerText = `${lastNames[0]}`;
        document.getElementById("option2").innerText = `${lastNames[1]}`;
        document.getElementById("publisher2").innerText = `${lastNames[1]}`;
        document.getElementById("option3").innerText = `${lastNames[2]}`;
        document.getElementById("publisher3").innerText = `${lastNames[2]}`;
        return
    }*/
    console.log(lookup(document.getElementById("userInput").value, true));
}


const search = () => {
    switch (isNaN(document.getElementById("userInput").value)) {
        case true:
            let idl = lookup(document.getElementById("userInput").value, false);
            idl = Number(idl);
            document.getElementById("superheroImage").src = `${superheroes[idl].imgURL}`
            document.getElementById("superheroName").innerText = `${superheroes[idl].name}`
            updateScreen(idl);
            break;
        case false:
            let id = document.getElementById("userInput").value;
            id = Number(id);
            document.getElementById("superheroImage").src = `${superheroes[id].imgURL}`
            document.getElementById("superheroName").innerText = `${superheroes[id].name}`
            updateScreen(id);
            break;
        default:
        console.error("Fatal lookup error")
        break;
    }
}

//combat durability intelligence power speed cstrenght
async function updateScreen(id) {
    lastid = id;
    let stats = await fetch(`${BASE_URL}/${id}`);
    let newdata = await stats.json()
         .then(json => {
            //POWERSTATS PARAG 2
            document.getElementById("combat").innerText = `${json.powerstats.combat}`
            document.getElementById("durability").innerText = `${json.powerstats.durability}`
            document.getElementById("intelligence").innerText = `${json.powerstats.intelligence}`
            document.getElementById("power").innerText = `${json.powerstats.power}`
            document.getElementById("speed").innerText = `${json.powerstats.speed}`
            document.getElementById("cstrenght").innerText = `${json.powerstats.strength}`

            //APPEARANCE PARAG 1
            switch (imperialMeas) {
                case true:
                document.getElementById("height").innerText = `${json.appearance.height[0]}"`
                document.getElementById("weight").innerText = `${json.appearance.weight[0]}`
                break;
                case false:
                    document.getElementById("height").innerText = `${json.appearance.height[1]}`
                    document.getElementById("weight").innerText = `${json.appearance.weight[1]}`
                break;
            }
            document.getElementById("gender").innerText = `${json.appearance.gender}`
            document.getElementById("race").innerText = `${json.appearance.race}`
            document.getElementById("alignment").innerText = `${json.biography.alignment}`
            document.getElementById("publisher").innerText = `${json.biography.publisher}`
            document.getElementById("haCol").innerText = `${superheroes[id].hairColor}`
            document.getElementById("eyCol").innerText = `${superheroes[id].eyeColor}`


            //PARAG 3
            let als = ['', '', '']
            for (let i=0; i <= json.biography.aliases.length-1; i++) {
                als[i] = json.biography.aliases[i]
            }
            document.getElementById("ali1").innerText = `${als[0]}`
            document.getElementById("ali2").innerText = `${als[1]}`
            document.getElementById("ali3").innerText = `${als[2]}`
            document.getElementById("occupation").innerText = `${json.work.occupation}`
        });
}

const lookup = (string, flag) => {
    let options = [];
    let strenght = 0;
    let strid = 0;
    let strongest = 0;
    string = string.toString().toLowerCase();
    for (let i=1; i <= iterable; i++) {
        console.log(i);
        strenght=0;
        try {
            if (superheroes[i].nameItr.includes(string)) {
                strenght = (string.length - 1) / (superheroes[i].nameItr.length - 1);
                //console.log(`match: ${superheroes[i].nameItr}\nstrenght: ${strenght}`)
            } else continue;
        }
        catch (error) {
            console.error(`Lookup error: ${error}`);
            strenght = 0;
        }
        if (!flag) {
            if (strenght > strongest) {
                strid = i;
                strongest = strenght;
            }
        } else {
            console.log("Making object");
            let opt = new searches(i, strenght)
            options.push(opt);
        }
    }
    //console.log(`ENDING LOG\nSTRONGEST:${strongest}\nWORD:${superheroes[strid].name}`)
    if (flag) {
        let finished = false;
        let stregs = [];
        for (let i=0; i <= options.length-1; i++) {
            stregs[i] = options[i].strength
        }
        console.log(options, stregs);
        let newopts = findIndicesOfMax(stregs, 3);
        let newstID = options[newopts[0]].id;
        console.log(`NEWOPT 1: ${newopts[0]}\nNO1 ID: ${options[newopts[0]].id}`);
        document.getElementById("option1").innerText = `${superheroes[options[newopts[0]].id].name}`;
        document.getElementById("publisher1").innerText = `${superheroes[newstID].publisher}`;
        srchIDS[0] = options[newopts[0]].id;
        newstID = options[newopts[1]].id;
        document.getElementById("option2").innerText = `${superheroes[options[newopts[1]].id].name}`;
        document.getElementById("publisher2").innerText = `${superheroes[newstID].publisher}`;
        srchIDS[1] = options[newopts[1]].id;
        newstID = options[newopts[2]].id;
        document.getElementById("option3").innerText = `${superheroes[options[newopts[2]].id].name}`;
        document.getElementById("publisher3").innerText = `${superheroes[newstID].publisher}`;
        srchIDS[2] = options[newopts[2]].id;
    return strid;
    }
}

function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(a, b) { return inp[b] - inp[a]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}



/*let findTL = (arr) => {
    console.log("FINTL SEQUENCE");
    let strval = [];
    let indexN = 0;
    let pusher = 0;
    for (let i=0; i <= 2; i++) {
        for (let j=0; j<=arr.length-1; j++) {
            if (arr[j] > pusher) {
                pusher = arr[j];
                indexN = j;
            }
        }
        strval.push(pusher);
        arr = arr.splice(indexN, 1);
    }
    return strval;
}*/

const changemeasure = () => {
    switch (imperialMeas) {
        case true:
            imperialMeas = false;
            break;
        case false:
            imperialMeas = true;
            break;
    }
    updateScreen(lastid);
}


const displayDD = () => {
    document.getElementById("dd").style.display = "block";    
    ddsr();

}

const displayXX = () => {
    document.getElementById("dd").style.display = "none";    
}

const bt1p = () => {
    let id = srchIDS[0];
    id = Number(id);
    /*lastSearches = lastSearches.unshift(id);
    lastNames = lastNames.unshift(superheroes[id].name);
    lastPubs = lastNames.unshift(superheroes[id].publisher);*/
    document.getElementById("superheroImage").src = `${superheroes[id].imgURL}`
    document.getElementById("superheroName").innerText = `${superheroes[id].name}`
    document.getElementById("userInput").value = `${superheroes[id].name}`
    updateScreen(id);
}

const bt2p = () => {
    let id = srchIDS[1];
    id = Number(id);
    /*lastSearches = lastSearches.unshift(id);
    lastNames = lastNames.unshift(superheroes[id].name);
    lastPubs = lastNames.unshift(superheroes[id].publisher);*/
    document.getElementById("superheroImage").src = `${superheroes[id].imgURL}`
    document.getElementById("superheroName").innerText = `${superheroes[id].name}`
    document.getElementById("userInput").value = `${superheroes[id].name}`
    updateScreen(id);
}

const bt3p = () => {
    let id = srchIDS[2];
    id = Number(id);
    /*lastSearches = lastSearches.unshift(id);
    lastNames = lastNames.unshift(superheroes[id].name);
    lastPubs = lastNames.unshift(superheroes[id].publisher);*/
    document.getElementById("superheroImage").src = `${superheroes[id].imgURL}`
    document.getElementById("superheroName").innerText = `${superheroes[id].name}`
    document.getElementById("userInput").value = `${superheroes[id].name}`
    updateScreen(id);
}

const handleImage = () => {
    document.getElementById("mainframe").src = "https://i.ibb.co/9Nh1RMh/404.png";
}

document.getElementById("submitBtn").addEventListener("click", search, false);
let msrm = document.getElementById("swMsm");
msrm.addEventListener("click", changemeasure, false);
document.getElementById("userInput").addEventListener("input", displayDD, false);
document.getElementById("xr").addEventListener("click", displayXX, false);
document.getElementById("option1").addEventListener("click", bt1p, false);
document.getElementById("option2").addEventListener("click", bt2p, false);
document.getElementById("option3").addEventListener("click", bt3p, false);

//404 image below
document.getElementById('img').addEventListener('error', handleImage, false);

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        search();
    }
});
/*.dropdown {
    position: relative;
    display: inline-block;
}*/



