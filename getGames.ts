import axios from "axios";
// export interface Game {
//     id?: number,
//     name: string,
//     releaseYear: number,
//     sales: number,
//     minimumAge: number
// }
(async() => {

    let games : any[] = [];
    let result = await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=KEY&steamid=76561197978493365&format=json");
    
    for (let game of result.data.response.games.slice(0,50)) {
        try {
        let gameData = await axios.get("https://store.steampowered.com/api/appdetails?appids=" + game.appid);

        let data = gameData.data[game.appid].data;

        if (data.release_date.date) {
            games.push({releaseYear: new Date(data.release_date.date).getFullYear(), minimumAge: data.required_age, name: data.name, description: data.about_the_game, image: data.header_image, developer: data.developers[0], platforms: data.platforms});
        }
        } catch (e) {
            //console.log(e);
        }
    }

    games.sort((a,b) => a.age - b.age);

    console.log(JSON.stringify(games));
})();
