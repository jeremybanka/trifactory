
#### A web app for designing color palettes.

#### By Jeremy Banka

## Technologies Used

* React JS
* Emotion.js
* styled-components
* luum.js

## Description

A React app I built to serve as an implementation of my color derivation library, luum, in two ways. The first way is to give non-developers a comfy GUI for creating, previewing, and exporting color palettes. The second way is to give developers an example of using luum 'live' to shade and tint a user interface made with any background color.

Beware! The GUI is far from 'comfy' in its present state. But it is still pretty cool, though definitely confusing and a bit slow to run until compiled.

## Setup/Installation Requirements

* Clone this repo: `git clone https://github.com/jeremybanka/trifactory`
* Install dependencies: `npm i` in the main directory
* Serve to yourself: `npm run start` in the main directory
* Or serve with `npm run build` if  you want it to run faster.

## Known Bugs

* When changing a set of hues, hues at the end of your cascading changes may erroneously be given a higher discriminator number than necessary, if their name would be the same as one of the starting hues.

## License

MIT

## Contact Information

hello (at) jeremybanka (dot) com