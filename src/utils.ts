import { Map } from './types';

export function makeMatrix(rows: number, cols: number): Map {
  return new Array(rows).fill(undefined).map(() => {
    return new Array(cols).fill(undefined);
  });
}

export function getCellSiblingsCount(
  map: Map,
  row: number,
  col: number
): number {
  const positions = [-1, 0, 1];
  let result = 0;

  for (const positionX of positions) {
    for (const positionY of positions) {
      const isCurrentPosition = positionX === 0 && positionY === 0;
      if (
        !isCurrentPosition &&
        !!map[row + positionY] &&
        !!map[row + positionY][col + positionX]
      )
        result += 1;
    }
  }

  return result;
}

export function willBeAlive(map: Map, row: number, col: number): boolean {
  const siblingsCount = getCellSiblingsCount(map, row, col);
  const isExist = map[row][col];
  const willBeDead = isExist && (siblingsCount < 2 || siblingsCount > 3);
  const continueLife = isExist && [2, 3].includes(siblingsCount);
  const becomeAlive = !isExist && siblingsCount === 3;

  return !willBeDead && (continueLife || becomeAlive);
}
