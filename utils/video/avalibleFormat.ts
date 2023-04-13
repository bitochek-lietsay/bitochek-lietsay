const checkSupportedVideoCodec = () => {
  if (import.meta.env.SSR) {
    return undefined
  }

  const testVideoEl = document.createElement('video')

  const codecs = [
    {
      name: 'vp9',
      type: 'video/webm; codecs="vp9, vorbis"',
      extension: 'webm',
    },
    {
      name: 'vp8',
      type: 'video/webm; codecs="vp8, vorbis"',
      extension: 'webm',
    },
    {
      name: 'h264',
      type: 'video/mp4; codecs="avc1.42E01E"',
      extension: 'mp4',
    },
  ]

  const availableCodec = codecs.find((codec) => testVideoEl.canPlayType(codec.type) !== '')

  return availableCodec
}

export const codec = checkSupportedVideoCodec()
