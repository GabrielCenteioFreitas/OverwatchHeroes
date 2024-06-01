export function getInitialLetters(name: string) {
  const nameParts = name.split(' ')

  if (nameParts.length > 1) {
    return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase()
  }

  return (nameParts[0].substring(0, 2)).toUpperCase()
}