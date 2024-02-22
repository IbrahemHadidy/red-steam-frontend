export type MovieEntry = VideoEntry | ImageEntry;
export interface VideoEntry { type: "video", link: string, posterLink: string }
export interface ImageEntry { type: "image", link: string, featured?: boolean }
export interface FeatureEntry { link: string, icon: string, label: string }
export interface LanguageEntry { name: string, interface: boolean, fullAudio: boolean, subtitles: boolean }
export interface SystemRequirements { req64?: boolean; mini: SystemRequirementsDetails; recommended: SystemRequirementsDetails }
export interface SystemRequirementsDetails {os?: string; cpu?: string; ram?: string; gpu?: string; dx?: string; network?: string; storage?: string; additionalNotes?: string; soundCard?: string; vrSupport?: string }
export interface ReviewEntry {user: string, type: "negative" | "positive", date: string, content: string }
export interface gamesData {
	[index: number]: gamesData;
	id: string;
	name: string;
	category: string;
	description: string;
	releaseDate: string;
	developer: { name: string, link: string };
	publisher: { name: string, link: string };
	mainImage: string;
	backgroundImage: string;
	menuImg: string;
	horizontalHeaderImage: string;
	verticalHeaderImage: string;
	smallHeaderImage: string;
	searchImage: string;
	tabImage: string;
	moviesAndImages: MovieEntry[];
	reason?: "available" | "recommended";
	tags: string[];
	discount: boolean;
	discountPercentage?: string;
	free: boolean;
	price: string;
	offerType?: string;
	offerEndDate?: string;
	discountPrice?: string;
	win: string;
	mac?: string;
	features: FeatureEntry[];
	languages: LanguageEntry[];
	link?: string;
	about: string;
	mature: boolean;
	matureDescription: string;
	req: SystemRequirements;
	legal?: string;
	reviews: ReviewEntry[];
}

