export interface RGBA {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}
declare class DaylightHelper {
    kelvinToRGB(temperature: number): RGBA;
    getSunTime(): Promise<{
        dawn: any;
        sunset: any;
        sunrise: any;
        dusk: any;
    }>;
}
declare const singleton: DaylightHelper;
export { singleton as DaylightHelper };
