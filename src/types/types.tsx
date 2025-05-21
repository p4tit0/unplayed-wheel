export type Game = {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  [key: string]: unknown;
};

export type SteamGamesResponse = {
  response: {
    game_count: number;
    games?: Game[];
  };
};