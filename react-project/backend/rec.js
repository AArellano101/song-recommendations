const relations = require("./relations.json");

function sentence(info) {
    const recs = info[0];
    const reasons = info[1];
    const relation = info[2];

    let reccomendations = [];
    for (let i = 0; i < recs.length; i++) {
        reccomendations.push(`You will like ${recs[i]} because ${relation} ${reasons[i]}`);
    }
    return reccomendations;
}

function artist(data, dataType) {
    let artists = [];
    let reasons = []; 
    let relation = "";

    if (dataType == "personal") {
        const dataEntries = Object.entries(data);
        const qualities = Object.keys(relations);
        
        for (const [trait, qual] of dataEntries) {
            if (qualities.includes(trait)) {
                let instances = Object.keys(relations[trait]);
                if (qualities.includes(trait)) {
                    if (instances.includes(qual)) {
                        artists.push(relations[trait][qual]);
                        reasons.push(qual);
                    }
                }
            }  
        }

        relation = "you are";
    } else if (dataType == "history") {
        const artistHistory = data.map(entry => entry["artistName"])
        const artistRelations = relations["artist"];
        const artistKeys = Object.keys(artistRelations);

        for (const listen of artistHistory) {
            if (artistKeys.includes(listen) && !artists.includes(artistRelations[listen])) {
                artists.push(artistRelations[listen]);
                reasons.push(listen);
            }
        }

        relation = "you listen to";
    }

    return [artists, reasons, relation];
}

module.exports = {
    reccomend: (data, dataType) => {
        return sentence(artist(data, dataType));
    }
};