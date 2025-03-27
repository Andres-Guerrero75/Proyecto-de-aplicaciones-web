document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('codeInput');
    const runButton = document.getElementById('runButton');
    const consoleOutput = document.getElementById('consoleOutput');
    let variables = {}; // Almacena las variables definidas
  
    runButton.addEventListener('click', () => {
      consoleOutput.innerHTML = ''; // Limpiar consola
      const lines = codeInput.value.split('\n'); // Dividir el texto en líneas
  
      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return; // Ignorar líneas vacías
  
        try {
          // Procesar comandos
          if (trimmedLine.startsWith('imprimir')) {
            const value = trimmedLine.replace('imprimir', '').trim();
            let output = value.replace(/['"]/g, ''); // Quitar comillas
            if (variables[output]) output = variables[output]; // Si es una variable, usar su valor
            printToConsole(output);
          } 
          else if (trimmedLine.startsWith('variable')) {
            const [_, name, equals, value] = trimmedLine.split(' ');
            if (equals !== '=' || !name || !value) throw new Error('Error de sintaxis en declaración de variable');
            variables[name] = isNaN(value) ? value.replace(/['"]/g, '') : parseFloat(value);
            printToConsole(`${name} = ${variables[name]}`);
          } 
          else if (trimmedLine.startsWith('sumar')) {
            const expression = trimmedLine.replace('sumar', '').trim();
            const [val1, operator, val2] = expression.split(' ');
            if (operator !== '+') throw new Error('Solo se soporta suma con "+"');
            const num1 = variables[val1] || parseFloat(val1);
            const num2 = variables[val2] || parseFloat(val2);
            if (isNaN(num1) || isNaN(num2)) throw new Error('Valores inválidos para sumar');
            const result = num1 + num2;
            printToConsole(`Resultado: ${result}`);
          } 
          else {
            throw new Error(`Comando desconocido: ${trimmedLine}`);
          }
        } catch (error) {
          printToConsole(`Error en línea ${index + 1}: ${error.message}`, true);
        }
      });
    });
  
    function printToConsole(message, isError = false) {
      const p = document.createElement('p');
      p.textContent = message;
      p.className = isError ? 'text-red-500' : 'text-white';
      consoleOutput.appendChild(p);
      consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll
    }
  });