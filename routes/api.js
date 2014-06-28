var router = require('express').Router()
  , exec = require('child_process').exec
  , params = require('express-params')
  , pins = {
        red: 18,
        green: 23,
        blue: 24
    }
  , currentColor = {};

params.extend(router);

router.param('color', /^[0-9a-f]{6}$/);

router.get('/color', function(req, res) {
    res.json({
        r: currentColor.red || 0,
        g: currentColor.green || 0,
        b: currentColor.blue || 0
    });
});

router.get('/color/:color', function(req, res) {
    var components = req.params.color[0].match(/.{2}/g).map(function(c) { return parseInt(c, 16); });

    currentColor.red = components[0];
    currentColor.green = components[1];
    currentColor.blue = components[2];

    [{
        pin: pins.red,
        brightness: currentColor.red
    }, {
        pin: pins.green,
        brightness: currentColor.green
    }, {
        pin: pins.blue,
        brightness: currentColor.blue
    }].map(function(c) {
        return {
            pin: c.pin,
            brightness: (c.brightness / 255.0).toFixed(2)
        };
    }).forEach(function(c) {
        var command = 'echo "' + c.pin + '=' + c.brightness + '" > /dev/pi-blaster';

        console.log(command);
        exec(command);
    });

    res.json({
        r: red,
        g: green,
        b: blue
    });
});

module.exports = router;