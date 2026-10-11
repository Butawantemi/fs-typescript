export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export type DiaryEntry = {
  id: number;
  weather: Weather;
  visibility: Visibility;
  date: string;
  comment: string;
};

export type NewDairy = Omit<DiaryEntry, "id">;
