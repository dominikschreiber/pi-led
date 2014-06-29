var _ = require('underscore')
  , color = require('onecolor')
  , router = require('express').Router()
  , exec = require('child_process').exec
  , pins = {
        r: 18,
        g: 23,
        b: 24
    }
  , current = {
        r: 0,
        g: 0,
        b: 0
    };

/**
 * see http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * @param h hue in [0..1]
 * @param s saturation in [0..1]
 * @param l lightness in [0..1]
 * @return [r, g, b] values with r, g, b in [0..1]
 */
function hslToRgb(h, s, l){
    var r, g, b, q, p;

    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        r = hueToRgb(p, q, h + 1/3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1/3);
    }
    return [r, g, b];
}

function hueToRgb(p, q, t){
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
}

/**
 * sets pins in `pins` to intensities according to hsl color
 * @param h, s, l in [0..1] (@see hslToRgb(h, s, l))
 */
function setColor(h, s, l) {
    _.each(_.zip(['r', 'g', 'b'], hslToRgb(h, s, l)), function(pinAndColor) {
        var pinKey = pinAndColor[0]
          , pin = pins[pinKey]
          , color = pinAndColor[1].toFixed(3);

        current[pinKey] = Math.round(color * 255);
        exec('echo "' + pin + '=' + color + '" > /dev/pi-blaster');
    });
}

/**
 * @param color {r: [0..255], g: [0..255], b: [0..255]}
 * @return color converted to #-prefixed hex string (i.e. #c0ffee)
 */
function rgbColorToRgbHexString(color) {
    return '#' + _.map(Object.keys(color), function(key) { return ('00' + color[key].toString(16)).slice(-2); }).join('');
}

/**
 * sends the color the pins are currently set to
 * as rgb hex string (i.e. #c0ffee)
 */
router.get('/color', function(req, res) {
    res.send(rgbColorToRgbHexString(current));
});

/**
 * post data:
 * { color: { h: [0..1], s: [0..1], l: [0..1] } }
 */
router.post('/color', function(req, res) {
    var color = req.body.color;

    setColor(color.h, color.s, color.l);

    res.send(rgbColorToRgbHexString(current));
});

module.exports = router;