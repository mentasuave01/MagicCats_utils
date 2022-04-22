
import {catData} from './catDatabase.js' //Custom dataset to hidrate request from
// import fetch from 'node-fetch' ignoreme if not using node

async function catsData()  {
    const res = await fetch(`https://api.paintswap.finance/v2/sales?collections=0x2ab5c606a5aa2352f8072b9e2e8a213033e2c4c9&numToFetch=1000`);
    const paintRes = (await res.json());
    let paintCats = await paintRes.sales;
    return paintCats;
}

function hidratePaintSwapData(paintCats){
    
    for  (let i = 0; i < paintCats.length; i++) { //feel free to use .forEach() helper [I feel like a loop is more declarative]
            paintCats[i].score = catData[paintCats[i].tokenId].score
            paintCats[i].MPratio = catData[paintCats[i].tokenId].score/(paintCats[i].price/1e18)
    }

    return paintCats;
}

function sortByMPratio( paintCatsWithScore) {
    paintCatsWithScore.sort(function(a, b) {
        return b.MPratio - a.MPratio;
    });
    return paintCatsWithScore;
}


async function main() {
    const paintCats = await catsData();
    const paintCatsWithScore = hidratePaintSwapData(paintCats);
    const paintCatsWithScore_sortedByScore = sortByMPratio(await paintCatsWithScore);
    //console.log(await paintCatsWithScore_sortedByScore); just for testing
    return paintCatsWithScore_sortedByScore;    
}

main();

