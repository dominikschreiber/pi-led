pi-led
======

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
npm start
# stop daemon
npm stop
```