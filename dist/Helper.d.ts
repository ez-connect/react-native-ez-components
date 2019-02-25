export interface RGBA {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}
export default class Helper {
    static kelvinToRGB(temperature: number): RGBA;
    static getSunTime(): Promise<{
        dawn: any;
        sunset: any;
        sunrise: any;
        dusk: any;
    }>;
}
