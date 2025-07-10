let flowers: { x: number; y: number }[] = [];

export function setFlowerCenters(list: { x: number; y: number }[]) {
  flowers = list;
}

export function getFlowerCenters() {
  return flowers;
}
