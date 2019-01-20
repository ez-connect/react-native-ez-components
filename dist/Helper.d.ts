export interface IRGBA {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}
export default class Helper {
    static kelvinToRGB(temperature: number): IRGBA;
    static getSunTime(): Promise<{
        dawn: any;
        sunset: any;
        sunrise: any;
        dusk: any;
    }>;
}
