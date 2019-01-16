import EventListener from './EventListener';
import { IRGB } from './Helper';
export declare const kDaylighPresets: {
    name: string;
    desc: string;
    day: number;
    night: number;
    late: number;
}[];
export interface IDaylightPreset {
    name?: string;
    description?: string;
    day?: number;
    night?: number;
    late?: number;
}
export interface ITemperature {
    mode: string;
    kelvin: number;
}
export declare enum DaylightEvent {
    OnEnableChange = 1,
    OnChange = 2
}
declare class Daylight extends EventListener {
    private _enable;
    private _dawn;
    private _sunrise;
    private _sunset;
    private _dusk;
    private _wakeTime;
    private _bedTime;
    private _preset;
    private _rgb;
    private _opacity;
    private _handleInterval;
    constructor(preset?: IDaylightPreset);
    setEnable(value: boolean): void;
    setSunTime(dawn: number, sunrise: number, sunset: number, dusk: number): void;
    setUserTime(wakeupTime: number, bedTime: number): void;
    getAllPresets(): {
        name: string;
        desc: string;
        day: number;
        night: number;
        late: number;
    }[];
    setPreset(name: string): void;
    setOverrideValue(day: any, night: any, late: any): void;
    setOpacity(value: number): void;
    getRGB(): IRGB;
    private _getTemperature;
    private _update;
    private _handleOnInterval;
}
declare const daylight: Daylight;
export { daylight };
