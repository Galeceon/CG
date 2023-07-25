import React, { useState } from 'react';

interface Step {
  state: [number, number];
  action: string;
}

function WaterJug(): JSX.Element {
  const [jug1, setJug1] = useState<number>(0);
  const [jug2, setJug2] = useState<number>(0);
  const [objetivo, setObjetivo] = useState<number>(0);
  const [pasos, setPasos] = useState<Step[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setPasos(waterJug(jug1, jug2, objetivo));
  };

  const waterJug = (jug1: number, jug2: number, objetivo: number): Step[] => {
    let visited = new Set<string>();
    let queue = [];
    let steps: Step[] = [];

    queue.push([0, 0]); // Inicializar los baldes vacíos
    steps.push({ state: [0, 0], action: "Inicio" });

    while (queue.length > 0) {
      let [x, y] = queue.shift() as number[];

      if (x === objetivo || y === objetivo) {
        steps.push({ state: [x, y], action: "Objetivo alcanzado" });
        return steps;
      }

      let state = `${x},${y}`;
      if (visited.has(state)) {
        continue;
      }

      visited.add(state);

      // Llenar el primer balde
      queue.push([jug1, y]);
      steps.push({ state: [jug1, y], action: "Llenar primer balde" });

      // Llenar el segundo balde
      queue.push([x, jug2]);
      steps.push({ state: [x, jug2], action: "Llenar segundo balde" });

      // Vaciar el primer balde
      queue.push([0, y]);
      steps.push({ state: [0, y], action: "Vaciar primer balde" });

      // Vaciar el segundo balde
      queue.push([x, 0]);
      steps.push({ state: [x, 0], action: "Vaciar segundo balde" });

      // Trasvasar del primer al segundo balde
      let transfer = Math.min(x, jug2 - y);
      queue.push([x - transfer, y + transfer]);
      steps.push({ state: [x - transfer, y + transfer], action: "Trasvasar de primer a segundo balde" });

      // Trasvasar del segundo al primer balde
      transfer = Math.min(jug1 - x, y);
      queue.push([x + transfer, y - transfer]);
      steps.push({ state: [x + transfer, y - transfer], action: "Trasvasar de segundo a primer balde" });
    }

    steps.push({ state: [jug1, jug2], action: `No se puede alcanzar el objetivo ${objetivo}` });
    return steps;
  };

  return (
    <div>
      <h1>Problema de los baldes de agua</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Capacidad del primer balde:
          <input type="number" value={jug1} onChange={(event) => setJug1(Number(event.target.value))} />
        </label>
        <label>
          Capacidad del segundo balde:
          <input type="number" value={jug2} onChange={(event) => setJug2(Number(event.target.value))} />
        </label>
        <label>
          Objetivo deseado:
          <input type="number" value={objetivo} onChange={(event) => setObjetivo(Number(event.target.value))} />
        </label>
        <button type="submit">Calcular</button>
      </form>
      {pasos.length > 0 && (
        <div>
          <h2>Pasos necesarios para alcanzar el objetivo:</h2>
          <table>
            <thead>
              <tr>
                <th>Paso</th>
                <th>Acción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pasos.map((step, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{step.action}</td>
                  <td>{`[${step.state.join(", ")}]`}</td>
                </tr>
              ))}
            </tbody>
          </table>   </div>
      )}
    </div>
  );
}

export default WaterJug;