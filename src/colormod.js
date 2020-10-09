// this is logic I wrote to produce random variations in colors

// from a given color and X, Y, Z random numbers, a new color
// is produced with

const UUIDs = [
  "0e02e392-760e-48f8-b0d4-fcb5869896f5",
  "1ebee87a-775a-4c5a-877c-3f12544071e3",
  "44a423b0-2aaa-42d6-a31a-a3e30b6fb152",
  "699feabe-bb19-4a16-81f5-96a519b947d4",
  "70c7f392-95d6-45aa-836e-a08e62f8d280",
  "74b7e324-a53e-4f45-be61-de379e1ce54d",
  "7670484f-d261-4ac4-bcc5-cbd4f8c3df0e",
  "8b1bd36d-b0fe-4b26-8ca6-5c6a3d610d46",
  "d4b2e053-6861-4f5a-905c-9a76d307e4c6",
]
const firstTwoChars = [0, 2]
const secndTwoChars = [2, 2]
const thirdTwoChars = [4, 2]
function getFraction([a, n], hexadecimalNumber) {
  return parseInt(hexadecimalNumber.substr(a, n), 16) / 255
}

document.body.onload = makeIconForEachUUID
function makeIconForEachUUID() {
  UUIDs.forEach(UUID => {
    const icon = document.createElement("i")
    icon.id = UUID
    icon.className = "icon"
    icon.innerHTML =
      "<span class='fill'>Sp</span><span class='outline'>Sp</span>"
    const currentDiv = document.getElementById("div1")
    document.body.insertBefore(icon, currentDiv.nextSibling)
  })
}

function saturationFilter(hue) {
  // console.log(hue)
  let desaturator = 0
  if(hue > 50 && hue < 230) {
    desaturator = Math.abs(Math.cos((Math.PI * (hue - 140)) / 180))
  }
  return desaturator
}

function lightnessFilter(hue, role, desaturator) {
  // console.log(hue, role)
  const greenLuma = 0.7152 * (1 - desaturator)
  // console.log("brightest green", greenLuma)
  let inherentLuma
  console.log("actual hue", hue)

  hue /= 60

  if(hue <= 1) {
    inherentLuma = 0.2126 + hue * greenLuma
  }
  if(hue <= 2 && hue > 1) {
    hue -= 1
    inherentLuma = greenLuma + (1 - hue) * 0.2126 // adjust green down if it's the main color
  }
  if(hue <= 3 && hue > 2) {
    hue -= 2
    inherentLuma = greenLuma + hue * 0.0722
  }
  if(hue <= 4 && hue > 3) {
    hue -= 3
    inherentLuma = 0.0722 + (1 - hue) * greenLuma
  }
  if(hue <= 5 && hue > 4) {
    hue -= 4
    inherentLuma = 0.0722 + hue * 0.2126 // adjust green down if it's the main color
  }
  if(hue > 5) {
    hue -= 5
    inherentLuma = 0.2126 + (1 - hue) * 0.0722
  }
  if(role === "light") {
    if(inherentLuma <= 0.5) {
      console.log("darkLuma: ", inherentLuma)
      const minLightness =
        100 * (0.5 + (0.6 - inherentLuma) / (2 - 2 * inherentLuma))
      return { min: minLightness, max: 90 }
    }
    console.log("lightLuma: ", inherentLuma)
    const minLightness = 50 * (0.6 / inherentLuma)
    return { min: minLightness, max: 90 }

  }
  if(role === "dark") {
    if(inherentLuma <= 0.5) {
      const maxLightness =
        100 * (0.5 + (0.4 - inherentLuma) / (2 - 2 * inherentLuma))
      return { min: 10, max: maxLightness }
    }
    const maxLightness = 50 * (0.4 / inherentLuma)
    return { min: 10, max: maxLightness }

  }
  return { min: 10, max: 90 }
}

function applyFilters(hue, role) {
  const desaturator = saturationFilter(hue)
  const lightnessBounds = lightnessFilter(hue, role, desaturator)
  const maxSaturation = 100 - 60 * desaturator
  console.log("Minimum Lightness: ", lightnessBounds.min)
  return { lightnessBounds, maxSaturation }
}

function mutateHue(hue, mutagen, hueMutability = 0) {
  const hueMod = hueMutability * (mutagen - 0.5)
  let mutantHue = hue + hueMod
  if(mutantHue < 0) {
    mutantHue += 360
  }
  if(mutantHue > 360) {
    mutantHue -= 360
  } // newHue is *always* 0–360
  return mutantHue
}

function mutateSaturation(saturation, mutagen, maxSaturation) {
  // console.log("Saturation in: " + saturation)
  const saturationMod = 75 * (mutagen - 0.5)
  // console.log("Change in Saturation: " + saturationMod)
  let mutantSaturation = saturation + saturationMod
  if(mutantSaturation > maxSaturation) {
    mutantSaturation = maxSaturation
  }
  // console.log("Saturation out: " + newSaturation)
  return mutantSaturation
}

