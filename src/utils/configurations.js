export const basic = {
  hues: {
    form: 'polar',
    list: [0, 180],
  },
  colors: [
    {
      link: true,
      linkedHue: 0,
      hue: 180,
      sat: 127,
      lum: 0.50,
      prefer: 'lum',
      variations: [
        {
          axes: [
            {
              id: 'lum',
              min: 0,
              max: 1,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
        {
          axes: [
            {
              id: 'sat',
              min: 0,
              max: 255,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
      ],
    },
    {
      link: true,
      linkedHue: 0,
      hue: 180,
      sat: 0,
      lum: 0,
      prefer: 'lum',
      variations: [
        {
          axes: [
            {
              id: 'hue',
              min: 5,
              max: 55,
            },
            {
              id: 'sat',
              min: 255,
              max: 255,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
        {
          axes: [
            {
              id: 'hue',
              min: 190,
              max: 250,
            },
            {
              id: 'sat',
              min: 255,
              max: 255,
            },
          ],
          steps: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97],
        },
      ],
    },
  ],
}
