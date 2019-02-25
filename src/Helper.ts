
export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

export default class Helper {
  /**
   * http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
   * Reference: https://github.com/mattdesl/kelvin-to-rgb
   */
  public static kelvinToRGB(temperature: number): RGBA {
    temperature = temperature / 100;
    let red = 0;
    let blue = 0;
    let green = 0;

    if (temperature <= 66) {
      red = 255;
    } else {
      red = temperature - 60;
      red = 329.698727466 * Math.pow(red, -0.1332047592);
      if (red < 0) {
        red = 0;
      }
      if (red > 255) {
        red = 255;
      }
    }

    if (temperature <= 66) {
      green = temperature;
      green = 99.4708025861 * Math.log(green) - 161.1195681661;
      if (green < 0) {
        green = 0;
      }
      if (green > 255) {
        green = 255;
      }
    } else {
      green = temperature - 60;
      green = 288.1221695283 * Math.pow(green, -0.0755148492);
      if (green < 0) {
        green = 0;
      }
      if (green > 255) {
        green = 255;
      }
    }

    if (temperature >= 66) {
      blue = 255;
    } else {
      if (temperature <= 19) {
        blue = 0;
      } else {
        blue = temperature - 10;
        blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        if (blue < 0) {
          blue = 0;
        }
        if (blue > 255) {
          blue = 255;
        }
      }
    }

    return { red, green, blue };
  }

  public static async getSunTime() {
    try {
      const res = await fetch('https://sun.p.rapidapi.com/api/sun/?ip_address=174.20.20.55&date=2016-07-18', {
        headers: { 'X-RapidAPI-Key': 'WCJzCLMx65mshtSVxIToCLKUgNUpp1jLyIljsntAp3bd7WhRJE' },
      });

      if (res) {
        const items = await res.json();
        let dawn = null;
        let sunset = null;
        let sunrise = null;
        let dusk = null;

        for (const item of items) {
          if (item.hasOwnProperty('dawn')) {
            dawn = new Date(item.dawn).getTime();
          } else if (item.hasOwnProperty('sunset')) {
            sunset = new Date(item.sunset).getTime();
          } else if (item.hasOwnProperty('sunrise')) {
            sunrise = new Date(item.sunrise).getTime();
          } else if (item.hasOwnProperty('dusk')) {
            dusk = new Date(item.dusk).getTime();
          }
        }

        if (dawn && sunset && sunrise && dusk) {
          if (dawn.getDate() && sunset.getDate() && sunrise.getDate() && dusk.getDate()) {
            return { dawn, sunset, sunrise, dusk };
          }
        }
      }
      return null;
    } catch (err) {
      return null;
    }
  }
}
