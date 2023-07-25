import React, { useState } from "react";

interface Step {
  state: [number, number];
  action: string;
}

function WaterJug(): JSX.Element {
  const [jug1, setJug1] = useState<number>(0);
  const [jug2, setJug2] = useState<number>(0);
  const [objetivo, setObjetivo] = useState<number>(0);
  const [pasos, setPasos] = useState<Step[]>([]);
  const [mensajeRutaOptima, setMensajeRutaOptima] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (jug1 <= 0 || jug2 <= 0 || objetivo <= 0) {
      alert("Ingrese valores válidos para las capacidades y el objetivo.");
      return;
    }
    if (objetivo > Math.max(jug1, jug2)) {
      alert("El objetivo no puede ser mayor que la capacidad de los baldes.");
      return;
    }
    try {
      const [steps1, steps2, ruta1MasCorta] = calculateSteps(
        jug1,
        jug2,
        objetivo
      );
      setPasos(ruta1MasCorta ? steps1 : steps2);

      const mensajeRutaOptima = ruta1MasCorta
        ? "La ruta 1 es la óptima"
        : "La ruta 2 es la óptima";
      setMensajeRutaOptima(mensajeRutaOptima);
    } catch (error) {
      const errorMessage = (error as Error).message;
      alert(errorMessage);
    }
  };

  const calculateSteps = (
    jug1: number,
    jug2: number,
    objetivo: number
  ): [Step[], Step[], boolean] => {
    let x = 0;
    let y = 0;
    let steps1: Step[] = [];
    let steps2: Step[] = [];
    let count = 0;

    // Ruta 1
    while (x !== objetivo && y !== objetivo && count < 1000) {
      steps1.push({ state: [x, y], action: "Llenar A" });
      x = jug1;
      steps1[steps1.length - 1].state = [x, y];

      steps1.push({ state: [x, y], action: "Pasar A a B" });
      const diff = jug2 - y;
      const transfer = Math.min(x, diff);
      x -= transfer;
      y += transfer;
      steps1[steps1.length - 1].state = [x, y];

      if (x === objetivo || y === objetivo) {
        break;
      }

      steps1.push({ state: [x, y], action: "Vaciar B" });
      y = 0;
      steps1[steps1.length - 1].state = [x, y];

      if (x === objetivo || y === objetivo) {
        break;
      }

      steps1.push({ state: [x, y], action: "Pasar A a B" });
      const diff2 = jug2 - y;
      const transfer2 = Math.min(x, diff2);
      x -= transfer2;
      y += transfer2;
      steps1[steps1.length - 1].state = [x, y];

      count++;
    }

    if (count >= 1000) {
      throw new Error("No se puede alcanzar el objetivo por la ruta 1");
    }

    // Ruta 2
    x = 0;
    y = 0;
    count = 0;
    while (x !== objetivo && y !== objetivo && count < 1000) {
      steps2.push({ state: [x, y], action: "Llenar B" });
      y = jug2;
      steps2[steps2.length - 1].state = [x, y];

      steps2.push({ state: [x, y], action: "Pasar B a A" });
      const diff3 = jug1 - x;
      const transfer3 = Math.min(y, diff3);
      y -= transfer3;
      x += transfer3;
      steps2[steps2.length - 1].state = [x, y];

      if (x === objetivo || y === objetivo) {
        break;
      }

      steps2.push({ state: [x, y], action: "Vaciar A" });
      x = 0;
      steps2[steps2.length - 1].state = [x, y];

      if (x === objetivo || y === objetivo) {
        break;
      }

      steps2.push({ state: [x, y], action: "Pasar B a A" });
      const diff4 = jug1 - x;
      const transfer4 = Math.min(y, diff4);
      y -= transfer4;
      x += transfer4;
      steps2[steps2.length - 1].state = [x, y];

      count++;
    }

    if (count >= 1000) {
      throw new Error("No se puede alcanzar el objetivo por la ruta 2");
    }

    // Compara las rutas y devuelve la más corta
    const ruta1Length = steps1.length;
    const ruta2Length = steps2.length;
    const ruta1MasCorta = ruta1Length <= ruta2Length;
    const mensajeRutaOptima =
      pasos.length > 0
        ? ruta1MasCorta
          ? "La ruta 1 es la óptima"
          : "La ruta 2 es la óptima"
        : "";

    return [steps1, steps2, ruta1MasCorta];
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jug1">Capacidad del balde A:</label>
          <input
            type="number"
            id="jug1"
            name="jug1"
            value={jug1}
            onChange={(event) => setJug1(+event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="jug2">Capacidad del balde B:</label>
          <input
            type="number"
            id="jug2"
            name="jug2"
            value={jug2}
            onChange={(event) => setJug2(+event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="objetivo">Objetivo:</label>
          <input
            type="number"
            id="objetivo"
            name="objetivo"
            value={objetivo}
            onChange={(event) => setObjetivo(+event.target.value)}
          />
        </div>
        <button type="submit">Calcular pasos</button>
      </form>
      <div>
        {mensajeRutaOptima && <p>{mensajeRutaOptima}</p>}
        {pasos.length > 0 && (
          <>
            <h2>Pasos:</h2>
            <ul>
              {pasos.map((step, index) => (
                <li key={index}>
                  {step.action}, estado: [{step.state[0]}, {step.state[1]}]
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default WaterJug;
