import Time from "./Time";

let data = [
    "fox",
    "quick",
    "brown",
    "no",
    "mike",
    "milk",
    "random",
    "something",
    "okish",
    "helpfull"
];

const generate = (limit , extend=[]) => {
    data = [...data , ...extend];
    let bottle = [];

    for(let j=0;j<limit;j++){
        let title = "";
        for(let i=0;i<5;i++){
            title += data[Math.floor(Math.random()*data.length)]+" ";
        }
        title = title.trim()+".mp4";
        let duration = new Time().format(Math.floor(Math.random()*1000));
        let thumbnail = `https://random.imagecdn.app/250/150?q=${Math.random()}`
        bottle.push({title , duration , thumbnail});
    }
    return bottle;
}

export default generate;