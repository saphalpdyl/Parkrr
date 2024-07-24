export const convertToRadians = (degrees: number) => degrees * Math.PI / 180;

export const convertUsernameToShortDisplay = (name: string) => {
  const split = name.split(' ');
  if ( split.length > 1 )
    return split.map( v => v.toUpperCase()).join('');

  return split[0].slice(0,2).toUpperCase();
}