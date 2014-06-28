var router = require('express').Router()
  , exec = require('child_process').exec
  , params = require('express-params')
  , pins = {
        red: 18,
        green: 23,
        blue: 24
    };

params.extend(router);

router.param('color', /^[0-9a-f]{6}$/);

router.get('/color/:color', function(req, res) {
    var components = req.params.color[0].match(/.{2}/g).map(function(c) { return parseInt(c, 16); })
      , red = components[0]
      , green = components[1]
      , blue = components[2];

    [{
        pin: pins.red,
        brightness: red
    }, {
        pin: pins.green,
        brightness: green
    }, {
        pin: pins.blue,
        brightness: blue
    }].map(function(c) {
        return {
            pin: c.pin,
            brightness: Math.round(100 * c.brightness / 255.0) / 100
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