led
===

installation
------------

The leds are controlled with [pi-blaster](https://github.com/sarfata/pi-blaster), so at first you need to install this:

```bash
# install dependencies
sudo apt-get install git-core automake
# get pi-blaster
git clone https://github.com/sarfata/pi-blaster
# build + install pi-blaster
cd pi-blaster
./autogen.sh
./configure
make
sudo make install
```

Then, clone this repository and install the dependencies:

```bash
# get pi-led (this repository)
git clone https://github.com/dominikschreiber/pi-led
cd pi-led
npm install
# start as daemon
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