export interface IRGB {
    red: number;
    green: number;
    blue: number;
}
export default class Helper {
    static kelvinToRGB(temperature: number): IRGB;
}
