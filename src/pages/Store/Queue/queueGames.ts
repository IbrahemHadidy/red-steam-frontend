interface queueGame {
    imageNumber: string;
    imageLink: string;
  }

const queueGames: queueGame[] = [
    {
        imageNumber:"1",
        imageLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/2375550/header.jpg"
    },
    {
        imageNumber:"2",
        imageLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg"
    },
    {
        imageNumber:"3",
        imageLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/2103140/header.jpg"
    },
    {
        imageNumber:"4",
        imageLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg"
    },
]

export default queueGames;