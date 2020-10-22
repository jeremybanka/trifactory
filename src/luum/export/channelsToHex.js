export default channels =>
  `#${Object.values(channels).map(channel => {
    let channelHex = channel.toString(16)
    if(channelHex.length === 1) channelHex = 0 + channelHex
    return channelHex
  }).join('')}`
