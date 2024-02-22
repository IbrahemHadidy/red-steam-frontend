import gameData from "services/gameData";

const popularVRGames = gameData.filter(game => game.tags.includes("VR")).sort((a, b) => b.reviews.length - a.reviews.length).slice(0, 13);

export default popularVRGames;
