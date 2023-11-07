interface OfferedGame {
    offerLink: string;
    image: string;
    offerType?: string;
    endTime?: string;
    beforeDiscountPrice?: string;
    discountPrice?: string;
    discountPrecentage: string;
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
      discountPrecentage: "-40%",
    },
    {
      // Exoprimal
      offerLink: "https://store.steampowered.com/app/1286320",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/86026647f809dfac21032f50/spotlight_image_english.jpg",
      offerType: "FREE WEEKEND",
      endTime: "6 Nov @ 8:00pm.",
      beforeDiscountPrice: "$34.99",
      discountPrice:"$20.99 USD",
      discountPrecentage: "-40%",
    },
    {
      // Trailmakers
      offerLink: "https://store.steampowered.com/app/585420",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/4122c583ca68a70e48cd445f/spotlight_image_english.jpg",
      offerType: "WEEKEND DEAL",
      endTime: "6 Nov @ 8:00pm.",
      beforeDiscountPrice: "$34.99",
      discountPrice:"$20.99 USD",
      discountPrecentage: "-40%",
    },
    {
      // Ratchet & Clank: Rift Apart
      offerLink: "https://store.steampowered.com/app/1895880",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/081dd6d4248120f2fe9444c4/spotlight_image_english.jpg",
      offerType: "WEEKEND DEAL",
      endTime: "6 Nov @ 8:00pm.",
      beforeDiscountPrice: "$34.99",
      discountPrice:"$20.99 USD",
      discountPrecentage: "-40%",
    },
    {
      // tinyBuild
      offerLink: "https://store.steampowered.com/app/1895880",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/spotlights/cb46364f6ec47c70a1b725e4/spotlight_image_english.jpg",
      offerType: "PUBLISHER SALE",
      endTime: "6 Nov @ 8:00pm.",
      // beforeDiscountPrice: "$34.99",
      // discountPrice:"$20.99 USD",
      discountPrecentage: "Up to -40%",
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
      discountPrecentage: "-60%",
    },
    {
      // DEVOUR
      offerLink: "https://store.steampowered.com/app/1274570/DEVOUR/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1274570/header.jpg",
      beforeDiscountPrice: "$4.99",
      discountPrice:"$3.99 USD",
      discountPrecentage: "-20%",
    },
    {
      // Residend Evil Village Gold Edition
      offerLink: "https://store.steampowered.com/sub/764692/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/subs/764692/header_ratio.jpg",
      beforeDiscountPrice: "$49.99",
      discountPrice:"$19.99 USD",
      discountPrecentage: "-60%",
    },
    {
      // Bloons TD 6
      offerLink: "https://store.steampowered.com/app/960090/Bloons_TD_6/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/960090/header.jpg",
      beforeDiscountPrice: "$13.99",
      discountPrice:"$4.19 USD",
      discountPrecentage: "-70%",
    },
    {
      // Graveyard Keeper
      offerLink: "https://store.steampowered.com/app/599140/Graveyard_Keeper/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/599140/header.jpg",
      beforeDiscountPrice: "$19.99",
      discountPrice:"$3.99 USD",
      discountPrecentage: "-80%",
    },
    {
      // Marvel's Guardians of the Galaxy
      offerLink: "https://store.steampowered.com/app/1088850/Marvels_Guardians_of_the_Galaxy/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1088850/header.jpg",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$14.99 USD",
      discountPrecentage: "-75%",
    },
    {
      // Sniper Elite 5
      offerLink: "https://store.steampowered.com/app/1029690/Sniper_Elite_5/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1029690/header.jpg",
      beforeDiscountPrice: "$49.99",
      discountPrice:"$14.99 USD",
      discountPrecentage: "-70%",
    },
    {
      // Resident Evil Village
      offerLink: "https://store.steampowered.com/sub/678069/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/subs/678069/header_ratio.jpg",
      beforeDiscountPrice: "$39.99",
      discountPrice:"$15.99 USD",
      discountPrecentage: "-60%",
    },
    {
      // Detroit: Become Human
      offerLink: "https://store.steampowered.com/app/1222140/Detroit_Become_Human/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1222140/header.jpg",
      beforeDiscountPrice: "$39.99",
      discountPrice:"$15.99 USD",
      discountPrecentage: "-30%",
    },
    {
      // Sun Haven
      offerLink: "https://store.steampowered.com/app/1432860/Sun_Haven/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1432860/header.jpg",
      beforeDiscountPrice: "$24.99",
      discountPrice:"$17.49 USD",
      discountPrecentage: "-30%",
    },
    {
      // Sniper Elite 4
      offerLink: "https://store.steampowered.com/app/312660/Sniper_Elite_4/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/312660/header.jpg",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$5.99 USD",
      discountPrecentage: "-90%",
    },
    {
      // Monster Hunter: World
      offerLink: "https://store.steampowered.com/app/582010/Monster_Hunter_World/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg",
      beforeDiscountPrice: "$29.99",
      discountPrice:"$14.99 USD",
      discountPrecentage: "-50%",
    },
    {
      // Far Cry® 6
      offerLink: "https://store.steampowered.com/app/2369390/Far_Cry_6/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg",
      beforeDiscountPrice: "$59.99",
      discountPrice:"$14.99 USD",
      discountPrecentage: "-75%",
    },
    {
      // Rise of the Tomb Raider™
      offerLink: "https://store.steampowered.com/app/391220/Rise_of_the_Tomb_Raider/",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/391220/header.jpg",
      beforeDiscountPrice: "$29.99",
      discountPrice:"$5.99 USD",
      discountPrecentage: "-80%",
    },
  ]
  
  export { offeredGames, specialOffers };
  