export interface Track {
  id: number;
  title: string;
  artist: string;
  film?: string;
  year?: number;
  duration: number; // seconds
  videoId: string;
}

export interface Playlist {
  name: string;
  tracks: Track[];
}

// ── 1990s — The Classic SRK Era ────────────────────────────────────
const classicSRK: Track[] = [
  { id: 1, title: "Tu Hi Meri Shab Hai", artist: "Shah Rukh Khan", film: "Baazigar", year: 2000, duration: 300, videoId: "mWBvudKcByg" },
  { id: 2, title: "Baazigar O Baazigar", artist: "Shah Rukh Khan", film: "Baazigar", year: 2000, duration: 300, videoId: "PUO7_Gi6ipg" },
  { id: 3, title: "Ye Kaali Kaali Aankhen", artist: "Shah Rukh Khan", film: "Baazigar", year: 2000, duration: 300, videoId: "IhKXq5dhTag" },
  { id: 4, title: "Kitaben Bahut Si", artist: "Shah Rukh Khan", film: "Baazigar", year: 2000, duration: 300, videoId: "708MrJ6ZJsI" },
  { id: 5, title: "Jaadu Teri Nazar", artist: "Shah Rukh Khan", film: "Darr", year: 2000, duration: 300, videoId: "n_oP9Onj0r0" },
  { id: 6, title: "Tu Mere Saamne", artist: "Shah Rukh Khan", film: "Darr", year: 2000, duration: 300, videoId: "u_5ov9yZj20" },
  { id: 7, title: "Darwaza Band Kar Lo", artist: "Shah Rukh Khan", film: "Darr", year: 2000, duration: 300, videoId: "dIsqDRLD7c8" },
  { id: 8, title: "Ghar Se Nikalte Hi", artist: "Shah Rukh Khan", film: "Papa Kehte Hain", year: 2000, duration: 300, videoId: "_IcVb6hFhPs" },
  { id: 9, title: "Mere Mehboob Mere Sanam", artist: "Shah Rukh Khan", film: "Duplicate", year: 2000, duration: 300, videoId: "08rijnYeSIw" },
  { id: 10, title: "Wah Ji Wah", artist: "Shah Rukh Khan", film: "Duplicate", year: 2000, duration: 300, videoId: "nva8o2tyWpg" },
  { id: 11, title: "Main Koi Aisa Geet Gaoon", artist: "Shah Rukh Khan", film: "Yes Boss", year: 2000, duration: 300, videoId: "vzlXfZlH5dk" },
  { id: 12, title: "Chaand Taare", artist: "Shah Rukh Khan", film: "Yes Boss", year: 2000, duration: 300, videoId: "N3QzaUwml5w" },
  { id: 13, title: "Ek Din Aap Yun", artist: "Shah Rukh Khan", film: "Yes Boss", year: 2000, duration: 300, videoId: "90Q5bMN6u2w" },
  { id: 14, title: "Tujhe Dekha To", artist: "Shah Rukh Khan", film: "DDLJ", year: 2000, duration: 300, videoId: "cNV5hLSa9H8" },
  { id: 15, title: "Mere Khwabon Mein", artist: "Shah Rukh Khan", film: "DDLJ", year: 2000, duration: 300, videoId: "s1LozokQjIg" },
  { id: 16, title: "Ruk Ja O Dil Deewane", artist: "Shah Rukh Khan", film: "DDLJ", year: 2000, duration: 300, videoId: "jBpRItrod-Q" },
  { id: 17, title: "Ho Gaya Hai Tujhko To Pyar Sajna", artist: "Shah Rukh Khan", film: "DDLJ", year: 2000, duration: 300, videoId: "hw_HpTI_Wkw" },
  { id: 18, title: "Na Jaane Mere Dil Ko Kya Ho Gaya", artist: "Shah Rukh Khan", film: "DDLJ", year: 2000, duration: 300, videoId: "hw_HpTI_Wkw" },
  { id: 19, title: "Koi Mil Gaya", artist: "Shah Rukh Khan", film: "Kuch Kuch Hota Hai", year: 2000, duration: 300, videoId: "gmXlGQAg400" },
  { id: 20, title: "Kuch Kuch Hota Hai", artist: "Shah Rukh Khan", film: "Kuch Kuch Hota Hai", year: 2000, duration: 300, videoId: "bKZTnnFU9HA" },
  { id: 21, title: "Tum Paas Aaye", artist: "Shah Rukh Khan", film: "Kuch Kuch Hota Hai", year: 2000, duration: 300, videoId: "bKZTnnFU9HA" },
  { id: 22, title: "Ladki Badi Anjaani Hai", artist: "Shah Rukh Khan", film: "Kuch Kuch Hota Hai", year: 2000, duration: 300, videoId: "WlWlGlvN4L4" },
  { id: 23, title: "Saajanji Ghar Aaye", artist: "Shah Rukh Khan", film: "Kuch Kuch Hota Hai", year: 2000, duration: 300, videoId: "8XtXLVylOoU" },
  { id: 24, title: "Yeh Ladka Hai Deewana", artist: "Shah Rukh Khan", film: "Kuch Kuch Hota Hai", year: 2000, duration: 300, videoId: "F8jufkW0SP8" },
  { id: 25, title: "Soni Soni", artist: "Shah Rukh Khan", film: "Mohabbatein", year: 2000, duration: 300, videoId: "OpLD97fG9Hw" }
];

