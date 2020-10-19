const tenths = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

const hueRange = (a, z) => ({
  axes: [
    {
      attribute: 'hue',
      to: a,
      from: z,
    },
    {
      attribute: 'sat',
      to: 255,
      from: 255,
    },
  ],
  steps: tenths,
  preferAttribute: 'sat',
})

export const basic = {
  hues: {
    form: 'polar',
    list: [0, 180],
  },
  colors: [
    {
      linkFromHues: 0,
      hue: 180,
      sat: 127,
      lum: 0.50,
      processions: [
        {
          axes: [
            {
              attribute: 'lum',
              from: 0,
              to: 1,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
          preferAttribute: 'lum',
        },
        {
          axes: [
            {
              attribute: 'sat',
              to: 255,
              from: 0,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
          preferAttribute: 'sat',
        },
      ],
    },

    {
      linkFromHues: 0,
      hue: 180,
      sat: 0,
      lum: 0,
      processions: [
        hueRange(0, 60),
        hueRange(30, 90),
        hueRange(60, 120),
        hueRange(90, 150),
        hueRange(120, 180),
        hueRange(150, 210),
        hueRange(180, 240),
        hueRange(210, 270),
        hueRange(240, 300),
        hueRange(270, 300),
        hueRange(300, 360),
        hueRange(330, 390),
      ],
    },

  ],
}
