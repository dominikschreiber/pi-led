led
===

start with

```bash
forever start bin/www
```

stop with

```bash
forever stop bin/www
```

api
---

change the color of the leds to <hex-value>
```bash
/api/color/<hex-value>
# i.e. /api/color/c0ffee
```