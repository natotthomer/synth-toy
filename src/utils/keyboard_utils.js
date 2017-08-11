export const MAPPED_KEYS = [
  'a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l'
]

export const noteFrequency = (octave = 4) => {
  const f = 440
  const a = Math.pow(2, 1/12)
  const n = octave * 12
  return f * Math.pow(a, n)
}

export const frequencyFromNoteNumber = note => {
  return 440 * Math.pow(2, (note - 69) / 12);
}
