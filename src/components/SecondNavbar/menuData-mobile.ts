// Helper function to generate menu items
function generateMenuItem(label: string, url: string, className: string = '', category: string = '', specialClass: string = '') {
  const item: { label: string, url: string, className: string, category?: string, specialClass?: string } = { label, url, className };
  if (category) item.category = category;
  if (specialClass) item.specialClass = specialClass;
  return item;
}

const menuData = {
    "Your Store": {
      items: [
        generateMenuItem("Home", "#", "custom-label", "store-div"),
        generateMenuItem("Followed Games & Software", "#", "custom-label", "store-div"),
        generateMenuItem("Prefernces", "#", "custom-label", "store-div"),
        generateMenuItem("RECOMMENDITATIONS", "", "custom-tag", "store-div"),
        generateMenuItem("Discovery Queue", "#", "custom-label", "store-div"),
        generateMenuItem("New Releases Queue", "#", "custom-label", "store-div"),
        generateMenuItem("Community Recommendations", "#", "custom-label", "store-div"),
        generateMenuItem("Interactive Recommender", "#", "custom-label", "store-div"),
        generateMenuItem("Poular Among Friends", "#", "custom-label", "store-div"),
        generateMenuItem("Steam Curators", "#", "custom-label", "store-div"),
        generateMenuItem("DLC For You", "#", "custom-label", "store-div"),
        generateMenuItem("BECAUSE YOU LOVE", "", "custom-tag", "store-div"),
        generateMenuItem("Mod", "#", "custom-label", "store-div"),
        generateMenuItem("RPG", "#", "custom-label", "store-div"),
        generateMenuItem("Dark Fantasy", "#", "custom-label", "store-div"),
        generateMenuItem("Free to Play", "#", "custom-label", "store-div"),
        generateMenuItem("More Tags for You...", "#", "custom-label", "store-div"),
      ],
    },
    "New & Noteworthy": {
      items: [
        generateMenuItem("POPULAR", "", "custom-tag", "new-first-div"),
        generateMenuItem("Top Sellers", "#", "custom-label", "new-first-div"),
        generateMenuItem("Most Played", "#", "custom-label", "new-first-div"),
        generateMenuItem("New Releases", "#", "custom-label", "new-first-div"),
        generateMenuItem("Upcoming Releases", "#", "custom-label", "new-first-div"),
        generateMenuItem("NEWS & UPDATES", "", "custom-tag", "new-first-div"),
        generateMenuItem("Recently Updated", "#", "custom-label", "new-first-div"),
        generateMenuItem("PROMOS & EVENTS", "", "custom-tag", "new-second-div"),
        generateMenuItem("Special Offers", "#", "custom-label", "new-second-div"),
        generateMenuItem("Sale Events", "#", "custom-label", "new-second-div"),
        generateMenuItem("Steam Replay 2022", "#", "custom-label", "new-second-div"),
        generateMenuItem("Steam Next Fest", "#", "custom-label", "new-second-div"),
      ],
    },
    "Categories": {
      items: [
        generateMenuItem("SPECIAL SECTIONS", "", "custom-tag", "category-first-div"),
        generateMenuItem("Free to Play", "#", "custom-label", "category-first-div"),
        generateMenuItem("Demos", "#", "custom-label", "category-first-div"),
        generateMenuItem("Early Access", "#", "custom-label", "category-first-div"),
        generateMenuItem("Steam Deck", "#", "custom-label", "category-first-div"),
        generateMenuItem("Great on Deck", "#", "custom-label", "category-first-div"),
        generateMenuItem("Controller-Friendly", "#", "custom-label", "category-first-div"),
        generateMenuItem("Remote Play", "#", "custom-label", "category-first-div"),
        generateMenuItem("VR Titles", "#", "custom-label", "category-first-div"),
        generateMenuItem("VR Hardware", "#", "custom-label", "category-first-div"),
        generateMenuItem("Software", "#", "custom-label", "category-first-div"),
        generateMenuItem("Soundtracks", "#", "custom-label", "category-first-div"),
        generateMenuItem("macOS", "#", "custom-label", "category-first-div"),
        generateMenuItem("SteamOS + Linux", "#", "custom-label", "category-first-div"),
        generateMenuItem("For PC Cafés", "#", "custom-label", "category-first-div"),
        generateMenuItem("GENRES", "", "custom-tag", "category-second-div"),
        generateMenuItem("Action", "#", "custom-label", "category-second-div"),
        generateMenuItem("Adventure", "#", "custom-label", "category-second-div"),
        generateMenuItem("Role-Playing", "#", "custom-label", "category-third-div"),
        generateMenuItem("Simulation", "#", "custom-label", "category-third-div"),
        generateMenuItem("Strategy", "#", "custom-label", "category-fourth-div"),
        generateMenuItem("Sports & Racing", "#", "custom-label", "category-fourth-div"),
        generateMenuItem("Themes", "", "custom-label", "category-fifth-div"),
        generateMenuItem("Player Support", "#", "custom-label", "category-fifth-div"),
      ],
    },
  };

  // Define navigation items for the top-level menu
  const navigationItems = [
    { label: "Points Shop", url: "#" },
    { label: "News", url: "#" },
    { label: "Labs", url: "#" },
  ];

  export {menuData, navigationItems}