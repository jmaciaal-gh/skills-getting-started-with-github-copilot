document.addEventListener("DOMContentLoaded", () => {
  const calculatorForm = document.getElementById("calculator-form");
  const leftNumberInput = document.getElementById("left-number");
  const rightNumberInput = document.getElementById("right-number");
  const operationSelect = document.getElementById("operation");
  const resultDiv = document.getElementById("result");
  const messageDiv = document.getElementById("message");

  async function calculate(left, right, operation) {
    try {
      const response = await fetch("/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          left,
          right,
          operation,
        }),
      });

      const result = await response.json();
      return { ok: response.ok, data: result };
    } catch (error) {
      console.error("Error calculating:", error);
      return { ok: false, data: { detail: "No se pudo calcular. Inténtalo de nuevo." } };
    }
  }

  calculatorForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const left = Number.parseFloat(leftNumberInput.value);
    const right = Number.parseFloat(rightNumberInput.value);
    const operation = operationSelect.value;

    if (Number.isNaN(left) || Number.isNaN(right)) {
      messageDiv.textContent = "Introduce números válidos.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      resultDiv.classList.add("hidden");
      return;
    }

    const calculation = await calculate(left, right, operation);

    if (calculation.ok) {
      resultDiv.textContent = `Resultado: ${calculation.data.result}`;
      resultDiv.className = "result success";
      resultDiv.classList.remove("hidden");
      messageDiv.classList.add("hidden");
      return;
    }

    messageDiv.textContent = calculation.data.detail || "Ocurrió un error.";
    messageDiv.className = "error";
    messageDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
  });
});
