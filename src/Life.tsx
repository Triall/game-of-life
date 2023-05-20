import { useState, useCallback } from 'react';
import Board from './Board';
import { makeMatrix } from './utils';

interface LifeProps {
  rows: number;
  cols: number;
}

const Life = ({ rows, cols }: LifeProps) => {
  const [warmup, setWarmup] = useState(true);
  const [map, setMap] = useState(makeMatrix(rows, cols));

  const randomize = useCallback(() => {
    const newMap = map.map((mapRow) =>
      mapRow.map(() => Math.floor(Math.random() * 100) % 5 === 0)
    );
    setMap(newMap);
  }, [map]);

  return (
    <div>
      <Board editable={warmup} map={map} updateMap={setMap} />

      <button onClick={() => setWarmup(!warmup)}>
        {warmup ? 'start' : 'stop'}
      </button>

      <button onClick={randomize}>randomize</button>
    </div>
  );
};

export default Life;
