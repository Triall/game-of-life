import { styled } from 'styled-components';
import { useCallback, useEffect } from 'react';
import { willBeAlive } from './utils';
import { Map } from './types';

const Col = styled.div`
  display: flex;
`;

const Cell = styled.div<{ alive?: boolean }>`
  background: ${(props) => (props.alive ? '#f6a' : '#ccc')};
  height: 25px;
  width: 25px;
  border: 1px solid blue;
  margin: 1px;
  transition: background 0.05s ease-in;
`;

interface BoardProps {
  editable?: boolean;
  map: Map;
  updateMap: (newMap: Map) => void;
}

const Board = ({ editable, map, updateMap }: BoardProps) => {
  const nextGeneration = useCallback(() => {
    const newMap = map.map((mapRow, row) =>
      mapRow.map((_, col) => willBeAlive(map, row, col))
    );
    updateMap(newMap);
  }, [map, updateMap]);

  const toggleCell = useCallback(
    (row: number, col: number) => {
      const newMap = structuredClone(map);
      newMap[row][col] = !map[row][col];
      updateMap(newMap);
    },
    [map, updateMap]
  );

  useEffect(() => {
    const interval =
      !editable &&
      setInterval(() => {
        nextGeneration();
      }, 50);

    return () => {
      interval && clearInterval(interval);
    };
  }, [editable, nextGeneration]);

  return (
    <div>
      <div>
        {map.map((mapRow, row) => (
          <Col key={row}>
            {mapRow.map((aliveCell, col) => (
              <Cell
                title={`${col}-${row}`}
                key={`${row}-${col}`}
                onClick={() => editable && toggleCell(row, col)}
                alive={aliveCell}
              />
            ))}
          </Col>
        ))}
      </div>
    </div>
  );
};

export default Board;
