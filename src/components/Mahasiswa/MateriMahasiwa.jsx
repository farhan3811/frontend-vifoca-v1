import React, { useState } from 'react';

const Calculator = () => {
  let [result, setResult] = useState("");

  const handleClick = (e) => {
    if (result.length >= 16) {
      setResult("!Terlalu Banyak Input");
      return;
    }
    if (result.charAt(0) === '0') {
      result = result.slice(1);
    }
    setResult(result.concat(e.target.name));
  }

  const clear = () => {
    setResult("");
  }

  const backSpace = () => {
    setResult(result.slice(0, -1));
  }

  const calculate = () => {
    try {
      let calcResult = eval(result).toString();
      if (calcResult.includes('.')) {
        calcResult = +calcResult;
        calcResult = calcResult.toFixed(4).toString();
      }
      setResult(calcResult);
    } catch (err) {
      setResult("Error");
    }
  }

  return (
    <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <h3 className="text-2xl font-bold text-chocolate border-b-2 border-gray-200 py-2 text-center">
        Kalkulator
      </h3>
      <input
        type="text"
        value={result}
        readOnly
        className="w-full text-right py-4 px-2 border-b-2 border-gray-200 text-3xl font-semibold"
      />
      <div className="grid grid-cols-4 gap-2 p-4">
        <button
          onClick={clear}
          className="col-span-2 bg-red-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          Hapus
        </button>
        <button
          onClick={backSpace}
          className="bg-gray-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          C
        </button>
        <button
          name="/"
          onClick={handleClick}
          className="bg-orange-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          /
        </button>
        <button
          name="7"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          7
        </button>
        <button
          name="8"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          8
        </button>
        <button
          name="9"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          9
        </button>
        <button
          name="*"
          onClick={handleClick}
          className="bg-orange-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          *
        </button>
        <button
          name="4"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          4
        </button>
        <button
          name="5"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          5
        </button>
        <button
          name="6"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          6
        </button>
        <button
          name="-"
          onClick={handleClick}
          className="bg-orange-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          -
        </button>
        <button
          name="1"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          1
        </button>
        <button
          name="2"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          2
        </button>
        <button
          name="3"
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          3
        </button>
        <button
          name="+"
          onClick={handleClick}
          className="bg-orange-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          +
        </button>
        <button
          name="0"
          onClick={handleClick}
          className="col-span-2 bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          0
        </button>
        <button
          name="."
          onClick={handleClick}
          className="bg-gray-200 text-gray-800 py-4 rounded-lg text-xl font-semibold"
        >
          .
        </button>
        <button
          onClick={calculate}
          className="col-span-4 bg-green-500 text-white py-4 rounded-lg text-xl font-semibold"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
