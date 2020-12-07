const tenths = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
const dynamicRange = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.94, 0.97]

const hueRange = (a, z) => ({
  axes: [
    {
      attribute: 'hue',
      from: a,
      to: z,
    },
    {
      attribute: 'sat',
      from: 255,
      to: 255,
    },
  ],
  steps: tenths,
  prefer: 'sat',
})
const shadeRange = hue => ({
  axes: [
    {
      attribute: 'hue',
      from: hue,
      to: hue,
    },
    {
      attribute: 'sat',
      from: 255,
      to: 255,
    },
    {
      attribute: 'lum',
      from: 0,
      to: 1,
    },
  ],
  steps: dynamicRange,
  prefer: 'lum',
})

export default {
  default: {
    hues: [
      { id: 0.2,
        name: 'indigo',
        angle: 240,
        nameIsDerived: false,
        hueIsDerived: false,
        deriveHue: null },
      { id: 0.5,
        name: 'lime',
        angle: 90,
        nameIsDerived: false,
        hueIsDerived: true,
        deriveHue: {
          from: 'indigo',
          via: 'split',
          to: 0,
        } },
    ],
    colors: [
      { id: 333,
        hueIsLinked: true,
        linkedToHue: 'indigo',
        hue: 240,
        sat: 255,
        lum: 0.50,
        prefer: 'sat',
        history: {
          marker: 0,
          timeline: [],
        },
        gradients: [
          { steps: tenths,
            prefer: 'sat',
            axes: [
              { attribute: 'hue',
                relative: true,
                from: -20,
                to: 20 },
            ] },
          { steps: tenths,
            prefer: 'lum',
            axes: [
              { attribute: 'hue',
                relative: true,
                from: -20,
                to: 20 },
            ] },
          { steps: tenths,
            prefer: 'lum',
            axes: [
              { attribute: 'lum',
                from: 0,
                to: 1 },
            ] },
          { steps: tenths,
            prefer: 'sat',
            axes: [
              { attribute: 'sat',
                to: 255,
                from: 0 },
            ] },
        ] },
      { hueIsLinked: false,
        linkedToHue: null,
        hue: 215,
        sat: 0,
        lum: 0,
        history: {
          marker: 0,
          timeline: [],
        },
        gradients: [
          hueRange(0, 60),
          hueRange(30, 90),
          hueRange(60, 120),
          hueRange(90, 150),
          hueRange(120, 180),
          hueRange(150, 210),
          hueRange(180, 240),
          hueRange(210, 270),
          hueRange(240, 300),
          hueRange(270, 330),
          hueRange(300, 360),
          hueRange(330, 390),
        ] },
      { hueIsLinked: false,
        linkedToHue: null,
        hue: 0,
        sat: 0,
        lum: 0,
        history: {
          marker: 0,
          timeline: [],
        },
        gradients: [
          shadeRange(10),
          shadeRange(20),
          shadeRange(50),
          shadeRange(80),
          shadeRange(110),
          shadeRange(140),
          shadeRange(170),
          shadeRange(200),
          shadeRange(230),
          shadeRange(260),
          shadeRange(290),
          shadeRange(320),
        ] },
    ],
  },
}
