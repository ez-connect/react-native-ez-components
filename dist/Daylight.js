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
    DaylightEvent[DaylightEvent["OnChange"] = 2] = "OnChange";
})(DaylightEvent || (DaylightEvent = {}));
const kDaylightUpdateInterval = 0.1 * 60 * 1000;
const kOpacityMin = 0.05;
const kOpacityMax = 0.3;
const kOpacityDefault = 0.1;
class Daylight extends EventListener {
    constructor(preset) {
        super();
        this._handleOnInterval = () => {
            this._update();
        };
        this._sunriseAt = new Date().setHours(6, 0, 0);
        this._sunriseAt = new Date().setHours(18, 0, 0);
        this._wakeTimeAt = new Date().setHours(6, 0, 0);
        this._bedTimeAt = new Date().setHours(22, 0, 0);
        this._preset = preset || kDaylighPresets[0];
        this._opacity = kOpacityDefault;
        this._rgb = { red: 0, green: 0, blue: 0 };
        this._handleInterval = null;
    }
    setEnable(value) {
        this._enable = value;
        if (value) {
            this._handleInterval && clearInterval(this._handleInterval);
            this._handleInterval = setInterval(this._handleOnInterval, kDaylightUpdateInterval);
            this._update();
        }
        else {
            clearInterval(this._handleInterval);
            this._handleInterval = null;
        }
        super.emmit(DaylightEvent.OnEnableChange, value);
    }
    getAllPresets() {
        return kDaylighPresets;
    }
    setPreset(name) {
        const preset = kDaylighPresets.find((x) => x.name === name) || kDaylighPresets[0];
        this._preset = preset;
        this._update();
    }
    setOverrideValue(day, night, late) {
        Object.assign(this._preset, { day, night, late });
        this._update();
    }
    setSun(sunrise, sunset) {
        this._sunriseAt = sunrise;
        this._sunsetAt = sunset;
    }
    setOpacity(value) {
        this._opacity = kOpacityMin + (value * (kOpacityMax - kOpacityMin));
        this._update(true);
    }
    getRGB() {
        return this._rgb;
    }
    _getTemperature() {
        let mode;
        let kelvin;
        const { day, night, late } = this._preset;
        const now = new Date().getTime();
        if (now > this._sunriseAt) {
            if (now < this._sunsetAt) {
                mode = 'day';
                kelvin = day;
            }
            else if (now < this._bedTimeAt) {
                mode = 'night';
                kelvin = night;
            }
            else {
                mode = 'late';
                kelvin = late;
            }
        }
        else {
            kelvin = late;
        }
        return { mode, kelvin };
    }
    _update(shouldForceUpdate = false) {
        const { mode, kelvin } = this._getTemperature();
        const rgb = Helper.kelvinToRGB(kelvin);
        const { red, green, blue } = rgb;
        if (shouldForceUpdate || this._rgb.red !== red || this._rgb.green !== green || this._rgb.blue !== blue) {
            this._rgb = rgb;
            super.emmit(DaylightEvent.OnChange, { mode, opacity: this._opacity, red, green, blue });
        }
    }
}
const daylight = new Daylight();
export { daylight };