function mutateLightness(lightness, mutagen, lightnessBounds) {
  const lightnessMod = 20 * (mutagen - 0.5)
  let mutantLightness = lightness + lightnessMod
  if(mutantLightness < lightnessBounds.min) {
    mutantLightness = lightnessBounds.min
  }
  if(mutantLightness > lightnessBounds.max) {
    mutantLightness = lightnessBounds.max
  }
  return mutantLightness
}

function mutateColor(colorHSL, mutagens, settings) {
  colorHSL = colorHSL || {
    hue: 0,
    saturation: 100,
    lightness: 50,
  } // this is computer red, or #f00
  mutagens = mutagens || {
    X: getFraction(firstTwoChars, UUIDs[0]) || 0.5,
    Y: getFraction(secndTwoChars, UUIDs[0]) || 0.5,
    Z: getFraction(thirdTwoChars, UUIDs[0]) || 0.5,
  }
  settings = settings || {
    hueMutability: 100,
    role: "light",
  }
  // console.log(colorHSL,mutagens,settings)

  // console.log(settings)
  const mutantHue = mutateHue(colorHSL.hue, mutagens.X, settings.hueMutability)
  const filters = applyFilters(mutantHue, settings.role)
  const { maxSaturation } = filters
  const { lightnessBounds } = filters
  // console.log(maxSaturation)

  // console.log(colorHSL.saturation, mutagens.Y, maxSaturation)
  const mutantSaturation = mutateSaturation(
    colorHSL.saturation,
    mutagens.Y,
    maxSaturation
  )
  const mutantLightness = mutateLightness(
    colorHSL.lightness,
    mutagens.Z,
    lightnessBounds
  )
  const mutantColor = `hsl(${mutantHue}, ${mutantSaturation}%, ${mutantLightness}%)`
  return mutantColor
}

// process hexcode into hsl object

// process uuids into random fractions "mutagens"

// settings object

// mutate hue (hue, mutagen, settings)
// mutate hue
// evaluate hue: create saturation maximum
// evaluate hue w respect to context: create lightness min or max

function spawnMutants(colorHSL) {
  // console.log("&&&& ", hueMutability)
  UUIDs.forEach(UUID => {
    const mutagens = {
      X: getFraction(firstTwoChars, UUID),
      Y: getFraction(secndTwoChars, UUID),
      Z: getFraction(thirdTwoChars, UUID),
    }
    const settings = {
      hueMutability: document.getElementById("hue-mutability-input").value,
      role: "light",
    }
    const mutantColor = mutateColor(colorHSL, mutagens, settings)
    const iconFill = document
      .getElementById(UUID)
      .getElementsByClassName("fill")[0]
    const iconLine = document
      .getElementById(UUID)
      .getElementsByClassName("outline")[0]
    iconFill.style.color = mutantColor
    iconLine.style.fontVariationSettings = `'LINE' ${300 * mutagens.Y}`
    // console.log(iconLine.style.fontVariationSettings)
  })
}

function channelFromHexcode(hex, location) {
  return parseInt(hex.substr(location, 2), 16) / 255
}

function hexToHSL(colorHex) {
  let min
  let max
  let i
  let l
  let s
  let maxcolor
  let h
  const rgb = []
  rgb[0] = channelFromHexcode(colorHex, 1)
  rgb[1] = channelFromHexcode(colorHex, 3)
  rgb[2] = channelFromHexcode(colorHex, 5)
  min = rgb[0]
  max = rgb[0]
  maxcolor = 0
  for(i = 0; i < rgb.length - 1; i++) {
    if(rgb[i + 1] <= min) {
      min = rgb[i + 1]
    }
    if(rgb[i + 1] >= max) {
      max = rgb[i + 1]
      maxcolor = i + 1
    }
  }
  if(maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min)
  }
  if(maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min)
  }
  if(maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min)
  }
  if(isNaN(h)) {
    h = 0
  }
  h *= 60
  if(h < 0) {
    h += 360
  }
  l = (min + max) / 2
  if(min == max) {
    s = 0
  } else if(l < 0.5) {
    s = (max - min) / (max + min)
  } else {
    s = (max - min) / (2 - max - min)
  }
  s = s
  return { hue: h, saturation: s * 100, lightness: l * 100 }
}

function updateCategoryColor() {
  const colorHex = document.getElementById("color-input").value
  const categoryIcon = document
    .getElementById("category")
    .getElementsByClassName("fill")[0]
  const colorHSL = hexToHSL(colorHex)
  categoryIcon.style.color = mutateColor(colorHSL, undefined, {
    role: "light",
  })
  spawnMutants(colorHSL)
}
