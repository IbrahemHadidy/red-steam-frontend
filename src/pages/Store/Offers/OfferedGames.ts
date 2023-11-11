// IMPORTANT !!
// Change the database structre if you will change the style of the slides to suit it


interface OfferedGame {
    offerLink: string;
    image: string;
    offerType?: string;
    endTime?: string;
    beforeDiscountPrice?: string;
    discountPrice?: string;
    discountPercentage: string;
  }
  
  const offeredGames: OfferedGame[] = [
    {
      // Bus Simulator 21 Next Stop
      offerLink: "https://store.steampowered.com/app/976590",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/6fadee9926690eb19c409485/spotlight_image_english.jpg",
      offerType: "FREE WEEKEND",
      endTime: "6 Nov @ 8:00pm.",
      beforeDiscountPrice: "$34.99",
      discountPrice:"$20.99 USD",
      discountPercentage: "-40%",
    },
    {
      // Attack on Titan 2 - A.O.T.2
      offerLink: "https://store.steampowered.com/app/601050",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/fbad60ab72af63798c1dff9c/spotlight_image_english.jpg",
      offerType: "MIDWEEK DEAL",
      endTime: "13 Nov @ 8:00pm.",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$29.99 USD",
      discountPercentage: "-50%",
    },
    {
      // Mass Effect™ Legendary Edition
      offerLink: "https://store.steampowered.com/app/1328670",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/03ccac738e4e37f31f64e030/spotlight_image_english.jpg",
      offerType: "MIDWEEK DEAL",
      endTime: "9 Nov @ 8:00pm.",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$9.59 USD",
      discountPercentage: "-84%",
    },
    {
      // Shadows of Doubt
      offerLink: "https://store.steampowered.com/app/986130",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/257d4e156bf40b986527e411/spotlight_image_english.jpg",
      offerType: "MIDKEND DEAL",
      endTime: "13 Nov @ 8:00pm.",
      beforeDiscountPrice: "$19.99",
      discountPrice:"$15.99 USD",
      discountPercentage: "-20%",
    },
    {
      // Age of Wonders 4
      offerLink: "https://store.steampowered.com/app/1669000",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/f99b53e4fc811add25b5ada0/spotlight_image_english.jpg",
      offerType: "MIDWEEK DEAL",
      endTime: "13 Nov @ 8:00pm.",
      beforeDiscountPrice: "$49.99",
      discountPrice:"$34.99 USD",
      discountPercentage: "-30%",
    },
  ];

  const specialOffers: OfferedGame[] = [
    {
      // Superliminal
      offerLink: "https://store.steampowered.com/app/1049410/Superliminal/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1049410/header.jpg",
      beforeDiscountPrice: "$19.99",
      discountPrice:"$7.99 USD",
      discountPercentage: "-60%",
    },
    {
      // DEVOUR
      offerLink: "https://store.steampowered.com/app/1274570/DEVOUR/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1274570/header.jpg",
      beforeDiscountPrice: "$4.99",
      discountPrice:"$3.99 USD",
      discountPercentage: "-20%",
    },
    {
      // Residend Evil Village Gold Edition
      offerLink: "https://store.steampowered.com/sub/764692/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/subs/764692/header_ratio.jpg",
      beforeDiscountPrice: "$49.99",
      discountPrice:"$19.99 USD",
      discountPercentage: "-60%",
    },
    {
      // Bloons TD 6
      offerLink: "https://store.steampowered.com/app/960090/Bloons_TD_6/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/960090/header.jpg",
      beforeDiscountPrice: "$13.99",
      discountPrice:"$4.19 USD",
      discountPercentage: "-70%",
    },
    {
      // Graveyard Keeper
      offerLink: "https://store.steampowered.com/app/599140/Graveyard_Keeper/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/599140/header.jpg",
      beforeDiscountPrice: "$19.99",
      discountPrice:"$3.99 USD",
      discountPercentage: "-80%",
    },
    {
      // Marvel's Guardians of the Galaxy
      offerLink: "https://store.steampowered.com/app/1088850/Marvels_Guardians_of_the_Galaxy/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1088850/header.jpg",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$14.99 USD",
      discountPercentage: "-75%",
    },
    {
      // Sniper Elite 5
      offerLink: "https://store.steampowered.com/app/1029690/Sniper_Elite_5/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1029690/header.jpg",
      beforeDiscountPrice: "$49.99",
      discountPrice:"$14.99 USD",
      discountPercentage: "-70%",
    },
    {
      // Resident Evil Village
      offerLink: "https://store.steampowered.com/sub/678069/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/subs/678069/header_ratio.jpg",
      beforeDiscountPrice: "$39.99",
      discountPrice:"$15.99 USD",
      discountPercentage: "-60%",
    },
    {
      // Detroit: Become Human
      offerLink: "https://store.steampowered.com/app/1222140/Detroit_Become_Human/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/header.jpg",
      beforeDiscountPrice: "$39.99",
      discountPrice:"$15.99 USD",
      discountPercentage: "-30%",
    },
    {
      // Sun Haven
      offerLink: "https://store.steampowered.com/app/1432860/Sun_Haven/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1432860/header.jpg",
      beforeDiscountPrice: "$24.99",
      discountPrice:"$17.49 USD",
      discountPercentage: "-30%",
    },
    {
      // Sniper Elite 4
      offerLink: "https://store.steampowered.com/app/312660/Sniper_Elite_4/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/312660/header.jpg",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$5.99 USD",
      discountPercentage: "-90%",
    },
    {
      // Monster Hunter: World
      offerLink: "https://store.steampowered.com/app/582010/Monster_Hunter_World/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg",
      beforeDiscountPrice: "$29.99",
      discountPrice:"$14.99 USD",
      discountPercentage: "-50%",
    },
    {
      // Far Cry® 6
      offerLink: "https://store.steampowered.com/app/2369390/Far_Cry_6/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$14.99 USD",
      discountPercentage: "-75%",
    },
    {
      // Rise of the Tomb Raider™
      offerLink: "https://store.steampowered.com/app/391220/Rise_of_the_Tomb_Raider/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/391220/header.jpg",
      beforeDiscountPrice: "$29.99",
      discountPrice:"$5.99 USD",
      discountPercentage: "-80%",
    },
  ]
  
  export { offeredGames, specialOffers };
  