// ── 2000–2010 — Peak Romance + Superstar Era ──────────────────────
const peakRomance: Track[] = [
  { id: 26, title: "Aankhein Khuli", artist: "Shah Rukh Khan", film: "Mohabbatein", year: 2000, duration: 300, videoId: "eM8Mjuq4MwQ" },
  { id: 27, title: "Humko Humise Chura Lo", artist: "Shah Rukh Khan", film: "Mohabbatein", year: 2000, duration: 300, videoId: "zWPsjhBaRb0" },
  { id: 28, title: "Chalte Chalte", artist: "Shah Rukh Khan", film: "Mohabbatein", year: 2000, duration: 300, videoId: "kzTWRX9Dhrg" },
  { id: 29, title: "Pairon Mein Bandhan Hai", artist: "Shah Rukh Khan", film: "Mohabbatein", year: 2000, duration: 300, videoId: "UZkl2Oam5HQ" },
  { id: 30, title: "Apun Bola", artist: "Shah Rukh Khan", film: "Josh", year: 2000, duration: 300, videoId: "kky-bGlcM04" },
  { id: 31, title: "Hum To Dil Se Haare", artist: "Shah Rukh Khan", film: "Josh", year: 2000, duration: 300, videoId: "2Psd1XZxjOE" },
  { id: 32, title: "Zinda Hain Hum To", artist: "Shah Rukh Khan", film: "Josh", year: 2000, duration: 300, videoId: "qwFaolsLpYE" },
  { id: 33, title: "Hamein Tumse Hua Hai Pyar", artist: "Shah Rukh Khan", film: "Ab Tumhare Hawale Watan Saathiyo", year: 2000, duration: 300, videoId: "siw7-MTgE4s" },
  { id: 34, title: "Roshni Se", artist: "Shah Rukh Khan", film: "Asoka", year: 2000, duration: 300, videoId: "4SbgqiOAhPY" },
  { id: 35, title: "Raat Ka Nasha", artist: "Shah Rukh Khan", film: "Asoka", year: 2000, duration: 300, videoId: "jabKEhOmbZ4" },
  { id: 36, title: "San Sanana", artist: "Shah Rukh Khan", film: "Asoka", year: 2000, duration: 300, videoId: "Pyk3cA2fA8s" },
  { id: 37, title: "Bole Chudiyan", artist: "Shah Rukh Khan", film: "K3G", year: 2000, duration: 300, videoId: "IBvg3WeqP1U" },
  { id: 38, title: "Suraj Hua Maddham", artist: "Shah Rukh Khan", film: "K3G", year: 2000, duration: 300, videoId: "L0zKs8i7Nc8" },
  { id: 39, title: "Yeh Ladka Hai Allah", artist: "Shah Rukh Khan", film: "K3G", year: 2000, duration: 300, videoId: "BE8_rNJOQ-0" },
  { id: 40, title: "You Are My Soniya", artist: "Shah Rukh Khan", film: "K3G", year: 2000, duration: 300, videoId: "2qBWL5Fplu0" },
  { id: 41, title: "Say Shava Shava", artist: "Shah Rukh Khan", film: "K3G", year: 2000, duration: 300, videoId: "ZTARlM0pCP4" },
  { id: 42, title: "Dola Re Dola", artist: "Shah Rukh Khan", film: "Devdas", year: 2000, duration: 300, videoId: "iZ5UItyEpGE" },
  { id: 43, title: "Silsila Ye Chaahat Ka", artist: "Shah Rukh Khan", film: "Devdas", year: 2000, duration: 300, videoId: "NodPBY7tSYY" },
  { id: 44, title: "Maar Daala", artist: "Shah Rukh Khan", film: "Devdas", year: 2000, duration: 300, videoId: "SdWgoPozai8" },
  { id: 45, title: "Hamesha Tumko Chaha", artist: "Shah Rukh Khan", film: "Devdas", year: 2000, duration: 300, videoId: "GUmkGJ0eE5o" },
  { id: 46, title: "Bairi Piya", artist: "Shah Rukh Khan", film: "Devdas", year: 2000, duration: 300, videoId: "kxjNgKMypR4" },
  { id: 47, title: "Tauba Tumhare Yeh Ishare", artist: "Shah Rukh Khan", film: "Chalte Chalte", year: 2000, duration: 300, videoId: "s4qkUZI0m6M" },
  { id: 48, title: "Suno Na Suno Na", artist: "Shah Rukh Khan", film: "Chalte Chalte", year: 2000, duration: 300, videoId: "9hrV2IFsx5s" },
  { id: 49, title: "Tumhein Jo Maine Dekha", artist: "Shah Rukh Khan", film: "Main Hoon Na", year: 2000, duration: 300, videoId: "g6K-ldk6p_w" },
  { id: 50, title: "Main Hoon Na", artist: "Shah Rukh Khan", film: "Main Hoon Na", year: 2000, duration: 300, videoId: "DIJW7rWPkSw" },
  { id: 51, title: "Tere Liye", artist: "Shah Rukh Khan", film: "Veer-Zaara", year: 2000, duration: 300, videoId: "OSaVImLnnsw" },
  { id: 52, title: "Do Pal", artist: "Shah Rukh Khan", film: "Veer-Zaara", year: 2000, duration: 300, videoId: "HPsxxBhv9kc" },
  { id: 53, title: "Main Yahaan Hoon", artist: "Shah Rukh Khan", film: "Veer-Zaara", year: 2000, duration: 300, videoId: "m6Y8xEfyXTs" },
  { id: 54, title: "Aisa Des Hai Mera", artist: "Shah Rukh Khan", film: "Veer-Zaara", year: 2000, duration: 300, videoId: "wDheWYmNEhQ" },
  { id: 55, title: "Yeh Hum Aa Gaye Hain Kahan", artist: "Shah Rukh Khan", film: "Veer-Zaara", year: 2000, duration: 300, videoId: "xQ-34j4jKes" },
  { id: 56, title: "Yeh Jo Des Hai Tera", artist: "Shah Rukh Khan", film: "Swades", year: 2000, duration: 300, videoId: "4tiVPuLbbHg" },
  { id: 57, title: "Yun Hi Chala Chal", artist: "Shah Rukh Khan", film: "Swades", year: 2000, duration: 300, videoId: "JbNlkYQG5XI" },
  { id: 58, title: "Kal Ho Naa Ho", artist: "Shah Rukh Khan", film: "Kal Ho Naa Ho", year: 2000, duration: 300, videoId: "g0eO74UmRBs" },
  { id: 59, title: "Pretty Woman", artist: "Shah Rukh Khan", film: "Kal Ho Naa Ho", year: 2000, duration: 300, videoId: "70QpN7DvaK4" },
  { id: 60, title: "It's the Time to Disco", artist: "Shah Rukh Khan", film: "Kal Ho Naa Ho", year: 2000, duration: 300, videoId: "M03GOY5eINg" },
  { id: 61, title: "Tujh Mein Rab Dikhta Hai", artist: "Shah Rukh Khan", film: "Rab Ne Bana Di Jodi", year: 2000, duration: 300, videoId: "qoq8B8ThgEM" }
];

export const playlists: Playlist[] = [
  { name: "90s SRK", tracks: classicSRK },
  { name: "2000s SRK", tracks: peakRomance },
];