const gameData: gamesData[] = [
	//1- PUBG: BATTLEGROUNDS
	{
		id: "1",
		name: "PUBG: BATTLEGROUNDS",
		category: "Free to Play Games",
		description: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.",
		releaseDate: "21 Dec, 2017",
		developer: { name: "KRAFTON, Inc.", link: ""},
		publisher: { name: "KRAFTON, Inc.", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
		verticalHeaderImage: "https://cdn.akamai.steamstatic.com/steam/apps/578080/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/578080/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2da334ea597d9588aaa8c716d71b3c2e60a69853.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_fe5340f8ea6e0d2f3899ef1e7d2ebdfc07e32f67.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1fc0cca99883a1dbaeaadfffc1492f81e4e77d32.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_66e156cf716e72096c15c132c3443e774cb2f9a5.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_034714c0f118657ac694c5b9c43bb647ed9ec051.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0ed7a688a11af33acc56a453d2c8274890cc83db.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_f148e1cd44da2972d1b61da1e12b7b3587c1f6a3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c2456a0981b61eca4e84d3ff62fff6c78d61a6d0.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_23af2e59855a833c22d0c11ca23a719f54a554ff.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4bbcaeac1ef977d962c60c1a5e4675cdd81de564.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c49417566f70eec8bf0ddbb2956b235d91504a09.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4454f310776c626a76baeca2d05fd82bd17c6ee0.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: true,
		price: "Free to Play",
		// offerType: "",
		// offerEndDate: "",
		// discountPrice:"",
		// discountPercentage: "",
		tags: ["Survival", "Shooter", "Battle Royale", "Multiplayer", "FPS", "PvP", "Third-Person Shooter", "Action", "Online Co-Op", "Tactical", "Co-op", "First-Person", "Strategy", "Early Access", "Competitive", "Third Person", "Team-Based", "Difficult", "Simulation", "Stealth"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=15", icon: "/images/ico_stats.png",       label: "Stats"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Arabic",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: false },
			{ name: "French",              interface: true, fullAudio: false, subtitles: false },
			{ name: "German",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Thai",                interface: true, fullAudio: false, subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
		],
		link: "https://www.pubg.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<strong>LAND, LOOT, SURVIVE!</strong>
		<br>
		Play PUBG: BATTLEGROUNDS for free.<br>Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds.
		<br>
		Squad up and join the Battlegrounds for the original Battle Royale experience that only&nbsp;PUBG: BATTLEGROUNDS can offer.
		<br>
		<br>
		This content download will also provide access to the BATTLEGROUNDS Test Server, which requires a separate download to play.&nbsp;
		<br>
		Optional in-game purchases available.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "64-bit Windows 10",
				cpu: "Intel Core i5-4430 / AMD FX-6300",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce GTX 960 2GB / AMD Radeon R7 370 2GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "40 GB available space",
			},
			recommended: {
				os: "64-bit Windows 10",
				cpu: "Intel Core i5-6600K / AMD Ryzen 5 1600",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "50 GB available space",
			}
		},
		legal: `© 2017 KRAFTON, Inc. <br />
		PUBG: BATTLEGROUNDS Korea and PUBG are registered trademarks or service marks of KRAFTON, Inc.`,
		reviews: [
			{user:"ibrahim", type:"negative", date: "1/12/2022", content:"bad game"},
			{user:"Mazen", type:"negative", date: "2/12/2022", content:"meh game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"negative", date: "5/12/2022", content:"bg"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//2- NARAKA: BLADEPOINT
	{
		id: "2",
		name: "NARAKA: BLADEPOINT",
		category: "Action Games",
		description: "Dive into the legends of the Far East in NARAKA: BLADEPOINT; team up with friends in fast-paced melee fights for a Battle Royale experience unlike any other. Find your playstyle with a varied cast of heroes with unique skills. More than 20 million players have already joined the fray, play free now!",
		releaseDate: "21 Aug, 2021",
		developer: { name: "24 Entertainment", link: ""},
		publisher: { name: "NetEase Games Global", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1203220/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1203220/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1203220/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1203220/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256957929/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256957929/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256982834/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256982834/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_e8e6ba2b5ab17a2604e1b2d26f07806a0a27f97e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_f031cfa839b5c3048f4bc92233b4c8472a16ef87.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_8cbd1434b967cdff395a0df9b02d6b6ad2feac4a.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_68d5f079d8bd32dca66c1514ac00a62341cb49c6.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_e1f85dd9f79c8579887a1dd3346c2b366feafc08.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_4e6ce1b347b685dd996a7b354bd0a9fce50159c5.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_077b47e9b2eaaf1f1417ed48f96b4ac6e0c673fe.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_2aded40827ab836c40afb555600c9ca8cbd26e87.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_9b52b6f209db7928077f9f18d12460c71908f9c3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_801635e241c3d2bec0305135e33576ac9c18c3ce.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: true,
		price: "Free to Play",
		// offerType: "",
		// offerEndDate: "",
		// discountPrice:"",
		// discountPercentage: "",
		tags: ["Battle Royale", "Multiplayer", "PvP", "Action", "Female Protagonist", "Massively Multiplayer", "Third Person", "Survival", "Character Customization", "Fighting", "Hack and Slash", "Swordplay", "Parkour", "Anime", "Adventure", "Mature", "Violent", "Free to Play", "Gore"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "In-App Purchases"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: true,  subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: true },
			{ name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
			{ name: "French",              interface: true, fullAudio: false, subtitles: true },
			{ name: "German",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: false, subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: true },
		],
		link: "www.narakathegame.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/1.MELEE-FOCUSED-COMBAT.png?t=1700102206">
		<br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/MELEE-FOCUSED_COMBAT.gif?t=1700102206">
		<br>
		<br>Dynamic, fast-paced and ever shifting; battle your enemies with punishing combos, parries and grit or outsmart them using lethal counters in an intense mind game.<br><br>
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/2.BOUNDLESS-MOVEMENT.png?t=1700102206">
		<br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/BOUNDLESS_MOVEMENT.gif?t=1700102206">
		<br>
		<br>
		Wall run, swoop down, and zip across mountains and buildings with ease as you hunt down unsuspecting foes using your grappling hook and parkour skills.
		<br>
		<br>
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/3.YOUR-BUILD-YOUR-PLAYSTYLE.png?t=1700102206">
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/YOUR_BUILD_YOUR_PLAYSTYLE.gif?t=1700102206"><br><br>Combine a variety of melee and ranged weapons with our cast of powerful heroes, each with customized skills and unique Ultimate moves.
		<br>
		<br>
		<br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/4.EASTERN-LEGENDS.png?t=1700102206">
		<br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/EASTERN_LEGENDS.gif?t=1700102206">
		<br>
		<br>Travel to the magnificent but dangerous land of Morus and Holoroth, where great battles have shaped a beautiful landscape inspired by Far Eastern legends.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7 64-bit or newer",
				cpu: "Intel i5 4th generation or AMD FX 6300 or equivalent",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce GTX 750TI or equivalent",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "35 GB available space",
				additionalNotes: "a) Can run at 720p/60fps; b) We advise you install the game on an SSD for a more streamlined experience. c) Requires “Windows Memory integrity and VBS enablement” to be disabled"
			},
			recommended: {
				os: "Windows 10 64-bit",
				cpu: "Intel i7 7th generation or equivalent",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce GTX 1060 6G or equivalent",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "35 GB available space",
				additionalNotes: "a) Can run at 720p/60fps; b) We advise you install the game on an SSD for a more streamlined experience. c) Requires “Windows Memory integrity and VBS enablement” to be disabled"
			}
		},
		reviews: [
			{user:"ibrahim", type:"positive", date: "4/12/2022", content:"good game"},
			{user:"Mazen", type:"positive", date: "5/12/2022", content:"nicu game"},
			{user:"mrCringe", type:"positive", date: "6/12/2022", content:"WOW EXCELENT GAME!"},
			{user:"Player20", type:"positive", date: "7/12/2022", content:"good game i guess"},
			{user:"Samy", type:"negative", date: "8/12/2022", content:"bg"},
			{user:"idiotgaming99", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//3- The Elder Scrolls® Online
	{
		id: "3",
		name: "The Elder Scrolls® Online",
		category: "Massively Multiplayer Games",
		description: "Join over 22 million players in the award-winning online multiplayer RPG and experience limitless adventure in a persistent Elder Scrolls world. Battle, craft, steal, or explore, and combine different types of equipment and abilities to create your own style of play. No game subscription required.",
		releaseDate: "4 Apr, 2014",
		developer: { name: "ZeniMax Online Studios", link: ""},
		publisher: { name: "Bethesda Softworks", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/306130/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/306130/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/306130/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/306130/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/306130/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256859758/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256859758/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256848720/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256848720/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_def2f4813a04b9ab7e8683e4dd9cfdd5326bdb2d.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_8782eebb5fc397cf245c7c366e898bf2ae26b1a0.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256719936/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256719936/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: false,
		price: "11.99",
		// offerType: "",
		// offerEndDate: "",
		// discountPrice:"",
		// discountPercentage: "",
		tags: ["RPG", "MMORPG", "Open World", "Adventure", "Fantasy", "Exploration", "Multiplayer", "Singleplayer", "Massively Multiplayer", "Action", "Character Customization", "PvP", "PvE", "Lore-Rich", "Choose Your Own Adventure", "Story Rich", "Magic", "Action RPG", "Class-Based", "Atmospheric"], // Array of tags
		win: "platform-image win",
		mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=20", icon: "/images/ico_multiPlayer.png", label: "MMO"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=13", icon: "/images/ico_cc.png",          label: "Captions available"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
		],
		link: "www.elderscrollsonline.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Experience an ever-expanding story across all of Tamriel in The Elder Scrolls Online, an award-winning online RPG. Explore a rich, living world with friends or embark upon a solo adventure. Enjoy complete control over how your character looks and plays, from the weapons you wield to the skills you learn – the choices you make will shape your destiny. Welcome to a world without limits.
		<h2>PLAY THE WAY YOU LIKE</h2>
		Battle, craft, steal, siege, or explore, and combine different types of armor, weapons, and abilities to create your own style of play. The choice is yours to make in a persistent, ever-growing Elder Scrolls world.
		<h2>TELL YOUR OWN STORY</h2>
		Discover the secrets of Tamriel as you set off to regain your lost soul and save the world from Oblivion. Experience any story in any part of the world, in whichever order you choose – with others or alone.
		<h2>A MULTIPLAYER RPG</h2>
		Complete quests with friends, join fellow adventurers to explore dangerous, monster-filled dungeons, or take part in epic PvP battles with hundreds of other players.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		Blood and gore<br>
		Sexual themes<br>
		Use of alcohol<br>
		Violence</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7 64-bit",
				cpu: "Intel® Core i3 540 or AMD A6-3620 or higher",
				ram: "3 GB RAM",
				gpu: "Direct X 11.0 compliant video card with 1GB RAM (NVidia GeForce 460 or AMD Radeon 6850) 2GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "95 GB available space",
				soundCard: "DirectX compatible sound card",
			},
			recommended: {
				os: "Windows 7/Windows 8.1 64-bit",
				cpu: "Intel® Core i5 2300 or AMD FX4350",
				ram: "8 GB RAM",
				gpu: "Direct X 11.0 compliant video card with 2GB RAM (NVIDIA® GeForce® GTX 750 or AMD Radeon™ HD 7850) or higher",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "95 GB available space",
				soundCard: "DirectX compatible sound card",
			}
		},
		legal: `©2015 ZeniMax Media Inc. The Elder Scrolls® Online: Tamriel Unlimited™ developed by ZeniMax Online Studios LLC, a ZeniMax Media company. ZeniMax, The Elder Scrolls, ESO, ESO Plus, Tamriel Unlimited, Bethesda, Bethesda Softworks and related logos are registered trademarks or trademarks of ZeniMax Media Inc. in the US and/or other countries. All Rights Reserved.
		<br><br>
		<a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fbethesda.net%2Fdocument%2Fprivacy-policy" target="_blank" rel=" noopener">Privacy Policy</a>`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"BEST MMO GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"very good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//4- Red Dead Redemption 2
	{
		id: "4",
		name: "Red Dead Redemption 2",
		category: "Adventure Games",
		description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.",
		releaseDate: "5 Dec, 2019",
		developer: { name: "Rockstar Games", link: ""},
		publisher: { name: "Rockstar Games", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1174180/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256768371/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256768371/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256768370/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256768370/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_bac60bacbf5da8945103648c08d27d5e202444ca.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "59.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "21 December",
		discountPrice:"19.79",
		discountPercentage: "67",
		tags: ["Open World", "Story Rich", "Westren", "Adventure", "Multiplayer", "Action", "Realistic", "Singleplayer", "Shooter", "Atmospheric", "Horses", "Beautiful", "Mature", "Third-Person Shooter", "Great Soundtrack", "Third Person", "Gore", "Sandbox", "First-Person", "FPS"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: false },
			{ name: "French",              interface: true, fullAudio: false, subtitles: false },
			{ name: "German",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
		],
		link: "www.rockstargames.com/reddeadredemption2",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `America, 1899.<br>
		<br>
		Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.<br>
		<br>
		Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.<br>
		<br>
		With all new graphical and technical enhancements for deeper immersion, Red Dead Redemption 2 for PC takes full advantage of the power of the PC to bring every corner of this massive, rich and detailed world to life including increased draw distances; higher quality global illumination and ambient occlusion for improved day and night lighting; improved reflections and deeper, higher resolution shadows at all distances; tessellated tree textures and improved grass and fur textures for added realism in every plant and animal.<br>
		<br>
		Red Dead Redemption 2 for PC also offers HDR support, the ability to run high-end display setups with 4K resolution and beyond, multi-monitor configurations, widescreen configurations, faster frame rates and more.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10 - April 2018 Update (v1803)",
				cpu: "Intel® Core™ i7-4770K / AMD Ryzen 5 1500X",
				ram: "12 GB RAM",
				gpu: "Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "150 GB available space",
				soundCard: "Direct X Compatible",
			},
			recommended: {
				os: "Windows 10 - April 2018 Update (v1803)",
				cpu: "Intel® Core™ i7-4770K / AMD Ryzen 5 1500X",
				ram: "12 GB RAM",
				gpu: "Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "150 GB available space",
				soundCard: "Direct X Compatible",
			}
		},
		legal: `Software license terms in game and at www.rockstargames.com/eula; online account terms at www.rockstargames.com/socialclub. Non-transferable access to special features, such as exclusive/unlockable/downloadable/multiplayer/online &amp; bonus content/services/functions, may require single-use serial code, additional fee, and/or non-transferrable online account registration (varies 13+). Special features access may require internet connection, may not be available to all users or at all times, and may be terminated/modified/offered under different terms without notice. Violation of EULA, Code of Conduct, or other policies may result in restriction or termination of access to game or online account. For info, customer &amp; tech support visit www.rockstargames.com/support. This game is fictional. It may depict people, places, companies, groups, events, buildings, and other things that are similar to those in the real world; they are not affiliated or associated in any way with this game, and such depictions are not factual. The makers/publishers/licensors of this video game do not endorse/condone/encourage any content. Unauthorized copying, alteration, reverse engineering, decompiling, transmission, public performance, rental, pay for play, or copy protection circumvention is prohibited &amp; violates EULA. Certain limits apply to purchase, use, and redemption. See EULA www.rockstargames.com/eula and Terms of Service www.rockstargames.com/legal for details.<br>
		<br>
	 Rockstar Games, Inc.  ©2005-19. Rockstar Games, Red Dead Redemption, R*, Redemption, Red Dead, Dead Eye are marks/logos/copyrights of Take-Two Interactive. Dolby and the Double-D symbols are trademarks of Dolby Laboratories. The ratings icon is a trademark of the Entertainment Software Association. All other marks and trademarks are properties of their respective owners.  All rights reserved.`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"boring game"},
			{user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
			{user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//5- Sekiro™: Shadows Die Twice - GOTY Edition
	{
		id: "5",
		name: "Sekiro™: Shadows Die Twice - GOTY Edition",
		category: "Action Games",
		description: "Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.",
		releaseDate: "21 Mar, 2019",
		developer: { name: "FromSoftware", link: ""},
		publisher: { name: "Activision", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/814380/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/814380/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/814380/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256806899/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256806899/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256770769/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256770769/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_3d6b38c382c0eafb02dc90d22f33fd292e4e5cf3.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256745700/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256745700/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256745081/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256745081/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256742445/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256742445/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256729567/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256729567/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256724898/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256724898/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: false,
		price: "59.99",
		// offerType: "SPECIAL PROMOTION",
		// offerEndDate: "21 December",
		// discountPrice:"19.79",
		// discountPercentage: "67",
		tags: ["Souls-like", "Difficult", "Action", "Singleplayer", "Ninja", "Stealth", "Adventure", "Third Person", "Open World", "Story Rich", "Violent", "Atmospheric", "Assassin", "Dark Fantasy", "Hack and Slash", "RPG", "Great Soundtrack", "Gore", "Rhythm", "Dark"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "French",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: false, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
		],
		link: "www.sekirothegame.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `This Game of the Year Edition now includes bonus content*:<br>
		<br>
		- Reflection and Gauntlet of Strength - new boss challenge modes<br>
		- Remnants - leave messages and recordings of your actions that other players can view and rate<br>
		- 3 unlockable cosmetic skins<br>
		<br>
		Game of the Year  - The Game Awards 2019<br>
		Best Action Game of 2019 - IGN<br>
		Over 50 awards and nominations<br>
		<br>
		Carve your own clever path to vengeance in the critically acclaimed adventure from developer FromSoftware, creators of the Dark Souls series.<br>
		<br>
		In Sekiro™: Shadows Die Twice you are the 'one-armed wolf', a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies, including the dangerous Ashina clan. When the young lord is captured, nothing will stop you on a perilous quest to regain your honor, not even death itself.<br>
		<br>
		Explore late 1500s Sengoku Japan, a brutal period of constant life and death conflict, as you come face to face with larger than life foes in a dark and twisted world. Unleash an arsenal of deadly prosthetic tools and powerful ninja abilities while you blend stealth, vertical traversal, and visceral head to head combat in a bloody confrontation.<br>
		<br>
		Take Revenge. Restore Your Honor. Kill Ingeniously.<br>
		<br>
		*Download required.<br>
		<br>
		Internet connection required for asynchronous Multiplayer.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7 64-bit | Windows 8 64-bit | Windows 10 64-bit",
				cpu: "Intel Core i3-2100 | AMD FX-6300",
				ram: "4 GB RAM",
				gpu: "NVIDIA GeForce GTX 760 | AMD Radeon HD 7950",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "25 GB available space",
				soundCard: "Direct X 11 Compatible",
			},
			recommended: {
				os: "Windows 7 64-bit | Windows 8 64-bit | Windows 10 64-bit",
				cpu: "Intel Core i5-2500K | AMD Ryzen 5 1400",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce GTX 970 | AMD Radeon RX 570",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "25 GB available space",
				soundCard: "Direct X 11 Compatible",
			}
		},
		legal: `©2019-2020 FromSoftware, Inc. All rights reserved. Published and distributed by Activision. ACTIVISION is a trademark of Activision Publishing Inc. All other trademarks and trade names are the properties of their respective owners.<br>
		<br>
		Dark Souls is a trademark of BANDAI NAMCO Entertainment Inc. Bandai Namco is not the publisher of SEKIRO: SHADOWS DIE TWICE. Activision has no affiliation with Dark Souls.`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"Reflex", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"UnY", type:"positive", date: "9/12/2022", content:"now that's the real gameplay and graphics"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"Hard game"},
			{user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
			{user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//6- ELDEN RING
	{
		id: "6",
		name: "ELDEN RING",
		category: "Action Games",
		description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
		releaseDate: "25 Feb, 2022",
		developer: { name: "FromSoftware Inc.", link: ""},
		publisher: { name: "FromSoftware Inc.", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1245620/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256889456/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256889456/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256875482/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256875482/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_b70e156adf9e40aed24c10fb352b7813586e7290.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_b6c4cdb36cebdbd52b97ab6e0851b7d3e41f03b3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e87a3e84890ab19f8995566e62762d5f8ed39315.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_1e3dfe515c04f4071207f01d62b85a1d6b560ced.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_c372274833ae6e5437b952fa1979430546a43ad9.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_b87601dee58f4dbc36e40a8d803dc6a53ceefe07.1920x1080.jpg", featured: true},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256864892/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256864892/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256859891/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256859891/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256843493/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256843493/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: false,
		price: "39.99",
		// offerType: "SPECIAL PROMOTION",
		// offerEndDate: "21 December",
		// discountPrice:"19.79",
		// discountPercentage: "67",
		tags: ["Souls-like", "Dark Fantasy", "Open World", "RPG", "Difficult", "Action RPG", "Third Person", "Multiplayer", "Fantasy", "Singleplayer", "Online Co-Op", "Action", "Co-op", "PvP", "Atmospheric", "Violent", "Great Soundtrack", "3D", "Character Customization", "Family Friendly"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "French",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: false, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
		],
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/extras/ER_Steam_Gif_616x260.gif?t=1700164457">
		<br>
		<br>
		THE NEW FANTASY ACTION RPG.
		<br>
		Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
		<h2>• A Vast World Full of Excitement</h2>
		A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.
		<h2>• Create your Own Character</h2>
		In addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.
		<h2>• An Epic Drama Born from a Myth</h2>
		A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.
		<h2>• Unique Online Play that Loosely Connects You to Others</h2>
		In addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10",
				cpu: "INTEL CORE I5-8400 or AMD RYZEN 3 3300X",
				ram: "12 GB RAM",
				gpu: "NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB",
				dx: "Version 12",
				network: "Broadband Internet connection",
				storage: "60 GB available space",
				soundCard: "Windows Compatible Audio Device",
			},
			recommended: {
				os: "Windows 10/11",
				cpu: "INTEL CORE I7-8700K or AMD RYZEN 5 3600X",
				ram: "16 GB RAM",
				gpu: " NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB",
				dx: "Version 12",
				network: "Broadband Internet connection",
				storage: "60 GB available space",
				soundCard: "Windows Compatible Audio Device",
			}
		},
		legal: `ELDEN RING™ &amp; ©BANDAI NAMCO Entertainment Inc. / ©2022 FromSoftware, Inc.`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"Reflex", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"UnY", type:"positive", date: "9/12/2022", content:"now that's the real gameplay and graphics"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"Hard game"},
			{user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
			{user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//7- NieR:Automata™
	{
		id: "7",
		name: "NieR:Automata™",
		category: "Action Games",
		description: "NieR: Automata tells the story of androids 2B, 9S and A2 and their battle to reclaim the machine-driven dystopia overrun by powerful machines.",
		releaseDate: "17 Mar, 2017",
		developer: { name: "Square Enix", link: ""},
		publisher: { name: "Square Enix", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/524220/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/524220/hero_capsule.jpg",
		smallHeaderImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/524220/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/524220/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/524220/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/524220/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256743980/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256743980/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256681393/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256681393/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_831e0e7c9d514393b711e9ed1d6796042521a80c.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_a6d164452c1aa00a0d7b7ca31aa76d787853b39e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_e926e3b5d440b4f244525745c7100edc2d717b85.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_edcb7633ff42d7200bcb240a1ebb1116d602d9fe.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_02d2f3f2b7b7add8e6ad50d6b9325d05fa1d7bc7.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_b55c67ac11781513183391c18ea86819e047577d.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_c538e630c5cc224124104cc42ec6220ab90b5852.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256680536/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256680536/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "31.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "21 May",
		discountPrice:"12.79",
		discountPercentage: "60",
		tags: ["Great Soundtrack", "Story Rich", "Female Protagonist", "Hack and Slash", "Action", "RPG", "Open World", "JRPG", "Anime", "Post-apocalyptic", "Singleplayer", "Robots", "Atmospheric", "Sci-fi", "Adventure", "Bullet Hell", "Spectacle fighter", "Character Action Game", "Violent"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "French",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: false, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
		],
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/524220/extras/Nier_PRE_Launch-ENG_UK_Multi_06_Mod.jpg?t=1696405478">
		<br>
		NieR: Automata tells the story of androids 2B, 9S and A2 and their battle to reclaim the machine-driven dystopia overrun by powerful machines.
		<br><br>
		Humanity has been driven from the Earth by mechanical beings from another world. In a final effort to take back the planet, the human resistance sends a force of android soldiers to destroy the invaders. Now, a war between machines and androids rages on... A war that could soon unveil a long-forgotten truth of the world.
		<br><br>
		Key Features:
		<br>
		<ul class="bb_ul"><li><strong>Action-Packed Battles</strong> 
		– Players will switch between using melee and ranged attacks in battle against hordes of enemies and challenging bosses across a variety of open field maps. The tight controls and incredibly fluid combat are simple to learn for newcomers while offering plenty of depth for more experienced action gamers. Players can perform high-speed battle actions—combining light and heavy attacks—and switch through an arsenal of weaponry while evading enemies with speed and style. 
		<br></li>
		<li>
		<strong>Beautifully Desolate Open-World</strong> 
		– The game seamlessly joins together hauntingly beautiful vistas and locations with no area loading. The environments are rendered in 60fps and contain a wealth of sub-events in addition to the main storyline. 
		<br></li>
		<li>
		<strong>Masterfully Crafted Story and Characters</strong> 
		– NieR: Automata tells the story of androids 2B, 9S and A2 and their ferocious battle to reclaim a machine-driven dystopia overrun by powerful weapons known as machine lifeforms.
		<br></li>
		<li>
		<strong>Elements of an RPG</strong> 
		– Players will obtain a variety of weapon types, level up in battle, learn new combat skills, and customise a loadout that caters to their playstyle.
		<br></li>
		<li>
		<strong>Utilise the Pod Support System to Assist In and Outside of Battle</strong> 
		– Pods can attack the enemy in both manual and lock-on modes. They can also assist outside of battle, such as allowing the player to glide through the air. Pods can be enhanced throughout the game, with upgrades including new attack methods and variations.
		<br></li>
		<li>
		<strong>“Auto Mode” Available for Beginners </strong>
		– Novice players can elect “Auto Mode” for easy attacks and evasions.
		</li></ul>`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7 /8.1 /10 64bit",
				cpu: "Intel Core i3 2100 or AMD A8-6500",
				ram: "4 GB RAM",
				gpu: "NVIDIA GeForce GTX 770 VRAM 2GB or AMD Radeon R9 270X VRAM 2GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "50 GB available space",
				soundCard: "DirectX® 11 supported",
				additionalNotes: "Mouse, keyboard and game pad (XInput only). Screen resolution: 1280x720. This product only supports MS-IME keyboard input. There is a possibility that other IME will not function correctly with it."
			},
			recommended: {
				os: "Windows 8.1 /10 64bit",
				cpu: "Intel Core i5 4670 or AMD A10-7850K",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce GTX 980 VRAM 4GB or AMD Radeon R9 380X VRAM 4GB",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "50 GB available space",
				soundCard: "DirectX® 11 supported",
				additionalNotes: "Mouse, keyboard and game pad (XInput only). Screen resolution: 1920x1080. Depending on the monitor and PC graphics card environment and setup used, this title can expand its display resolution to 4K. However, please be aware that 4K resolutions are not officially supported. This product only supports MS-IME keyboard input. There is a possibility that other IME will not function correctly with it."
			}
		},
		legal: `© 2017 SQUARE ENIX CO., LTD. All Rights Reserved. Developed by PlatinumGames Inc. Character Design by Akihiko Yoshida. NieR: Automata is a registered trademark or trademark of Square Enix Co., Ltd. SQUARE ENIX and the SQUARE ENIX logo are registered trademarks or trademarks of Square Enix Holdings Co., Ltd. All other marks are properties of their respective owners.`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"Reflex", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"UnY", type:"positive", date: "9/12/2022", content:"now that's the real gameplay and graphics"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"Hard game"},
			{user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
			{user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
			{user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//8- ARK: Survival Ascended
	{
		id: "8",
		name: "ARK: Survival Ascended",
		category: "Action Games",
		description: "ARK is reimagined from the ground-up into the next-generation of video game technology with Unreal Engine 5! Form a tribe, tame & breed hundreds of unique dinosaurs and primeval creatures, explore, craft, build, and fight your way to the top of the food-chain. Your new world awaits!",
		releaseDate: "26 Oct, 2023",
		developer: { name: "Studio Wildcard", link: ""},
		publisher: { name: "Studio Wildcard", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2399830/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/2399830/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2399830/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/2399830/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256978230/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256978230/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_44f74e86ebd6620a4f0a1f3f8ea97f73dc215e69.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_37b5cb9485658f91b856a0714a8cbdc69f1802b1.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_b3f20fcdde1cd0254fca51b342b27bff3d46e031.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_605387fbf8257c111978ed900f3346ef350fc236.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_7ff0f04cfc0eec97907eb5197c748576b15793ce.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_3c4d9089501a98a9dace96fd5c3ccbf1dfc7d8f4.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_35186898f5260a406f934132a211df6e53f39843.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_41510c0b426ecf626b3d1efd727a9fdd7feeb5ec.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_87b09e915d4447a27efb15f403de05168b8d477a.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f0ed123c9b3916e8d4af8b77936d7230091a6f48.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: false,
		price: "20.99",
		// offerType: "",
		// offerEndDate: "",
		// discountPrice:"",
		// discountPercentage: "",
		tags: ["Early Access", "Survival", "Open World", "Dinosaurs", "Adventure", "Action", "Building", "Multiplayer", "Crafting", "Base Building", "Sandbox", "Character Customization", "PvP", "PvE", "Inventory Management", "Singleplayer", "Massively Multiplayer", "RPG", "Sci-fi", "Fantasy"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",         label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=20", icon: "/images/ico_multiPlayer.png",          label: "MMO"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png",          label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=47", icon: "/images/ico_multiPlayer.png",          label: "LAN PvP"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",                 label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=48", icon: "/images/ico_coop.png",                 label: "LAN Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=39", icon: "/images/ico_coop.png",                 label: "Shared/Split Screen Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=17", icon: "/images/ico_editor.png",               label: "Includes level editor"},
			{ link: "https://store.steampowered.com/search/?category2=44", icon: "/images/ico_remote_play_together.png", label: "Remote Play Together"},


		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: false },
			{ name: "French",              interface: true, fullAudio: false, subtitles: false },
			{ name: "German",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
		],
		link: "www.playark.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Respawn into a new dinosaur survival experience beyond your wildest dreams… as ARK is reimagined from the ground-up into the next-generation of videogame technology with Unreal Engine 5! You awake on a mysterious island, your senses overwhelmed by the blinding sunlight and brilliant colors bouncing off every surface around you, the azure waters of a verdant Island lapping at your bare feet. A deep roar echoes from the misty jungle, jolting you into action, and you stand up – not afraid, but intrigued. Are you ready to form a tribe, tame and breed hundreds of species of dinosaurs and other primeval creatures, explore, craft, build, and fight your way to the top of the food-chain? Your new world awaits… step through the looking-glass and join it!
		<br><br><br>
		<strong>FEATURES</strong>
		<br><br>
		ARK: Survival Ascended has completely recreated and redesigned the artwork and worlds of ARK to take advantage of the latest in videogame technology, Unreal Engine 5, using high-end graphics features such as fully dynamic Global Illumination (“Lumen”), so that light bounces realistically of off surfaces and provides realistic reflections, and advanced mesh streaming (“Nanite”) of hundreds of millions of triangles for extreme detail.
		<br><br><br>
		Advanced new physics systems such as dynamic water so that every creature creates waves, ripples, splashes, and bubbles as they move through fluids, and fully interactive physical foliage where every blade of grass, bush, and tree reacts to characters, explosions, projectiles, and physics objects. Knock down a tree, and see it crash into other trees and disturb all the foliage on its way down to smacking into the grass below! Detect an enemy moving sneakily through the grass as it shifts and sways in response to their presence. Demolish a building and watch the pieces break apart realistically, interacting with the grass and water as they fall.
		<br><br><br>
		ARK: Survival Ascended includes access to all of ARK’s worlds, including Scorched Earth, Aberration, Extinction, ARK Genesis Part 1, ARK Genesis Part 2, and more. The Island is released now, with the subsequent expansion worlds to be added at no additional cost on a regular basis.
		<br><br><br>
		The definitive survival experience returns better than ever: design your Survivor, form a tribe, and tame, train, breed &amp; ride dinosaurs within a living ecosystem. Watch your food, water, temperature, and weather patterns. Slowly expand outwards as you harvest, build structures, farm crops, customize your visual designs, and proceed to explore to uncover the true nature of The Island and the worlds beyond. 
		<br><br><br>
		Thorough Quality of Life revamps in every area: redesigned User Interfaces, dynamic navigation for intelligent creature pathfinding, Wild Babies, Photo Mode, new Camera systems, new Map system, Tracking System, new Structures and Items, new Creatures, and much more.
		<br><br><br>
		Cross-Platform Modding: Download &amp; play new custom content created by players, including new maps, creatures, items, and game modes, through a dedicated new Mod-bowser directly within the game! Enjoy an endless stream of new ARK content as the creativity and talent of the community is fully unleashed for the first time ever across gaming platforms!
		<br><br><br>
		Cross-Platform Multiplayer: form your online tribe across different gaming platforms as you work together to survive and thrive on the ARK!
		<br><br><br>
		Supports public online multiplayer for up to 70 players, private-session multiplayer for up to 8 players, and local split-screen for 2 players.`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10/11 with updates",
				cpu: "AMD Ryzen 5 2600X, Intel Core i7-6800K",
				ram: "16 GB RAM",
				gpu: "AMD Radeon RX 5600 XT, NVIDIA GeForce 1080",
				dx: "Version 12",
				network: "Broadband Internet connection",
				storage: "70 GB available space",
				additionalNotes: "SSD Required",
			},
			recommended: {
				os: "Windows 10/11 with updates",
				cpu: "AMD Ryzen 5 3600X, Intel i5-10600K",
				ram: "32 GB RAM",
				gpu: "AMD Radeon RX 6800, NVIDIA GeForce RTX 3080",
				dx: "Version 12",
				network: "Broadband Internet connection",
				storage: "70 GB available space",
				additionalNotes: "SSD Required",
			}
		},
		reviews: [
			{user:"ibrahim", type:"negative", date: "1/12/2022", content:"bad game"},
			{user:"Mazen", type:"negative", date: "2/12/2022", content:"meh game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST OPEN WORLD GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"negative", date: "5/12/2022", content:"bg"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//9- Hogwarts Legacy
	{
		id: "9",
		name: "Hogwarts Legacy",
		category: "Adventure Games",
		description: "Hogwarts Legacy is an immersive, open-world action RPG. Now you can take control of the action and be at the center of your own adventure in the wizarding world.",
		releaseDate: "10 Feb, 2023",
		developer: { name: "Avalanche Software", link: ""},
		publisher: { name: "Warner Bros. Games", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/990080/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/990080/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/990080/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/990080/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256930504/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256930504/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_d4930d675af053dc1e61a876a34fc003e85e261f.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: false,
		price: "59.99",
		// offerType: "",
		// offerEndDate: "",
		// discountPrice:"",
		// discountPercentage: "",
		tags: ["Magic", "Fantasy", "Open World", "Singleplayer", "Adventure", "RPG", "Character Customization", "Exploration", "Story Rich", "Third Person", "Action-Adventure", "Atmospheric", "Action RPG", "Action", "Combat", "Choices Matter", "Puzzle", "Great Soundtrack", "Dark", "Family Friendly"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",         label: "HDR available"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
			{ name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
		],
		link: "www.elderscrollsonline.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<h2>About This Game</h2>
		Hogwarts Legacy is an open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be.
		<br><br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/990080/extras/HWL_Featured_Animation.png?t=1699983982">
		<br><br>
		Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards, and ultimately decide the fate of the wizarding world. Your legacy is what you make of it. Live the Unwritten.
		<br><br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/990080/extras/HWL_Features_600_Transparency.png?t=1699983982">
		<br><br>
		<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/990080/extras/HWL_Pub_Dev_Logo.png?t=1699983982">`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		Blood and gore<br>
		Sexual themes<br>
		Use of alcohol<br>
		Violence</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "64-bit Windows 10",
				cpu: "Intel Core i5-6600 (3.3Ghz) or AMD Ryzen 5 1400 (3.2Ghz)",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce GTX 960 4GB or AMD Radeon RX 470 4GB",
				dx: "Version 12",
				storage: "85 GB available space",
				additionalNotes: "SSD (Preferred), HDD (Supported), 720p/30 fps, Low Quality Settings",
			},
			recommended: {
				os: "64-bit Windows 10",
				cpu: "Intel Core i7-8700 (3.2Ghz) or AMD Ryzen 5 3600 (3.6 Ghz)",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce 1080 Ti or AMD Radeon RX 5700 XT or INTEL Arc A770",
				dx: "Version 12",
				storage: "85 GB available space",
				additionalNotes: " SSD, 1080p/60 fps, High Quality Settings",
			}
		},
		legal: `HOGWARTS LEGACY software © 2023 Warner Bros. Entertainment Inc. Developed by Avalanche Software. WIZARDING WORLD and HARRY POTTER&nbsp;Publishing Rights © J.K. Rowling. PORTKEY GAMES, HOGWARTS LEGACY, WIZARDING WORLD AND HARRY POTTER characters, names and&nbsp;related indicia © and ™ Warner Bros. Entertainment Inc.<br>
		<br>
		WARNER BROS. GAMES LOGO, WB SHIELD: ™ &amp; © Warner Bros. Entertainment Inc. (s23)`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"BEST MMO GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"very good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"yuk magik is for kids"},
		]
	},
	//10- Resident Evil 4
	{
		id: "10",
		name: "Resident Evil 4",
		category: "Action Games",
		description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.",
		releaseDate: "24 Mar, 2023",
		developer: { name: "CAPCOM Co., Ltd.", link: ""},
		publisher: { name: "CAPCOM Co., Ltd.", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/2050650/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2050650/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_184x69.jpg",
		moviesAndImages: [
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_59d1b19964cc532213df92c8287b75a0bffeb33c.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_ab807f8ad9e968a620777caf483cb6020367b9ee.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0442f7fb4327d79802c2db8ea8d23d228a28d896.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_69810f4cd155912fdfdd21da70181df7d454c874.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0596bac955340495562f3ff2538756ebd9a7f073.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0554b945aafc847d55f780f7968de00aafa968a3.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_29ffb23060c862bcbe1d1434e83d41ab10484d8e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_5a4297e594297a13f1f4c665966eb3d88d37b58d.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_440756cbcb0231dd325991d38b85d3b60d976b95.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_72888d13c9e3995f05a2886a51f0dc8791e28afa.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_d90819dc43141eee26b69a6cab43be00164adcb0.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_b9fbb8b2d7e1204a074033e9bb9a19fa54f765fb.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_d8967ced32ccbbd94f852b3843a5b76febf3ef16.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_98d9687b6acf5feff600b483d9f30e52079091e9.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_82cef99075c8e19ec71d2aae8b0a19815695c5a7.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_2f026b10ab2facd11820737453512b3b88c5a863.1920x1080.jpg", featured: true},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "44.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "21 December",
		discountPrice:"22.49",
		discountPercentage: "43",
		tags: ["Action", "Horror", "Survival Horror", "Zombies", "Singleplayer", "Survival", "Story Rich", "Cinematic", "Dark", "Realistic", "Resource Management", "Remake", "Gore", "3D", "Adventure", "Psychological Horror", "Third Person", "Action-Adventure", "Violent"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",         label: "HDR available"},


		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: true,  subtitles: false },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
		],
		link: "www.residentevil.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Survival is just the beginning.<br>
		<br>
		Six years have passed since the biological disaster in Raccoon City.
		<br>
		Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president's kidnapped daughter.<br>
		He tracks her to a secluded European village, where there is something terribly wrong with the locals.
		<br>
		And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect.
		<br><br>
		Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics,
		<br>
		Resident Evil 4 marks the rebirth of an industry juggernaut.
		<br><br>
		Relive the nightmare that revolutionized survival horror.`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10 (64 bit)",
				cpu: "AMD Ryzen 3 1200 / Intel Core i5-7500",
				ram: "8 GB RAM",
				gpu: "AMD Radeon RX 560 with 4GB VRAM / NVIDIA GeForce GTX 1050 Ti with 4GB VRAM",
				dx: "Version 12",
				network: "Broadband Internet connection",
				additionalNotes: "Estimated performance (when set to Prioritize Performance): 1080p/45fps. ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2060 required to support ray tracing.",
			},
			recommended: {
				os: "Windows 10 (64 bit)/Windows 11 (64 bit)",
				cpu: "AMD Ryzen 5 3600 / Intel Core i7 8700",
				ram: "16 GB RAM",
				gpu: "AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070",
				dx: "Version 12",
				network: "Broadband Internet connection",
				additionalNotes: "Estimated performance: 1080p/60fps ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2070 required to support ray tracing.",
			}
		},
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST HORROR GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//11- Assassin's Creed Valhalla
	{
		id: "11",
		name: "Assassin's Creed Valhalla",
		category: "Action Games",
		description: "Become a legendary Viking on a quest for glory. Raid your enemies, grow your settlement, and build your political power.",
		releaseDate: "6 Dec, 2022",
		developer: { name: "Ubisoft Montreal", link: ""},
		publisher: { name: "Ubisoft", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2208920/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/2208920/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2208920/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/2208920/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256917295/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256917310/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_103481084a59b34837113daf27c04679caf743f3.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_e7310b36689ec722d2ea4643efc15bd8fa720c67.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_c3bff917ead50268eb7708ef3bf30e07b58929e9.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_5e527e1e063ef041ca6680f503081274dcc5513a.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_83a5e49815eed62911f27240390c6735b898c13e.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "47.99",
		offerType: "WEEKEND DEAL",
		offerEndDate: "15 December",
		discountPrice:"11.99",
		discountPercentage: "75",
		tags: ["Action", "Open World", "RPG", "Adventure", "Singleplayer", "Vikings", "Action-Adventure", "Multiplayer", "Third Person", "Violent", "Action RPG", "Stealth", "Assassin", "Gore", "Story Rich", "Historical", "Female Protagonist", "Atmospheric"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=13", icon: "/images/ico_cc.png",          label: "Captions available"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
			{ name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: true },
		],
		link: "www.assassinscreed.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/extras/KeyFeature_Banner_1_Intro.png?t=1697654233">
		<br><br>
		Become Eivor, a legendary Viking raider on a quest for glory. 
		<br><br>
		- Lead epic Viking raids against Saxon troops and fortresses.
		<br>
		- Relive the visceral fighting style of the Vikings as you dual-wield powerful weapons.
		<br>
		- Challenge yourself with the most varied collection of enemies ever in Assassin's Creed.
		<br>
		- Shape the growth of your character and your clan's settlement with every choice you make.
		<br>
		- Explore a Dark Age open world, from the harsh shores of Norway to the beautiful kingdoms of England.
		<br><br>
		Includes the Forgotten Saga, a FREE new rogue-lite game mode for all Assassin's Creed® Valhalla players.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Some Nudity or Sexual Content, Frequent Violence or Gore, General Mature Content</i>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10 (versions 64 bits uniquement)",
				cpu: "AMD Ryzen 3 1200 3.1 GHz / Intel Core i5-4460 3.2 GHz",
				ram: "8 GB RAM",
				gpu: "AMD R9 380 /NVIDIA GeForce GTX 960",
				dx: "Version 12",
				storage: "160 GB available space",
			},
			recommended: {
				os: "Windows 10 (versions 64 bits uniquement)",
				cpu: "AMD Ryzen 5 1600 3.2 GHz / Intel Core i7-4790 3.6 GHz",
				ram: "8 GB RAM",
				gpu: "AMD R9 380 /NVIDIA GeForce GTX 960",
				dx: "Version 12",
				storage: "160 GB available space",
			}
		},
		legal: `© 2022 Ubisoft Entertainment. All Rights Reserved. Assassin’s Creed, Ubisoft, and the Ubisoft logo are registered or unregistered trademarks of Ubisoft Entertainment in the US and/or other countries.`,
		reviews: [
			{user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
			{user:"mrCringe", type:"positive", date: "3/12/2022", content:"BEST MMO GAME EVERRRRRR!!!!"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"very good game"},
			{user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"yuk I hate this viking killers"},
		]
	},
	//12- Tower of Fantasy
	{
		id: "12",
		name: "Tower of Fantasy",
		category: "Massively Multiplayer Games",
		description: "Embark together on your fantasy adventure! Set hundreds of years in the future on the distant planet of Aida, the shared open-world RPG, anime-infused sci-fi adventure Tower of Fantasy now is officially available on Steam.",
		releaseDate: "20 Oct, 2022",
		developer: { name: "Hotta Studio", link: ""},
		publisher: { name: "Level Infinite", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2064650/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/2064650/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2064650/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/2064650/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256962503/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256962503/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_cadfb0d5f288b6738d4299839d98e321665423c4.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_fc4ba498a4b2984fbad2c5625eb76004a33cbdaf.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_5376f537c6fdbb104626fbc112b60a65aa395298.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_03d84606f1079083a8e2ea61f021c056d0b08192.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_99464d63a0ba796a00c404687bafc369c1304f72.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_ac45db938493bfaca15ec7a1a3579c95e3d386c7.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_83dd24994bf94c3e1a7993d517c9e05224dbe865.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a113b72928b8a15ec7be1d377a9d4bdff95bd83e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_cd93032fe83f53d8ebf47fc058b0c2a275a3c3c3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_64dbd380db8e80da0c2c8d166246019863b58b88.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_f7df5329d64af42b5af1b81280c546624c34af27.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8bf607cf5eea4c64e063e0dbe03ed8de3d6a0449.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_670e1dad03d6e4b224da0c71e568ab875d1c70cd.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_0e885b85647f4f434fba43c9a4d71ad574b0c8d0.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_c561b9785c221e20965e4196444bcaa8815f8ba3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_afac4f48ca77323370ce4a1cef972ed40e23fb44.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_dd5444a5e384ffddd8fa98443bcef40ff5aaf088.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_59744b227fbb8abca13bd4fb42cd5139d063575e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_fe55eaead3a844ed7728b1aa45413cd1a31e6338.1920x1080.jpg", featured: true},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: true,
		price: "Free to Play",
		// offerType: "",
		// offerEndDate: "",
		// discountPrice:"",
		// discountPercentage: "",
		tags: ["MMORPG", "Anime", "RPG", "Open World", "Action", "Action-Adventure", "Action RPG", "3D Platformer", "Cinematic", "Free to Play", "Cartoony", "Drama", "Sci-fi", "Post-apocalyptic", "Futuristic", "Cyberpunk", "Massively Multiplayer", "Character Customization", "Story Rich", "Bullet Time"], // Array of tags
		win: "platform-image win",
		mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=20", icon: "/images/ico_multiPlayer.png", label: "MMO"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=27", icon: "/images/ico_multiPlayer.png", label: "Cross-Platform Multiplayer"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: false, subtitles: true },
			{ name: "German",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Portuguese",          interface: true, fullAudio: true,  subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: false, subtitles: true },
		],
		link: "www.toweroffantasy-global.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<strong>Embark together on your fantasy adventure!</strong>
		<br>
		<br>
		Set hundreds of years in the future on the distant planet of Aida, the shared open-world MMORPG, anime-infused sci-fi adventure Tower of Fantasy from developer Hotta Studio and publisher Level Infinite, is now available on PC and mobile platforms globally. Players will be able to experience an anime-inspired post-apocalyptic sci-fi art style, freeform character development, and exciting combat through thrilling battles and exciting open-world exploration.
		<br><br>
		In Tower of Fantasy, dwindling resources and a lack of energy have forced mankind to leave earth and migrate to Aida, a lush and habitable alien world. There, they observed the comet Mara and discovered an unknown but powerful energy called "Omnium" contained in it. They built the Omnium Tower to capture Mara, but due to the influence of Omnium radiation, a catastrophic disaster occurred on their new homeworld.
		<br><br>
		<strong>Immersive Open-World</strong>
		<br>
		Experience a vast alien world full of beautiful open vistas and imposing futuristic structures.
		<br><br>
		<strong>Unique Characters</strong>
		<br>
		Wield the unique weapons of each character that grant different gameplay styles as you explore their compelling backstories.
		<br><br>
		<strong>Grow and Explore Together</strong>
		<br>Party up with friends online and take on new adventures in the shared open world.
		<br><br>
		<strong>Epic Combat</strong>
		<br>
		Engage in epic battles against enemies of all shapes and sizes as you switch weapons and gameplay styles on the fly to unlock your own personal fighting style. 
		<br><br>
		<strong>Explore and Interact</strong>
		<br>
		Explore and interact with a vibrant living world as you discover your own journey through it.
		<br><br>
		<strong>To learn more about Tower of Fantasy, go to <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Ftoweroffantasy-global.com" target="_blank" rel=" noopener">https://toweroffantasy-global.com</a> or check out our other official channels:</strong>
		<br>
		Facebook: <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fwww.facebook.com%2FTower.of.Fantasy.Official" target="_blank" rel=" noopener">https://www.facebook.com/Tower.of.Fantasy.Official</a>
		<br>
		Instagram: <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fwww.instagram.com%2F%40toweroffantasy_official" target="_blank" rel=" noopener">https://www.instagram.com/@toweroffantasy_official</a>
		<br>
		Twitter: <a href="https://twitter.com/ToF_EN_Official" target="_blank" rel="">https://twitter.com/ToF_EN_Official</a>
		<br>
		YouTube: <a href="https://www.youtube.com/channel/UC1NbDLZjc41RQk-pV94mu_A/about" target="_blank" rel="">https://www.youtube.com/channel/UC1NbDLZjc41RQk-pV94mu_A/about</a>
		<br>
		Discord: <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fdiscord.gg%2FeDgkQJ4aYe" target="_blank" rel=" noopener">https://discord.gg/eDgkQJ4aYe</a>`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		Blood and gore<br>
		Sexual themes<br>
		Use of alcohol<br>
		Violence</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7 SP1 64-bit",
				cpu: "Intel Core i5 or equivalent",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce GT 1030",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "25 GB available space",
			},
			recommended: {
				os: "Windows 10 64-bit",
				cpu: "Intel Core i7",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce GT 1060 6GB",
				dx: "Version 12",
				network: "Broadband Internet connection",
				storage: "30 GB available space",
			}
		},
		legal: `Tower of Fantasy©2022 Hotta Studio, a Perfect World company. All Rights Reserved.<br>
		©2022 Proxima Beta Pte. Ltd. All rights reserved.`,
		reviews: [


		]
	},
	//13- Microsoft Flight Simulator 40th Anniversary Edition
	{
		id: "13",
		name: "Microsoft Flight Simulator 40th Anniversary Edition",
		category: "Simulation Games",
		description: "From gliders and helicopters to wide-body jets, fly highly detailed and accurate aircraft in the Microsoft Flight Simulator 40th Anniversary Edition. The world is at your fingertips.",
		releaseDate: "18 Aug, 2020",
		developer: { name: "Asobo Studio", link: ""},
		publisher: { name: "Xbox Game Studios", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1250410/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1250410/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1250410/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1250410/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256915896/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256915896/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_d31fefd20eda54107d0414c779d0058c8b030233.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_7bef6695583570c8714dab5acda6f08128e02f22.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_28e2168df0f5a96a0f7f90e04d6a2059fa09d32c.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_56be1573715370c1f3d4abfef38e2fa5cc9cfc08.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_8f9298573c188569875bfd96361e9d977d6dfe9a.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_abe01d181b76e98b1a1d0d837a0a69eb62f78cb0.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_72521adf4cbe068279aa8164dc32ceb63a8506b2.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_b962d1b93b3d457bc26d38e3228f60df9d877b08.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_5deecf6aec75b49ca536ec7b23a029643a240dd5.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_460489fa1a95b7e2225cefc0563a5b8a39b1371c.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_787f57f3b6b28495d167f076e651bc5220baf0f1.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_472202fe22c1dce44d7cbe962e4dde0e6dddd4d6.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_7c04f7a4875352b336a5ce9d84ca58440307c866.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_65f69dc7c5e8b95534b6ce02baf9ac0210c9aed3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_4e21663722e39ee7c2e54c4dd3576abe35e6d2a2.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_220a62d62d14c0e5058cdb81da20ced1a64d0b65.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_674c8c0019c934e65d6e128a8dba9729d31e0be4.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_85f936740bebd09faec65aa63d4e3a6b86c69336.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_df1f00e6d78d52b95a4dddffb9ce8344240275f1.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_5ed5be21412a4f147d8f1fc3fce905cc85f5967d.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_3f7151927aa6e226f497b11c20f40e10c9262ff4.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_59dc043296ef2547f9accaca1ebe7a09d16e7032.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/ss_bf0dbbcf4fc2c28bc559f6c4558aab8c4bce1ab5.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "59.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice:"35.99",
		discountPercentage: "40",
		tags: ["Simulation", "Flight", "Realistic", "Open World", "Multiplayer", "VR", "Singleplayer", "Atmospheric", "Real-Time", "Physics", "Adventure", "Colorful", "Family Friendly", "Beautiful", "TrackIR", "Surreal", "Controller", "Epic", "Short", "Psychological Horror"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_support.png",  label: "VR Supported"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",         label: "HDR available"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: true,  subtitles: false },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
		],
		link: "www.flightsimulator.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `The <strong>Microsoft Flight Simulator 40th Anniversary Edition</strong> will feature, for the first time since 2006, helicopters and gliders, the most requested enhancements by our community. 
		In addition to the helicopters and gliders, we will introduce another highly requested community feature: a true-to-life airliner, the sophisticated Airbus A-310, where nearly every single button works just as expected. 
		<br><br>Celebrate the storied history of aviation with seven famous historical aircraft in the <strong>Microsoft Flight Simulator 40th Anniversary Edition</strong>. 
		These aircraft include the 1903 Wright Flyer, the 1915 Curtiss JN-4 Jenny, the 1927 Ryan NYP Spirit of St. Louis, the 1935 Douglas DC-3, the beautiful 1937 Grumman G-21 Goose, the 1947 Havilland DHC-2 Beaver, and the famous 1947 Hughes H-4 Hercules (the largest seaplane and largest wooden plane ever made), also known as the Spruce Goose.
		<br><br>We are also adding four classic airports, including Meigs Field in Chicago, a traditional starting airport for the Microsoft Flight Simulator franchise. It is an exciting update full of aviation history to celebrate our community and the beauty of aviation! The sky is calling!
		<br><br>In summary, the <strong>40th Anniversary Edition</strong> will introduce:<br>•	4 classic commercial airports<br>•	10 glider airports<br>•	12 new aircraft<br>•	14 heliports<br>•	20 classic missions from the franchise’s past<br><br>
		The <strong>Deluxe Edition</strong> includes everything from Microsoft Flight Simulator plus 5 additional highly accurate planes with unique flight models and 5 additional handcrafted international airports.
		<br><br><strong>Deluxe Additional Aircraft</strong><br>• Diamond Aircraft DA40-TDI<br>• Diamond Aircraft DV20<br>• Textron Aviation Beechcraft Baron G58<br>• Textron Aviation Cessna 152 Aerobat<br>• Textron Aviation Cessna 172 Skyhawk<br><br><strong>Deluxe Additional Handcrafted Airports</strong><br>• Amsterdam Airport Schiphol (Netherlands)<br>• Cairo International Airport (Egypt)<br>• Cape Town International Airport (South Africa)<br>• O’Hare International Airport (USA)<br>• Adolfo Suárez Madrid–Barajas Airport (Spain)<br><br>The <strong>Premium Deluxe Edition</strong> includes everything from the Microsoft Flight Simulator Deluxe edition plus 5 additional highly accurate planes with unique flight models and 5 additional handcrafted international airports.
		<br><br><strong>Premium Deluxe Additional Aircraft</strong><br>• Boeing 787-10 Dreamliner<br>• Cirrus Aircraft SR22<br>• Pipistrel Virus SW 121<br>• Textron Aviation Cessna Citation Longitude<br>• Zlin Aviation Shock Ultra<br><br><strong>Premium Deluxe Additional Airports</strong><br>• Denver International Airport (USA)<br>• Dubai International Airport (United Arab Emirates)<br>• Frankfurt Airport (Germany)<br>• Heathrow Airport (United Kingdom)<br>• San Francisco International Airport (USA)`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10",
				cpu: "Intel i5-4460 | AMD Ryzen 3 1200",
				ram: "8 GB RAM",
				gpu: "NVIDIA GTX 770 | AMD Radeon RX 570",
				dx: "Version 11",
				storage: "150 GB available space",
				vrSupport: "SteamVR, Oculus PC, or OpenXR. Keyboard and mouse required"
			},
			recommended: {
				os: "Windows 10",
				cpu: "Intel i5-8400 | AMD Ryzen 5 1500X",
				ram: "16 GB RAM",
				gpu: "NVIDIA GTX 970 | AMD Radeon RX 590",
				dx: "Version 11",
				storage: "150 GB available space",
			}
		},
		legal: "Microsoft Studios © 2020 Microsoft Corporation",
		reviews: [
			{user:"Mazen", type:"negative", date: "2/12/2022", content:"meh game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//14- Phasmophobia
	{
		id: "14",
		name: "Phasmophobia",
		category: "Indie Games",
		description: "Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost-hunting equipment at your disposal in order to gather as much evidence as you can.",
		releaseDate: "18 Sep, 2020",
		developer: { name: "Asobo Studio", link: ""},
		publisher: { name: "Xbox Game Studios", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/739630/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/739630/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/739630/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/739630/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/739630/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256906135/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256906135/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256776660/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256776660/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_c88170bed9bf8690963323d20e3f9e836cb9aed9.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_f0377c02897de8831a5f032f13a6dc0f994516d5.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_ce1062b9312afbc12000f980087ede8fa718445d.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_8032ff1ebe2aad6871c45b30458d7a6c868f2212.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_b446d0ca191cf5a183ac3cc9538a59aa7575c14c.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_dcf3fde71a8104c068d9fd1c122361af9677737a.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/ss_d33aaa88ff7429590a1ead0b9cced32df2c38696.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "7.79",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "6.23",
		discountPercentage: "20",
		tags: ["Horror", "Online Co-Op", "Multiplayer", "Psychological Horror", "Co-op", "VR", "Supernatural", "First-Person", "Investigation", "Dark", "Adventure", "Detective", "Mystery", "3D", "Early Access", "Thriller", "Indie", "Action", "Tactical", "Singleplayer"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",           label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_input_motion.png",label: "Tracked Controller Support"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_support.png",     label: "VR Supported"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png",    label: "Remote Play on Tablet"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "French",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "German",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
		],
		link: "http://kineticgames.co.uk",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Phasmophobia is a 4-player, online co-op, psychological horror game. 
		You and your team of paranormal investigators will enter haunted locations filled with paranormal activity and try to gather as much evidence as you can. 
		Use your ghost-hunting equipment to find and record evidence to sell on to a ghost removal team.
		<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/739630/extras/investigate.png?t=1702309974"><br><br>
		<ul class="bb_ul"><li><strong>Immersive Experience:</strong> Realistic graphics and sounds as well as a minimal user interface ensure a totally immersive experience that will keep you on your toes.
		<br></li><li><strong>Unique Ghosts:</strong> Identify over 20 different ghost types, each with unique traits, personalities, and abilities to make each investigation feel different from the last.
		<br></li><li><strong>Equipment:</strong> Use well-known ghost-hunting equipment such as EMF Readers, Spirit Boxes, Thermometers, and Night Vision Cameras to find clues and gather as much paranormal evidence as you can. 
		Find Cursed Possessions that grant information or abilities in exchange for your sanity.
		<br></li><li><strong>Full Voice Recognition: </strong> The Ghosts are listening! Use your actual voice to interact with the Ghosts through Ouija Boards and EVP Sessions using a Spirit Box.
		</li></ul><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/739630/extras/play_your_way.png?t=1702309974"><br><br><ul class="bb_ul"><li><strong>Locations:</strong> Choose from over 10 different haunted locations, each with unique twists, hiding spots, and layouts.
		<br></li><li><strong>Game Modes:</strong> With 5 default difficulties and hand crafted weekly challenges, there are plenty of ways to test your skills.<br></li><li><strong>Teamwork:</strong> Dive in head first, get your hands dirty searching for evidence while fighting for your life. 
		If you're not feeling up to the task, play it safe and support your team from the truck by monitoring the investigation with CCTV and motion sensors.
		<br></li><li><strong>Custom Difficulty:</strong> Create your own games to tailor the difficulty to your or your group's needs, with proportional rewards and come up with crazy game modes of your own!
		</li></ul><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/739630/extras/multiplayer.png?t=1702309974"><br><br><ul class="bb_ul"><li><strong>Co-operate:</strong> Play alongside your friends with up to 4 players in this co-op horror where teamwork is key to your success.
		<br></li><li><strong>Play together:</strong> Phasmophobia supports all players together, play with your friends with any combination of input types.</li></ul>`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10 64Bit",
				cpu: "Intel Core i5-4590 / AMD Ryzen 5 2600",
				ram: "8 GB RAM",
				gpu: "NVIDIA GTX 970 / AMD Radeon R9 390",
				dx: "Version 11",
				storage: "150 GB available space",
				vrSupport: "SteamVR, Oculus PC, or OpenXR. Keyboard and mouse required",
				additionalNotes: "Minimum Specs are for VR, lower specs may work for Non-VR."
			},
			recommended: {
				os: "Windows 10 64Bit",
				cpu: "Intel Core i5-10600 / AMD Ryzen 5 3600",
				ram: "8 GB RAM",
				gpu: "NVIDIA RTX 2060 / AMD Radeon RX 5700",
				dx: "Version 11",
				network: "Broadband Internet connection",
				storage: "150 GB available space",
			}
		},
		legal: "Phasmophobia, the Phasmophobia logo and Kinetic Games are either ® or TM, Kinetic Games Limited.",
		reviews: [
			{user:"Mazen", type:"negative", date: "2/12/2022", content:"meh game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//15- Half-Life: Alyx
	{
		id: "15",
		name: "Half-Life: Alyx",
		category: "Action Games",
		description: "Half-Life: Alyx is Valve’s VR return to the Half-Life series. It’s the story of an impossible fight against a vicious alien race known as the Combine, set between the events of Half-Life and Half-Life 2. Playing as Alyx Vance, you are humanity’s only chance for survival.",
		releaseDate: "23 Mar, 2020",
		developer: { name: "Valve", link: ""},
		publisher: { name: "Valve", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/546560/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/546560/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/546560/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/546560/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/546560/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_d61365e93f20ceb5a94a1e5b2811cf504cbfa303.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_fe7066404a704aa20f7c6f251facb7aef2606bda.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_6868ae1644628f857e7df4b72a00fdf506f79c7f.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_4236773ab28112613bd7d4c6282331c861bc222a.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_5d228b092e93ff148e6a998c33e751fb968cc956.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_70fce3236bf252d3814f793744f648cbe35164e4.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_fcc7a64234b8b26cac3d69dfc4779dd438582f15.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_0360004603a7861cf6781d5449e641f916f1ee07.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_e5152f19710aaa91c4a4ab161785af3e1f8d850d.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_ac80dfaacaade35a1da835dadd52ab420607603b.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_ddc667aa2687543c0baa1a63c6bdb5fa59e0617e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_4912f4c3d259a472e9898f0a7b1f819a533d2c1e.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "26.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "9.17",
		discountPercentage: "66",
		tags: ["VR", "FPS", "Multiplayer", "Story Rich", "Horror", "Female Protagonist", "Shooter", "Singleplayer", "First-Person", "Action", "Sci-fi", "Atmospheric", "Zombies", "Beautiful", "Aliens", "Futuristic", "Psychological Horror", "Memes", "Great Soundtrack", "Gore"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac", // Comment the varibale if the platform is not available
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_input_motion.png",label: "Tracked Controller Support"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_support.png",     label: "VR Only"},
			{ link: "https://store.steampowered.com/search/?category2=13", icon: "/images/ico_cc.png",             label: "Captions available"},
			{ link: "https://store.steampowered.com/search/?category2=17", icon: "/images/ico_editor.png",         label: "Includes level editor"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "German",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: false, subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
			{ name: "Turkish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
			{ name: "Ukrainian",           interface: true, fullAudio: false, subtitles: true },
		],
		link: "http://half-life.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Half-Life: Alyx is Valve’s VR return to the Half-Life series. 
		It’s the story of an impossible fight against a vicious alien race known as the Combine, set between the events of Half-Life and Half-Life 2.  
		<br><br>Playing as Alyx Vance, you are humanity’s only chance for survival. 
		The Combine’s control of the planet since the Black Mesa incident has only strengthened as they corral the remaining population in cities.  
		Among them are some of Earth’s greatest scientists: you and your father, Dr. Eli Vance. 
		<br><br>As founders of a fledgling resistance, you’ve continued your clandestine scientific activity—performing critical research, and building invaluable tools for the few humans brave enough to defy the Combine.  
		<br><br>Every day, you learn more about your enemy, and every day you work toward finding a weakness. 
		<br><br><strong>ABOUT GAMEPLAY IN VR: </strong><br><br>Valve’s return to the Half-Life universe that started it all was built from the ground up for virtual reality. 
		VR was built to enable the gameplay that sits at the heart of Half-Life. <br><br>Immerse yourself in deep environmental interactions, puzzle solving, world exploration, and visceral combat.  
		<br><br>Lean to aim around a broken wall and under a Barnacle to make an impossible shot. Rummage through shelves to find a healing syringe and some shotgun shells. 
		Manipulate tools to hack alien interfaces. Toss a bottle through a window to distract an enemy. Rip a Headcrab off your face and throw it out the window.
		<br><br><strong>COMMUNITY-BUILT ENVIRONMENTS</strong><br><br>A set of Source 2 <a href="https://developer.valvesoftware.com/wiki/Half-Life:_Alyx_Workshop_Tools" target="_blank" rel="">tools</a> for building new levels is included with the game, enabling any player to build and contribute new environments for the community to enjoy through <a href="https://steamcommunity.com/app/546560/workshop/" target="_blank" rel="">Half-Life: Alyx's Steam Workshop</a>. Hammer, Valve’s level authoring tool, has been updated with all of the game's virtual reality gameplay tools and components.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		Includes violence and gore.</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10",
				cpu: "Core i5-7500 / Ryzen 5 1600",
				ram: "12 GB RAM",
				gpu: "GTX 1060 / RX 580 - 6GB VRAM",
				vrSupport: "SteamVR",
			},
			recommended: {
			}
		},
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"I love this game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"nice game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
		]
	},
	//17- No Man's Sky
	{
		id: "17",
		name: "No Man's Sky",
		category: "Action Games",
		description: "No Man's Sky is a game about exploration and survival in an infinite procedurally generated universe.",
		releaseDate: "12 Aug, 2016",
		developer: { name: "Hello Games", link: ""},
		publisher: { name: "Hello Games", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/275850/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/275850/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/275850/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/275850/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/275850/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256965743/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256965743/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_af9a71c9ef2300ea533c37df38c006f16c584f96.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_ef1ebfa0119410cb66bb5adc04f0f47826d50325.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_94f081d2657d0ad11cc9444c55f21a94647213a7.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_d2027a00193c4a2e02cbb031e3933093b3710abe.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_d2027a00193c4a2e02cbb031e3933093b3710abe.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_05c34e42834a06e11c610b6f8f49d5b7771c1bb9.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_3a346ebce3327c450dae1a15d24a34bab4c84a72.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_be95330d3ca2d045620c5082b95aefdef7fe456c.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_a41ba1dc7aefc88839a24b568cdf7f7d3f19ee03.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_c6cdb73bea4293f76078eeecd7b5ee42d87a1e4b.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_507de3c67bbf1f3f50a1372c66ed590f93bb7efe.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/275850/ss_2ecad95f182c80b12eb545a93555157b78af7c8d.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256733437/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256733437/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256723484/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256723484/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "59.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "29.99",
		discountPercentage: "50",
		tags: ["Open World", "Open World Survival Craft", "Space", "Exploration", "Sci-fi", "Survival", "Procedural Generation", "Adventure", "Sandbox", "Singleplayer", "Multiplayer", "Atmospheric", "Crafting", "Space Sim", "Space Sim", "Indie", "Action", "Simulation", "FPS", "VR"], // Array of tags
		win: "platform-image win",
		mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png",    label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",           label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=27", icon: "/images/ico_multiPlayer.png",    label: "Cross-Platform Multiplayer"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_input_motion.png",label: "Tracked Controller Support"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_support.png",     label: "VR Supported"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png",    label: "Remote Play on Tablet"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: false },
			{ name: "Russian",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: false },
			{ name: "Dutch",               interface: true, fullAudio: false, subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Portguese",           interface: true, fullAudio: true,  subtitles: false },
			{ name: "Turkish",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: true,  subtitles: false },
			{ name: "Ukrainian",           interface: true, fullAudio: true,  subtitles: false },
		],
		link: "www.no-mans-sky.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Inspired by the adventure and imagination that we love from classic science-fiction, No Man's Sky presents you with a galaxy to explore, filled with unique planets and lifeforms, and constant danger and action.
		<br><br>In No Man's Sky, every star is the light of a distant sun, each orbited by planets filled with life, and you can go to any of them you choose. Fly smoothly from deep space to planetary surfaces, with no loading screens, and no limits. In this infinite procedurally generated universe, you'll discover places and creatures that no other players have seen before - and perhaps never will again.
		<h2 class="bb_tag">Now including...</h2>Play with all major updates since launch: Foundation, Pathfinder, Atlas Rises, NEXT, The Abyss, Visions, the 2.0 BEYOND update, Synthesis, Living Ship, Exo Mech, Desolation and the 3.0 update, ORIGINS, Next Generation, Companions, Expeditions, Prisms, Frontiers, Sentinel, Outlaws, Endurance, Waypoint (4.0),  Fractal, Interceptor and Echoes.
		<br><br>Available for PC and Mac (see recommended and minimum specs for details).
		<br><br>An epic voyage to the centre of a shared universe awaits, allowing you to explore, trade, fight and survive alone or with friends.
		<h2 class="bb_tag">Embark on an epic voyage</h2>At the centre of the galaxy lies a irresistible pulse which draws you on a journey towards it to learn the true nature of the cosmos. But, facing hostile creatures and fierce pirates, you'll know that death comes at a cost, and survival will be down to the choices you make over how you upgrade your ship, your weapon and suit.
		<h2 class="bb_tag">Find your own destiny</h2>Your voyage through No Man's Sky is up to you. Will you be a fighter, preying on the weak and taking their riches, or taking out pirates for their bounties? Power is yours if you upgrade your ship for speed and weaponry.
		<br><br><br>Or a trader? Find rich resources on forgotten worlds and exploit them for the highest prices. Invest in more cargo space and you'll reap huge rewards.
		<br><br>Or perhaps an explorer? Go beyond the known frontier and discover places and things that no one has ever seen before. Upgrade your engines to jump ever farther, and strengthen your suit for survival in toxic environments that would kill the unwary.
		<h2 class="bb_tag">Share your journey</h2>The galaxy is a living, breathing place. Trade convoys travel between stars, factions vie for territory, pirates hunt the unwary, and the police are ever watching. Every other player lives in the same galaxy, and you can choose to share your discoveries with them on a map that spans known space. Perhaps you will see the results of their actions as well as your own...`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		Includes violence and gore.</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10/11 (64-bit versions)",
				cpu: "Intel Core i3",
				ram: "8 GB RAM",
				gpu: "Nvidia GTX 1060 3GB, AMD RX 470 4GB, Intel UHD graphics 630",
				storage: "15 GB available space",
				vrSupport: "SteamVR",
			},
			recommended: {
			}
		},
		legal: `No Man's Sky - © 2016 Hello Games Ltd. Developed by Hello Games Ltd. All rights reserved.`,
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"I love this game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"nice game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"boring"},
		]
	},
	//18- Resident Evil Village
	{
		id: "18",
		name: "Resident Evil Village",
		category: "Action Games",
		description: "Experience survival horror like never before in the 8th major installment in the Resident Evil franchise - Resident Evil Village. With detailed graphics, intense first-person action and masterful storytelling, the terror has never felt more realistic.",
		releaseDate: "7 May, 2021",
		developer: { name: "CAPCOM Co., Ltd.", link: ""},
		publisher: { name: "CAPCOM Co., Ltd.", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1196590/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1196590/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1196590/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1196590/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256825282/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256825282/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256825268/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256825268/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_d25704b01be292d1337df4fea0fba2aab322b58a.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_8113ec993ec474055c4cdce5ee86f91f7cf6663f.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_50283e6df9d2f3f24ff4a1a36a94ae307e21cee8.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_363d9c05ee0a974b766938610a3352e7a89b9c92.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_e2bdaa9a0eeae714b3ad3ba49c9ae83a3930f08e.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_d296efbc9a5d87bf20b2ea19134f35ba203ae813.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_d6c5bfb48d7fda343ed583750372b0d3e513ae17.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_b790b617004b92423a855d5526a1eb29e05b6c78.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_7579d4a7916fb16607eae522844b307a74bd95ec.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/ss_5cba45b96c65e0209c269e8d1d8865537927af33.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256788743/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256788743/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "29.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "11.99",
		discountPercentage: "60",
		tags: ["Survival Horror", "Horror", "First-Person", "Singleplayer", "Action", "Zombies", "Gore", "Story Rich", "Atmospheric", "FPS", "Violent", "Dark", "Survival", "Psychological Horror", "Adventure", "Open World", "VR", "Multiplayer"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",            label: "HDR available"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: true },
			{ name: "Dutch",               interface: true, fullAudio: false, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: true,  subtitles: true },
			{ name: "Turkish",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
			{ name: "Ukrainian",           interface: true, fullAudio: true,  subtitles: true },
		],
		link: "www.residentevil.com/village",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Experience survival horror like never before in the eighth major installment in the storied Resident Evil franchise - <i>Resident Evil Village</i>.
		<br><br>Set a few years after the horrifying events in the critically acclaimed <i>Resident Evil 7 biohazard</i>, the all-new storyline begins with Ethan Winters and his wife Mia living peacefully in a new location, free from their past nightmares. Just as they are building their new life together, tragedy befalls them once again.
		<br><br><ul class="bb_ul"><li><strong>First-Person Action</strong> – Players will assume the role of Ethan Winters and experience every up-close battle and terrifying pursuit through a first-person perspective. 
		<br></li><li><strong>Familiar Faces and New Foes</strong> – Chris Redfield has typically been a hero in the Resident Evil series, but his appearance in Resident Evil Village seemingly shrouds him in sinister motives. A host of new adversaries inhabiting the village will relentlessly hunt Ethan and hinder his every move as he attempts to make sense of the new nightmare he finds himself in.</li></ul>`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10 (64 bit)",
				cpu: "AMD Ryzen 3 1200 ／ Intel Core i5-7500",
				ram: "8 GB RAM",
				gpu: "AMD Radeon RX 560 with 4GB VRAM ／ NVIDIA GeForce GTX 1050 Ti with 4GB VRAM",
				dx: "Version 12",
				storage: "15 GB available space",
				additionalNotes:"Estimated performance (when set to Prioritize Performance): 1080p/60fps. ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2060 required to support ray tracing.",
			},
			recommended: {
				os: "Windows 10 (64 bit)",
				cpu: "AMD Ryzen 5 3600 ／ Intel Core i7 8700",
				ram: "16 GB RAM",
				gpu: "AMD Radeon RX 5700 ／ NVIDIA GeForce GTX 1070",
				additionalNotes:"Estimated performance: 1080p/60fps ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2070 required to support ray tracing.",
			}
		},
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"I love this game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"nice game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"good"},
		]
	},
	//19- Beat Saber
	{
		id: "19",
		name: "Beat Saber",
		category: "Indie Games",
		description: "Beat Saber is a VR rhythm game where you slash the beats of adrenaline-pumping music as they fly towards you, surrounded by a futuristic world.",
		releaseDate: "21 May, 2019",
		developer: { name: "Beat Games", link: ""},
		publisher: { name: "Beat Games, Ltd.", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/620980/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/620980/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/620980/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/620980/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/620980/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256736673/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256736673/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/ss_1881ae4f153faf0d1ccecca60fbdac5b43ad57eb.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/ss_114dc9a9f27666b2d56801ba49a1db8fa202b6ee.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/ss_b65444cc4513f34bd41fa6b0fe96cf11d94fea8d.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/ss_542d092f42c779c866167bec05c1da488bcd91f8.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/620980/ss_910fb7ad48bfdd918b0396b14f3dd45fc7f2e847.1920x1080.jpg", featured: true},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256788743/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256788743/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: false,
		free: false,
		price: "14.99",
		// offerType: "SPECIAL PROMOTION",
		// offerEndDate: "4 January",
		// discountPrice: "11.99",
		// discountPercentage: "60",
		tags: ["VR", "Rhythm", "Music", "Moddable", "Fast-Paced", "First-Person", "Singleplayer", "Indie", "Difficult", "Multiplayer", "Swordplay", "Action", "Sports", "Futuristic", "Casual", "Music-Based Procedural Generation", "Games Workshop", "PvP", "Great Soundtrack", "Early Access"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png",    label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_input_motion.png",label: "Tracked Controller Support"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_vr_support.png",     label: "VR Only"},
			{ link: "https://store.steampowered.com/search/?category2=25", icon: "/images/ico_leaderboards.png",   label: "Steam Leaderboards"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Italian",             interface: true, fullAudio: true,  subtitles: false },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: false },
			{ name: "Korean",              interface: true, fullAudio: true,  subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: true,  subtitles: false },
		],
		link: "http://beatsaber.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Beat Saber is an immersive rhythm experience you have never seen before! Enjoy tons of handcrafted levels and swing your way through the pulsing music beats, surrounded by a futuristic world. 
		Use your sabers to slash the beats as they come flying at you – every beat indicates which saber you need to use and the direction you need to match. 
		With Beat Saber you become a dancing superhero!<h2 class="bb_tag">Features</h2><ul class="bb_ul"><li>Feel the Rhythm: Immerse yourself in the smoothest combination of music beats and visual effects in Beat Saber’s truly unique gameplay.
		<br></li><li>Handcrafted Levels &amp; Music: Unlike other rhythm games with generated content, music and levels in Beat Saber are drawn precisely by hand to enhance the music experience.
		<br></li><li>Compete in Multiplayer: Challenge your friends or random opponents around the world. 
		<br></li><li>Challenging Campaign: Get better every day while completing objectives and challenges in the Campaign.
		<br></li><li>Rise Up the Global Leaderboards: Compete against other Beat Saberists around the world in various difficulties. 
		<br></li><li>Easy to Learn, Fun to Master: Everyone can understand the basic game mechanics. It's easy for anyone to pick up and play.
		<br></li><li>Great Exercise: Exercise while dancing and slashing the beats, Beat Saber gets you moving.</li></ul>`,
		mature: false,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7/8.1/10 (64bit)",
				cpu: "Intel Core i5 Sandy Bridge or equivalent",
				ram: "4 GB RAM",
				gpu: "Nvidia GTX 960 or equivalent",
				dx: "Version 11",
				storage: "200 MB available space",
				vrSupport: "SteamVR"
			},
			recommended: {
				os: "Windows 7/8.1/10 (64bit)",
				cpu: "Intel Core i7 Skylake or equivalent",
				ram: "8 GB RAM",
				gpu: "Nvidia GTX 1060 or equivalent",
				dx: "Version 12",
				storage: "200 MB available space",
			}
		},
		reviews: [
			{user:"Ibrahim", type:"negative", date: "12/11/2022", content:"bad game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"I love this game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"nice game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"good"},
		]
	},
	//20- Battlefield™ V
	{
		id: "20",
		name: "Battlefield™ V",
		category: "Action Games",
		description: "This is the ultimate Battlefield V experience. Enter mankind’s greatest conflict with the complete arsenal of weapons, vehicles, and gadgets plus the best customization content of Year 1 and 2.",
		releaseDate: "9 Nov, 2018",
		developer: { name: "DICE", link: ""},
		publisher: { name: "Electronic Arts", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1238810/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1238810/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1238810/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1238810/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256806061/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256806061/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_0c20c45d2e00feae5b9edfb6526662cc3c669164.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_d1952d018415b94bed85a503713a05ab12a407d6.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_0569f81cafd8b18870d6d5bc296ad557f5576067.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_818562302f3d6fdcab1689e5618a52e4b53a71f6.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_1d38895ccc9beb342a0759fdaa7bd98a0c57d024.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_a933e1c44fa328825219907f1dd84718da671f28.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_409e2c952aedae360bb2f64736cad845c3cae510.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_431ae8bbb5ff7e7cc6740e49c584e1015c6ea8e1.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/ss_79d886247bd93e4762f3ece00acc4f75e21cc126.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256787467/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256787467/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "49.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "4.00",
		discountPercentage: "90",
		tags: ["FPS", "Multiplayer", "World War II", "Singleplayer", "Shooter", "War", "Military", "First-Person", "PvP", "Combat", "Massively Multiplayer", "Open World", "Historical", "Destruction", "Battle Royale", "Atmospheric", "Violent", "Female Protagonist"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png",    label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",            label: "HDR available"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
			{ name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
			{ name: "Arabic",              interface: true, fullAudio: false, subtitles: false },
			{ name: "Polish",              interface: true, fullAudio: false, subtitles: false },
		],
		link: "https://www.ea.com/games/battlefield/battlefield-5",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/extras/BFV_Definitive_Edition_Beautyshot_EN.png?t=1701356409">
		<br>
		This is the ultimate Battlefield V experience. Enter mankind’s greatest conflict across land, air, and sea with all gameplay content unlocked from the get-go. Choose from the complete arsenal of weapons, vehicles, and gadgets, and immerse yourself in the hard-fought battles of World War II. Stand out on the battlefield with the complete roster of Elites and the best customization content of Year 1 and Year 2. 
		<br><br>
		Battlefield V Definitive Edition contains the Battlefield V base game and the definitive collection of content:
		<br>
		<ul class="bb_ul"><li>All gameplay content (weapons, vehicles, and gadgets) from launch, Year 1, and Year 2<br></li><li>All Elites<br></li><li>84 immersive outfit variations for the British and German armies to enhance the WWII sandbox<br></li><li>8 soldier outfits from Year 2<br></li><li>2 weapon skins from Year 2, applicable to 10 and 4 weapons respectively<br></li><li>3 vehicle dressings<br></li><li>33 Chapter Reward items from Year 1</li></ul>`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "64-bit Windows 10",
				cpu: "AMD FX-8350/ Core i5 6600K",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce® GTX 1050 / NVIDIA GeForce® GTX 660 2GB or AMD Radeon™ RX 560 / HD 7850 2GB",
				dx: "Version 11",
				storage: "50 GB available space",
			},
			recommended: {
				os: "64-bit Windows 10 or later",
				cpu: "AMD Ryzen 3 1300X/Intel Core i7 4790",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce® GTX 1060 6GB/AMD Radeon™ RX 580 8GB",
				dx: "Version 11",
				storage: "50 GB available space",
			}
		},
		legal: `Germany, Austria, and Switzerland only: EA’S PRIVACY &amp; COOKIE POLICY (privacy.ea.com/de) APPLIES. <br>
		Other EU, United Kingdom, Norway, Iceland, Andorra, Bosnia and Herzegovina, Georgia, Kosovo, Macedonia (FYROM), Moldova, Monaco, Montenegro, San Marino, Serbia, Turkey, Vatican City (Holy See), Liechtenstein only: ACKNOWLEDGEMENT OF EA's PRIVACY &amp; COOKIE POLICY (privacy.ea.com) REQUIRED TO PLAY. <br>
		All other residents: ACCEPTANCE OF EA PRIVACY &amp; COOKIE POLICY (privacy.ea.com) REQUIRED TO PLAY. <br>
		<br>
		INTERNET CONNECTION; EA ACCOUNT; STEAM ACCOUNT; ACCEPTANCE OF EA USER AGREEMENT (terms.ea.com) &amp; ORIGIN END USER LICENSE AGREEMENT (ea.com/legal); AND DOWNLOAD &amp; INSTALLATION OF THE ORIGIN CLIENT SOFTWARE (origin.com/download) REQUIRED TO PLAY. YOU MUST LINK YOUR EA AND STEAM ACCOUNTS TO PLAY; EA WILL SHARE YOUR ACCOUNT ID AND INDIVIDUAL GAME AND PLAY RECORDS WITH STEAM TO VALIDATE YOUR PURCHASE AND/OR REFUND REQUEST. ACCESS TO SOFTWARE CONTENT IS LIMITED TO ONE EA &amp; ONE STEAM ACCOUNT &amp; IS NON-TRANSFERABLE AFTER PURCHASE. YOU MAY NEED TO BE 13+ or 16+ TO REGISTER FOR AN EA ACCOUNT (AGE MAY VARY, SEE http://o.ea.com/ea/child-access FOR DETAILS). SOME CONTENT MAY REQUIRE GAMEPLAY TO UNLOCK. CONTENT UPDATES MAY BE DOWNLOADED AUTOMATICALLY, REQUIRE ADDITIONAL STORAGE, AND INCUR BANDWIDTH USAGE FEES. EA MAY PROVIDE CERTAIN FREE INCREMENTAL CONTENT &amp;/OR UPDATES. EA MAY RETIRE ONLINE FEATURES AFTER 30 DAYS NOTICE POSTED ON ea.com/service-updates.<br>
		<br>
		EA User Agreement: terms.ea.com/de for German residents and terms.ea.com for all other residents<br>
		EA Privacy &amp; Cookie Policy: privacy.ea.com/de for German residents and privacy.ea.com for all other residents<br>
		Origin EULA: ea.com/de-de/legal for German residents and ea.com/legal for all other residents`,
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"I love this game"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"nice game"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"good"},
		]
	},
	//21- Starfield
	{
		id: "21",
		name: "Starfield",
		category: "RPG Games",
		description: "Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.",
		releaseDate: "6 Sep, 2023",
		developer: { name: "Bethesda Game Studios", link: ""},
		publisher: { name: "Bethesda Softworks", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1716740/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256969669/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256969669/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256952210/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256952210/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_4887dc140a637684ddcfca518458668409f946dc.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_b2821283cb140cd5a6289a8160016b6a60d8f96e.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_68f15d580bf91971f637be5e464bc803482d78f7.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_aae99c177004bb5ec653d2fcb65a5d30489ec7b8.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_c8594798fadfd8e042b2fc8afff7bcf4872c5198.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_2288919a390c0147b7d2226354a61452016fd087.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_45c1dc3cd5399eb16230ed85dab25ce945c46726.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_930710a45c08eaa4c10fa0be7c0663900e1d32f3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/ss_177d2492278d3ccc5b1c58bc96dcb63aacddb1a5.1920x1080.jpg"},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256965293/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256965293/movie.293x165.jpg",
			},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "41.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "29.39",
		discountPercentage: "30",
		tags: ["Space", "Singleplayer", "Open World", "RPG", "Sci-fi", "First-Person", "Story Rich", "Action-Adventure", "Character Customization", "Third Person", "Adventure", "Action RPG", "Atmospheric", "Space Sim", "Action", "Moddable", "Cinematic", "Realistic", "Great Soundtrack"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
		],
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `Starfield is the first new universe in over 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity’s greatest mystery.
		<br><br>In the year 2330, humanity has ventured beyond our solar system, settling new planets, and living as a spacefaring people. You will join Constellation – the last group of space explorers seeking rare artifacts throughout the galaxy – and navigate the vast expanse of space in Bethesda Game Studios’ biggest and most ambitious game.
		<h2 class="bb_tag">Tell Your story </h2>In Starfield the most important story is the one you tell with your character. Start your journey by customizing your appearance and deciding your Background and Traits. Will you be an experienced explorer, a charming diplomat, a stealthy cyber runner, or something else entirely? The choice is yours. Decide who you will be and what you will become.
		<br><br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/extras/TellYourStory_v3.gif?t=1700075960"><h2 class="bb_tag">Explore Outer Space </h2>Venture through the stars and explore more than 1000 planets. Navigate bustling cities, explore dangerous bases, and traverse wild landscapes. Meet and recruit a memorable cast of characters, join in the adventures of various factions, and embark on quests across the Settled Systems. A new story or experience is always waiting to be discovered.  
		<br><br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/extras/ExploreSpace_v3.gif?t=1700075960"><h2 class="bb_tag">Captain the Ship Of Your Dreams </h2>Pilot and command the ship of your dreams. Personalize the look of your ship, modify critical systems including weapons and shields, and assign crew members to provide unique bonuses. 
		In deep space you will engage in high-stakes dogfights, encounter random missions, dock at star stations, and even board and commandeer enemy ships to add to your collection.  
		<br><br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/extras/CaptainShip_v3.gif?t=1700075960"><h2 class="bb_tag">Discover, Collect, Build</h2>Explore planets and discover the fauna, flora, and resources needed to craft everything from medicine and food to equipment and weapons. Build outposts and hire a crew to passively extract materials and establish cargo links to transfer resources between them. Invest these raw materials into research projects to unlock unique crafting recipes. 
		<br><br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/extras/DiscoverCollectBuild_v3.gif?t=1700075960"><h2 class="bb_tag">Lock and Load</h2>Space can be a dangerous place. A refined combat system gives you the tools to deal with any situation. Whether you prefer long-range rifles, laser weapons, or demolitions, each weapon type can be modified to complement your playstyle. Zero G environments add a chaotic spectacle to combat, while boost packs give players freedom to maneuver like never before.
		<br><br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/extras/LockandLoad_v3.gif?t=1700075960">`,
		mature: true,
		matureDescription: `<i>
		Violence<br>
		Blood<br>
		Suggestive Themes<br>
		Strong Language <br>
		Use of Drugs</i>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 10 version 21H1 (10.0.19043)",
				cpu: "AMD Ryzen 5 2600X, Intel Core i7-6800K",
				ram: "16 GB RAM",
				gpu: "AMD Radeon RX 5700, NVIDIA GeForce 1070 Ti",
				dx: "Version 12",
				storage: "125 GB available space",
				additionalNotes: "SSD Required"
			},
			recommended: {
				os: "Windows 10/11 with updates",
				cpu: "AMD Ryzen 5 3600X, Intel i5-10600K",
				ram: "16 GB RAM",
				gpu: "AMD Radeon RX 6800 XT, NVIDIA GeForce RTX 2080",
				dx: "Version 12",
				network: "Broadband Internet connection",
				storage: "125 GB available space",
				additionalNotes: "SSD Required"
			}
		},
		legal: `© 2023 ZeniMax Media Inc. Starfield, Bethesda, Bethesda Game Studios, Bethesda Softworks, ZeniMax and related logos are registered trademarks or trademarks of ZeniMax Media Inc. in the U.S. and/or other countries. All Rights Reserved.`,
		reviews: [
			{user:"Ibrahim", type:"negative", date: "12/11/2022", content:"good at first, boring later"},
			{user:"Samy", type:"negative", date: "1/12/2022", content:"bad game"},
			{user:"Mazen", type:"negative", date: "2/12/2022", content:"too repetitive"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"good"},
			{user:"firstplayer", type:"positive", date: "6/12/2022", content:"good but nvm"},
		]
	},
	//22- Dying Light 2 Stay Human
	{
		id: "22",
		name: "Dying Light 2 Stay Human",
		category: "Action Games",
		description: "Humanity is fighting a losing battle against the virus. Experience a post-apocalyptic open world overrun by hordes of zombies, where your parkour and combat skills are key to survival. Traverse the City freely during the day, but watch the monsters take over during the night.",
		releaseDate: "4 Feb, 2022",
		developer: { name: "DICE", link: ""},
		publisher: { name: "Electronic Arts", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/534380/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/534380/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/534380/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/534380/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/534380/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256873177/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256873177/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256921118/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256921118/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_d7906b3946d4857d28c159e7a1555a003a4426f8.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_6b8d4cc1f7d657745cfd7aab941d3be0067dec00.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_fe9a52a60f4739a44cbd8b0c0856033ea6996624.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_84ca00f3d3b48e0a1fa6b96b17f02a65f1447950.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_28860dda506d28aea744a08744bad8afb1b506c5.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_64ba1a8bd42d3d0a34bc894d6faa0e57a1328aef.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_38ca559ee79b64ef65f6d5c5c722778f6447425e.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/ss_1c3c5764cc6d6a9a86122a0de643973c0c8dca1b.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "39.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "19.99",
		discountPercentage: "50",
		tags: ["Co-op", "Zombies", "Parkour", "Multiplayer", "Exploration", "Horror", "Combat", "Gore", "Post-apocalyptic", "First-Person", "Action RPG", "Survival", "Singleplayer", "Adventure", "Action-Adventure", "Action", "Violent", "Multiple Endings", "Choices Matter"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",           label: "Online Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on TV"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
		],
		link: "https://pilgrimoutpost.techlandgg.com/?utm_source=steam&amp;utm_medium=store&amp;utm_campaign=dying_light_2",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `It’s been 20 years since the events of the original game. The virus won, and humanity is slowly dying. You play as Aiden Caldwell, a wandering Pilgrim who delivers goods, brings news, and connects the few remaining survivor settlements in barren lands devastated by the zombie virus. However, your true goal is to find your little sister Mia, who you left behind as a kid to escape Dr. Waltz's torturous experiments. Haunted by the past, you eventually make the decision to confront it when you learn that Mia may still be alive in Villedor — the last city standing on Earth. 
		<br><br>You quickly find yourself in a settlement torn by conflict. You’ll need to engage in creative and gory combat, so hone your skills to defeat hordes of zombies and make allies. Roam the city, free run across Villedor’s buildings and rooftops in search of loot in remote areas, and be wary of the night. With every sunset, monsters take control of the streets.
		<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/534380/extras/dl_2_sh_steam.gif?t=1703065463"><h2 class="bb_tag">A WORLD AFTER THE APOCALYPSE</h2>Fifteen years ago, humanity was devastated by the Fall — a catastrophic event that would change the world forever. With the Harran virus spreading around the globe, people quickly found out that all hope for tomorrow is lost. By 2036, only a few settlements remain, and humanity is slowly dying, making way for the new species out there — a horde of relentless zombies.
		<h2 class="bb_tag">DAY’S FOR THE LIVING, NIGHT’S FOR THE DEAD</h2>Welcome to Villedor, one of the last bastions of humanity. During the day, survivors still try to have a life here and find a false sense of normalcy. Relationships are formed, dreams are dreamed, and life carries on. On the surface, everything seems… fine. Until sunset, that is. With the last ray of light dying out, other, more dreadful, dwellers of The City crawl out of their gloomy interiors, taking over the streets. If you are not vigilant and stay out too long in the dark, you may never return.
		<h2 class="bb_tag">YOU HAVE TO MOVE TO SURVIVE</h2>Not all fights can be won. Sometimes it’s best to run and, thankfully, you have the skills for it. Parkour lets you escape when odds are not in your favor. Jump from rooftop to rooftop, swing across the cityscape, ride ziplines, and much more. Whatever you do, experience a unique sense of freedom as you freerun across Villedor’s buildings and rooftops in search of loot or while running away from the dangers of the night.
		<h2 class="bb_tag">GET BRUTAL AND BE CREATIVE ABOUT IT</h2>In a world as dangerous as this one, only the strongest survive. Whether you prefer to smash, slice or dismember those who stand in your way, you have to be creative about it to make it through. And who says you need weapons? Utilize the entirety of your parkour moveset to get the jump on your enemies. Learn the ways of combat and parkour to feel the crunch of skulls and slices of flesh as you swing weapons or use your moves to fend off any forms of danger. And let’s not forget that Villedor has weapons that put the most advanced post-apocalyptic armories to shame.
		<h2 class="bb_tag">FOUR PILGRIMS ARE BETTER THAN ONE</h2>Surviving in Villedor is easier with friends. Team up with up to 3 other players and increase your chances out there. Unravel the story together, take on Pilgrim Outpost challenges, or simply wreak havoc on the city streets.
		<br><br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/534380/extras/steam_footer_dying_light2.jpg?t=1703065463">`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
			<p><i>
			This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
			</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows® 7",
				cpu: "Intel Core i3-9100 / AMD Ryzen 3 2300X",
				ram: "8 GB RAM",
				gpu: "NVIDIA® GeForce® GTX 1050 Ti / AMD Radeon™ RX 560 (4GB VRAM)",
				storage: "60 GB available space",
			},
			recommended: {
				os: "Windows® 10",
				cpu: "AMD / Intel CPU running at 3.6 GHz or higher: AMD Ryzen 5 3600X or Intel i5-8600K or newer",
				ram: "16 GB RAM",
				gpu: "NVIDIA® GeForce RTX™ 2060 6GB or AMD RX Vega 56 8GB or newer",
				storage: "60 GB available space",
			}
		},
		legal: `Dying Light 2 © Techland S.A. Published and developed by Techland S.A. All other trademarks, copyrights and logos are property of their respective owners. All rights reserved.`,
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"gg"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"very good"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"too bloody"},
		]
	},
	//23- Control Ultimate Edition
	{
		id: "23",
		name: "Control Ultimate Edition",
		category: "Action Games",
		description: "Winner of over 80 awards, Control is a visually stunning third-person action-adventure that will keep you on the edge of your seat.",
		releaseDate: "27 Aug, 2020",
		developer: { name: "Remedy Entertainment", link: ""},
		publisher: { name: "505 Games", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/870780/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/870780/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/870780/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/870780/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/870780/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256795678/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256795678/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256795958/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256795958/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_949cf39deee737fec3aadff903ec5311dd22bdab.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_455ab81ea90f5668ff384d60d68baef1e2e74e55.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_165fb4ca28f4db79b878e8c56ba6502e782c0bb2.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_06b7e4baac0ac7f2ecfcc8d3198f707339c6296f.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_f99238da0d48a784c675c464bf1d83d9cb3ff5ac.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "18.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "4.74",
		discountPercentage: "75",
		tags: [ "Co-op", "Zombies", "Parkour", "Multiplayer", "Exploration", "Horror", "Combat", "Gore", "Post-apocalyptic", "First-Person", "Action RPG", "Survival", "Singleplayer", "Adventure", "Action-Adventure", "Action", "Violent", "Multiple Endings", "Choices Matter"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png",    label: "Remote Play on Tablet"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on TV"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",            label: "HDR available"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "French",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: false, subtitles: true },
			{ name: "German",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: true,  subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: true,  subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: true },
		],
		link: "controlgame.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/870780/extras/Control_UE_Steam_Vanity.jpg?t=1700566825">
		<br><br><strong>Control Ultimate Edition</strong>
		<br><br>Control Ultimate Edition contains the main game and all previously released Expansions ("The Foundation" and "AWE") in one great value package.
		<br><br>A corruptive presence has invaded the Federal Bureau of Control…Only you have the power to stop it. The world is now your weapon in an epic fight to annihilate an ominous enemy through deep and unpredictable environments. Containment has failed, humanity is at stake. Will you regain control?
		<br><br>Winner of over 80 awards, Control is a visually stunning third-person action-adventure that will keep you on the edge of your seat. Blending open-ended environments with the signature world-building and storytelling of renowned developer, Remedy Entertainment, Control presents an expansive and intensely gratifying gameplay experience.
		<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/870780/extras/CONTROL-01-V2.gif?t=1700566825"><br><br><strong>Key features</strong><br><br><strong>Uncover the mysteries</strong><br>Can you handle the bureau’s dark secrets? Unfold an epic supernatural<br>struggle, filled with unexpected characters and bizarre events, as you<br>search for your missing brother, and discover the truth that has brought<br>you here.
		<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/870780/extras/CONTROL-04-V2.gif?t=1700566825"><br><br><strong>Everything is your weapon</strong><br>Unleash destruction through transforming weaponry and telekinetic<br>powers. 
		Discover new ways to annihilate your enemies as you harness<br>powerful abilities to turn everything around you into a lethal weapon.
		<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/870780/extras/CONTROL-03-V2.gif?t=1700566825"><br><br><strong>Explore a hidden world</strong><br>Delve deep into the ominous expanses of a secretive government<br>agency. 
		Explore the Bureau’s shifting environments only to discover<br>that there is always more than meets the eye…<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/870780/extras/CONTROL-02-V2.gif?t=1700566825"><br><br>
		<strong>Fight for control</strong><br>Battle a relentless enemy through exciting missions and challenging<br>boss fights to earn powerful upgrades that maximize abilities and<br>customize your weaponry.`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		Blood<br>
		Violence<br>
		Strong Language</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7, 64-bit",
				cpu: "Intel Core i5-4690 / AMD FX 4350",
				ram: "8 GB RAM",
				gpu: "NVIDIA GeForce GTX 780 / AMD Radeon R9 280X",
				dx: "Version 11",
				storage: "42 GB available space",
				additionalNotes: "Additional Features: Widescreen support 21:9 / Remappable controls / Uncapped frame-rate / G-Sync / Freesync support"
			},
			recommended: {
				os: "Windows 10, 64-bit",
				cpu: "Intel Core i5-7600K / AMD Ryzen 5 1600X",
				ram: "16 GB RAM",
				gpu: "NVIDIA GeForce GTX 1660/1060 / AMD Radeon RX 580 AMD | For Ray Tracing: GeForce RTX 2060",
				dx: "Version 11",
				storage: "42 GB available space",
				additionalNotes: "Additional Features: Widescreen support 21:9 / Remappable controls / Uncapped frame-rate / G-Sync / Freesync support"
			}
		},
		legal: `Developed by Remedy Entertainment PLC. Published by 505 Games. The Remedy logo and Northlight are trademarks of Remedy Entertainment Oyj, registered in the U.S. and other countries. Control is a registered trademark of Remedy Entertainment Oyj. 505 Games and the 505 Games logo are trademarks of 505 Games SpA, and may be registered in the United States and other countries. All other marks and trademarks are the property of their respective owners. All rights reserved.`,
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"gg"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"very good"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"nice"},
		]
	},
	//24- Shadow of the Tomb Raider: Definitive Edition
	{
		id: "24",
		name: "Shadow of the Tomb Raider: Definitive Edition",
		category: "Adventure Games",
		description: "As Lara Croft races to save the world from a Maya apocalypse, she must become the Tomb Raider she is destined to be.",
		releaseDate: "14 Sep, 2018",
		developer: { name: "Crystal Dynamics", link: ""},
		publisher: { name: "Crystal Dynamics", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/750920/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/750920/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/750920/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/750920/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/750920/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256728364/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256728364/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256744566/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256744566/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256742780/movie480.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256742780/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_3f370f69eef0caeceb533d06925cc48f0f26c83c.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_3fcd62a2831bcc1e557a0fe2a061b6369ba030d1.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_06a2446b7ccef5eaac1ef4200acdb3f02dac9ae0.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_794a3ecd4ae51313f8cfffbc6b3d8b91c665b12b.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_8907e0a624a1113be01fa1b426d0e3ab0971e7d2.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_191adc1f11bf9d13498cb411ac71f29221732e86.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_04b30aaa0ce083b1bcff63d06432707ab9c35c74.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_7496de2518ddb1b58db0004d1386b4e48c442367.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_e6f6fc32892cd8463199dd37040995011f06311b.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/750920/ss_a98e6f581b293d80e722a143a038c22bb11e1a0d.1920x1080.jpg"},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "44.96",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "4.95",
		discountPercentage: "89",
		tags: ["Adventure", "Action", "Female Protagonist", "Singleplayer", "Open World", "Third Person", "Story Rich", "Puzzle", "Stealth", "Action-Adventure", "Exploration", "Survival", "Violent", "Atmospheric", "Shooter", "Gore", "Great Soundtrack", "Dark", "Multiplayer", "Heist"], // Array of tags
		win: "platform-image win",
		mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",   label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",   label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",          label: "Steam Trading Cards"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",          label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on Phone"},
			{ link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png",    label: "Remote Play on Tablet"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",    label: "Remote Play on TV"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Arabic",              interface: true, fullAudio: true, subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true, subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false,subtitles: true },
			{ name: "French",              interface: true, fullAudio: true, subtitles: true },
			{ name: "German",              interface: true, fullAudio: true, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: true, subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: true, subtitles: true },
			{ name: "Turkish",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: true, subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: true, subtitles: true },
			{ name: "Ukrainian",           interface: true, fullAudio: true, subtitles: true },
		],
		link: "www.tombraider.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/750920/extras/Shadow_DE_616X_Agnostic.jpg?t=1699903168">
		<br>In Shadow of the Tomb Raider Definitive Edition experience the final chapter of Lara’s origin as she is forged into the Tomb Raider she is destined to be. Combining the base game, all seven DLC challenge tombs, as well as all downloadable weapons, outfits, and skills, Shadow of the Tomb Raider Definitive Edition is the ultimate way to experience Lara’s defining moment.
		<br><br><strong>Survive and Thrive In the Deadliest Place on Earth: </strong>Master an unforgiving jungle setting in order to survive. Explore underwater environments filled with crevasses and deep tunnel systems.
		<br><br><strong>Become One With the Jungle:</strong> Outgunned and outnumbered, Lara must use the jungle to her advantage. Strike suddenly and disappear like a jaguar, use mud as camouflage, and instill fear in enemies to sow chaos.
		<br><br><strong>Discover Dark and Brutal Tombs:</strong> Tombs are more terrifying than ever before, requiring advanced traversal techniques to reach them, and once inside they are filled with deadly puzzles.
		<br><br><strong>Uncover Living History:</strong> Discover a hidden city and explore the biggest hub space ever found in a Tomb Raider game.
		<br><br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/750920/extras/SOTTR-Combat1-616x213_-_Copy.jpg?t=1699903168">`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7, 64-bit",
				cpu: "i3-3220 INTEL or AMD Equivalent",
				ram: "8 GB RAM",
				gpu: "Nvidia GTX 660/GTX 1050 or AMD Radeon HD 7770",
				dx: "Version 11",
				storage: "40 GB available space",
			},
			recommended: {
				os: "Windows 10 64-bit",
				cpu: "Intel Core i7 4770K, 3.40 Ghz or AMD Ryzen 5 1600, 3.20 Ghz",
				ram: "16 GB RAM",
				gpu: "Nvidia GTX 1060 6GB or AMD Radeon RX 480, 8GB",
				dx: "Version 12",
				storage: "40 GB available space",
			}
		},
		legal: `SHADOW OF THE TOMB RAIDER © 2018 Crystal Dynamics group of companies. All rights reserved. RISE OF THE TOMB RAIDER, TOMB RAIDER, LARA CROFT, CRYSTAL DYNAMICS, the CRYSTAL DYNAMICS logo, EIDOS, and the EIDOS logo are trademarks of the Crystal Dynamics and Eidos Interactive Corp. group of companies.`,
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"gg"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"very good"},
			{user:"mr_assassin", type:"positive", date: "5/12/2022", content:"best"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"nice"},
			{user:"cringyGaming", type:"positive", date: "12/12/2022", content:"good"},
			{user:"x_gaming", type:"positive", date: "11/12/2022", content:"gg"},
		]
	},
	//25- Mortal Kombat 1
	{
		id: "25",
		name: "Mortal Kombat 1",
		category: "Action Games",
		description: "Discover a reborn Mortal Kombat™ Universe created by the Fire God Liu Kang. Mortal Kombat™ 1 ushers in a new era of the iconic franchise with a new fighting system, game modes, and fatalities!",
		releaseDate: "19 Sep, 2023",
		developer: { name: "NetherRealm Studios", link: ""},
		publisher: { name: "Warner Bros. Games", link: ""},
		mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1971870/capsule_616x353.jpg",
		horizontalHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg",
		verticalHeaderImage:"https://cdn.akamai.steamstatic.com/steam/apps/1971870/hero_capsule.jpg",
		smallHeaderImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header_292x136.jpg",
		backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1971870/page_bg_generated_v6b.jpg",
		menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/capsule_231x87.jpg",
		searchImage:"https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/capsule_sm_120.jpg",
		tabImage: "https://cdn.akamai.steamstatic.com/steam/apps/1971870/capsule_184x69.jpg",
		moviesAndImages: [
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256962783/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256962783/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256960742/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256960742/movie.293x165.jpg",
			},
			{
				type: "video",
				link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256961704/movie480_vp9.webm",
				posterLink:
					"https://cdn.cloudflare.steamstatic.com/steam/apps/256961704/movie.293x165.jpg",
			},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_7eb14734a264570367c607698371e492415f48a4.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_29b0a9e87d5a4981d7403994b661c43117a87d84.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_18eadd6859ed15531d25cd67fe1d2402e9bf75b3.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_02b8c4f08fbf4d1a5affb9e6e64716d63df16760.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_2509da69bd12d209bd0ef9eed13f25cfa551f8e5.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_fc0fd6c946a9f182bf8f0059bf4260ff07b0fec7.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_535045ba6877519d2d95a3c89716a72c174eab7e.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_1b8e7526d3f50e06c1283ee651dc7f868ef0474a.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_224cb713d0e9dcc0028f5ad275cf6f4925d3dca5.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_92b72baad7981e46d9717991510ff28b04186b23.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_a991cfaf5752d48c1374b635deb041ab2d1332d2.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_49224d656949ca50dc48d4256e7e7d4a10eb1855.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_a94918c36b35d9754fa0ef0eeb115a4bffeb7260.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_2ef7ddaed885dd5e2e60f29615b32c984d41a8f6.1920x1080.jpg"},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_829f376e1954eab50fc366bbcbc5a1cee5777116.1920x1080.jpg", featured: true},
			{ type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/ss_015808ceccbf9006b92702bacb78d5ca0cc3ebe5.1920x1080.jpg", featured: true},
		],
		reason: "available", // "available" or "recommended"
		discount: true,
		free: false,
		price: "69.99",
		offerType: "SPECIAL PROMOTION",
		offerEndDate: "4 January",
		discountPrice: "34.99",
		discountPercentage: "50",
		tags: ["Adventure", "Action", "Female Protagonist", "Singleplayer", "Open World", "Third Person", "Story Rich", "Puzzle", "Stealth", "Action-Adventure", "Exploration", "Survival", "Violent", "Atmospheric", "Shooter", "Gore", "Great Soundtrack", "Dark", "Multiplayer", "Heist"], // Array of tags
		win: "platform-image win",
		// mac: "platform-image mac",
		features: [
			{ link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",         label: "Single-player"},
			{ link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png",          label: "Online PvP"},
			{ link: "https://store.steampowered.com/search/?category2=39", icon: "/images/ico_coop.png",                 label: "Shared/Split Screen Co-op"},
			{ link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",         label: "Steam Achievements"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",                 label: "In-App Purchases"},
			{ link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",                label: "Steam Cloud"},
			{ link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png",          label: "Remote Play on TV"},
			{ link: "https://store.steampowered.com/search/?category2=44", icon: "/images/ico_remote_play_together.png", label: "Remote Play Together"},
			{ link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",                   label: "HDR available"},
		],
		languages: [
			{ name: "English",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Japanese",            interface: true, fullAudio: true, subtitles: true },
			{ name: "Russian",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Simplified Chinese",  interface: true, fullAudio: true, subtitles: true },
			{ name: "Korean",              interface: true, fullAudio: false,subtitles: true },
			{ name: "French",              interface: true, fullAudio: true, subtitles: true },
			{ name: "German",              interface: true, fullAudio: true, subtitles: true },
			{ name: "Spanish",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Arabic",              interface: true, fullAudio: false,subtitles: true },
			{ name: "Polish",              interface: true, fullAudio: false,subtitles: true },
			{ name: "Portguese",           interface: true, fullAudio: true, subtitles: true },
			{ name: "Turkish",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Thai",                interface: true, fullAudio: true, subtitles: true },
			{ name: "Italian",             interface: true, fullAudio: true, subtitles: true },
			{ name: "Traditional Chinese", interface: true, fullAudio: true, subtitles: true },
			{ name: "Ukrainian",           interface: true, fullAudio: true, subtitles: true },
		],
		link: "www.mortalkombat.com",
		// You can use your own HTML and CSS but scripts are not allowed for security reasons
		about: `<h2 class="bb_tag"><strong>It’s In Our Blood!</strong>
		</h2>Discover a reborn Mortal Kombat™ Universe created by the Fire God Liu Kang. 
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/extras/MK1_FaceOff_KitMil_610x160.png?t=1702393935">
		<h2 class="bb_tag"><strong>New Origins</strong></h2>Reflecting Fire God Liu Kang’s vision of perfection, Mortal Kombat 1’s brand new universe is familiar, yet radically altered.
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/extras/MK1_Blood_Animation_2.gif?t=1702393935">
		<h2 class="bb_tag"><strong>Invasions</strong></h2>Invasions is a dynamic single player campaign with a variety of distinct challenges. With built in progression and RPG mechanics, mixed with MK1’s incredible fighting action, Invasions provides deep, and engaging challenges, and a ton of rewards along the way.
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/extras/MK1_Invasions_Animation_2.gif?t=1702393935">
		<h2 class="bb_tag"><strong>Kameos</strong></h2>Kameos dramatically enhance every fight, assisting teammates with their own Special Moves, Throws and defensive Breakers.
		<br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/extras/MK1_Kameo_Animation.gif?t=1702393935">`,
		mature: true,
		matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>
		This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
		</p>`,
		req: {
			req64: true,
			mini: {
				os: "Windows 7, 64-bit",
				cpu: "Intel® Core™ i5-6600 | AMD Ryzen™ 3 3100 or Ryzen™ 5 2600",
				ram: "8 GB RAM",
				gpu: "Nvidia GeForce® GTX 980 or AMD Radeon™ RX 470 or Intel® Arc™ A750",
				dx: "Version 12",
				storage: "100 GB available space",
			},
			recommended: {
				os: "Windows 10/11 64-bit",
				cpu: "Intel® Core™ i5-8400 | AMD Ryzen™ 5 3600X",
				ram: "8 GB RAM",
				gpu: "Nvidia GeForce® GTX 1080 Ti or AMD Radeon™ RX 5700 XT or Intel® Arc™ A770",
				dx: "Version 12",
				storage: "100 GB available space",
			}
		},
		legal: `MORTAL KOMBAT 1 Software © 2023 Warner Bros. Entertainment Inc. Developed by NetherRealm Studios. All other trademarks and copyrights are the property of their respective owners. All rights reserved.  <br>
		NETHERREALM STUDIOS LOGO, MORTAL KOMBAT, THE DRAGON LOGO, and all related characters and elements are trademarks of and © 2023 Warner Bros. Entertainment Inc. <br>
		 <br>
		WARNER BROS. GAMES LOGO, WARNER BROS. INTERACTIVE LOGO, WB SHIELD: ™ &amp; © Warner Bros. Entertainment Inc. (s23)`,
		reviews: [
			{user:"Ibrahim", type:"positive", date: "12/11/2022", content:"good game"},
			{user:"Samy", type:"positive", date: "1/12/2022", content:"gg"},
			{user:"Mazen", type:"positive", date: "2/12/2022", content:"very good"},
			{user:"mr_assassin", type:"positive", date: "5/12/2022", content:"best"},
			{user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
			{user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"nice"},
			{user:"cringyGaming", type:"negative", date: "12/12/2022", content:"bad"},
			{user:"x_gaming", type:"positive", date: "11/12/2022", content:"gg"},
		]
	},
];

export default gameData;
