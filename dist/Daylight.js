import { addMinutes, subMinutes } from 'date-fns';
import EventListener from './EventListener';
import Helper from './Helper';
export const kDaylighPresets = [
    {
        name: 'Recommended Colors',
        desc: 'Warm at sunset, with a candle before bed',
        day: 6500,
        night: 3400,
        late: 1900,
    },
    {
        name: 'Reduce Eyestrain',
        desc: 'Reduce eyestrain, day and night',
        day: 5900,
        night: 3600,
        late: 2400,
    },
    {
        name: 'Working Late',
        desc: 'Bright after sunset, and wind down for bed',
        day: 6500,
        night: 6500,
        late: 2300,
    },
    {
        name: 'Far from the Equator',
        desc: 'A tinge of sunset, with a candle at bedtime',
        day: 6500,
        night: 5500,
        late: 1900,
    },
    {
        name: 'Classic',
        desc: 'Warm at sunset, and all night too',
        day: 6500,
        night: 3400,
        late: 3400,
    },
    {
        name: 'Cave Painting',
        desc: 'Extra-warm light all the time',
        day: 2700,
        night: 2300,
        late: 1500,
    },
    {
        name: 'Color Fidelity',
        desc: 'Smaller adjustments, better for color accuracy',
        day: 6500,
        night: 5000,
        late: 3400,
    },
];
export var DaylightEvent;
(function (DaylightEvent) {
    DaylightEvent[DaylightEvent["OnEnableChange"] = 1] = "OnEnableChange";
    DaylightEvent[DaylightEvent["OnSunChange"] = 2] = "OnSunChange";
    DaylightEvent[DaylightEvent["OnChange"] = 3] = "OnChange";
})(DaylightEvent || (DaylightEvent = {}));
const kDaylightUpdateInterval = 1 * 60 * 1000;
const kAlphaMin = 0.05;
const kAlphaMax = 0.3;
const kAlphaDefault = 0.2;
class Daylight extends EventListener {
    constructor(preset) {
        super();
        this._handleOnInterval = () => {
            this._update();
        };
        this._dawn = new Date().setHours(5, 0, 0);
        this._sunrise = new Date().setHours(6, 0, 0);
        this._sunset = new Date().setHours(17, 0, 0);
        this._dusk = new Date().setHours(18, 0, 0);
        this._wakeTime = new Date().setHours(6, 0, 0);
        this._bedTime = new Date().setHours(22, 0, 0);
        this._preset = preset || kDaylighPresets[0];
        this._rgba = { red: 0, green: 0, blue: 0, alpha: kAlphaDefault };
        this._handleInterval = null;
    }
    async setEnable(value) {
        this._enable = value;
        if (value) {
            this._handleInterval && clearInterval(this._handleInterval);
            this._handleInterval = setInterval(this._handleOnInterval, kDaylightUpdateInterval);
            this._update();
            const sun = await Helper.getSunTime();
            if (sun) {
                const { dawn, sunrise, sunset, dusk } = sun;
                this.setSunTime(dawn, sunrise, sunset, dusk);
            }
        }
        else {
            clearInterval(this._handleInterval);
            this._handleInterval = null;
        }
        super.emmit(DaylightEvent.OnEnableChange, value);
    }
    setSunTime(dawn, sunrise, sunset, dusk) {
        this._dawn = dawn;
        this._sunrise = sunrise;
        this._sunset = sunset;
        this._dusk = dusk;
        super.emmit(DaylightEvent.OnSunChange, { dawn, sunrise, sunset, dusk });
    }
    getSunTime() {
        return { dawn: this._dawn, sunrise: this._sunrise, sunset: this._sunset, dusk: this._dusk };
    }
    setUserTime(wakeTime, bedTime) {
        this._wakeTime = wakeTime;
        this._bedTime = bedTime;
        this._update(true);
    }
    getAllPresets() {
        return kDaylighPresets.map((x) => x.name);
    }
    setPreset(name) {
        const preset = kDaylighPresets.find((x) => x.name === name) || kDaylighPresets[0];
        this._preset = preset;
        this._update();
    }
    getPreset() {
        return this._preset.name;
    }
    getData(step = 15) {
        const items = [];
        const from = subMinutes(new Date(), 3 * 60);
        const to = addMinutes(new Date(), 21 * 60);
        let time = subMinutes(new Date(), 3 * 60);
        let counter = 0;
        while (counter < 24 * step) {
            const kelvin = this._getTemperature(time.getTime()).kelvin;
            const rgba = Helper.kelvinToRGB(kelvin);
            items.push({ time, kelvin, rgba });
            time = addMinutes(time, step);
            counter++;
        }
        const day = {
            argb: Helper.kelvinToRGB(this._preset.day),
            height: 1,
        };
        const night = {
            argb: Helper.kelvinToRGB(this._preset.night),
            height: this._preset.night / this._preset.day,
        };
        const late = {
            argb: Helper.kelvinToRGB(this._preset.late),
            height: this._preset.late / this._preset.day,
        };
        const { kelvin } = this._getTemperature(new Date().getTime());
        const now = {
            argb: Helper.kelvinToRGB(kelvin),
            height: kelvin / this._preset.day,
        };
        return { day, night, late, now, items };
    }
    _getTemperature(time, wakeTime, bedTime) {
        let mode;
        let kelvin;
        const { day, night, late } = this._preset;
        const now = time || new Date().getTime();
        wakeTime = wakeTime || this._wakeTime;
        bedTime = bedTime || this._bedTime;
        if (now > bedTime) {
            mode = 'late';
            kelvin = late;
        }
        else if (now > this._dusk) {
            mode = 'night';
            kelvin = night;
        }
        else if (now > this._sunset) {
            const diff = (now - this._sunset) * (night - day) / (this._dusk - this._sunset);
            mode = 'dusk';
            kelvin = day + diff;
        }
        else if (now > this._sunrise) {
            mode = 'day';
            kelvin = day;
        }
        else if (now > this._dawn) {
            const diff = (now - this._dawn) * (day - night) / (this._sunrise - this._dawn);
            mode = 'dawn';
            kelvin = night + diff;
        }
        else {
            if (now > wakeTime) {
                mode = 'night';
                kelvin = night;
            }
            else {
                mode = 'late';
                kelvin = late;
            }
        }
        return { mode, kelvin };
    }
    _update(shouldForceUpdate = false, time, wakeTime, bedTime) {
        const { mode, kelvin } = this._getTemperature(time, wakeTime, bedTime);
        const { red, green, blue } = Helper.kelvinToRGB(kelvin);
        if (shouldForceUpdate || this._rgba.red !== red || this._rgba.green !== green || this._rgba.blue !== blue) {
            Object.assign(this._rgba, { red, green, blue });
            super.emmit(DaylightEvent.OnChange, { mode, color: this._rgba });
        }
    }
}
const daylight = new Daylight();
export { daylight };
