console.log("Hello world! :)");

var number = 12;

console.log(number);

console.log(typeof number);

number = "Gabriel";

console.log(number);

console.log(typeof number);

// Arrays (coleções de valores)
var frutas = ['Maçã', 'Banana'];

console.log(typeof frutas);

// verifica se é array

if (Array.isArray(frutas)) {
    console.log('é array');
}
else if (typeof frutas == "number") {
    console.log('esse é seu número da sorte?');
}
else {
    console.log('não é array, mas sim ' + typeof frutas);
}

// informa o tamanho do array
console.log('qtd de frutas: ' + frutas.length);

// adiciona itens no final do array
frutas.push('Mamão');

console.log(frutas);
console.log('qtd de frutas: ' + frutas.length);

frutas.pop();
console.log(frutas);
console.log('qtd de frutas: ' + frutas.length);

frutas.push('Mamão', 'Uva', 'Melancia');

// for é constituído de 3 partes:
// 1. inicialização de variáveis úteis (exemplo: variável para acessar index do array)
// 2. condição de permanência ou repetição do laço
// 3. incremento/decremento
for (let i=0; i<frutas.length; i++) {
    console.log('Fruta ' + (i+1) + ': ' + frutas[i]);
}

var n = 7;
while (n > -21) {
    console.log('Valor de n: ' + n);
    // n--;
    // n = n - 2;
    n -= 2;
}

var repete = false;
do {
    console.log('O do while percorre pelo menos uma vez!');
}
while (repete);

for (let fruta of frutas) {
    console.log(fruta);
}

for (let [index, fruta] of frutas.entries()) {
    console.log(`Fruta ${index}: ${fruta}`);
}

frutas.forEach((fruta, index) => {
    console.log(`F(${index}): ${fruta}`);
});

console.log('length' in frutas);
console.log('push' in frutas);
console.log('eita' in frutas);