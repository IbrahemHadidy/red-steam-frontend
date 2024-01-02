import gameData from "../../Game/gameData";

// IMPORTANT !!
// Change the slice values if you will change the style of the slides to suit it

export const offeredGames = gameData.filter(game => (game.discount && game.offerType !== "SPECIAL PROMOTION")).slice(0, 12);
export const specialOffers = gameData.filter(game => (game.discount && game.offerType === "SPECIAL PROMOTION")).slice(0, 25);
