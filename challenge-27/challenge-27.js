/*
Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
métodos semelhantes aos que existem no array, mas que sirvam para os
elementos do DOM selecionados.
Crie os seguintes métodos:
- forEach, map, filter, reduce, reduceRight, every e some.

Crie também métodos que verificam o tipo do objeto passado por parâmetro.
Esses métodos não precisam depender de criar um novo elmento do DOM, podem
ser métodos estáticos.

Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
no objeto, como nos exemplos abaixo:
DOM.isArray([1, 2, 3]); // true
DOM.isFunction(function() {}); // true
DOM.isNumber('numero'); // false

Crie os seguintes métodos para verificação de tipo:
- isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
O método isNull deve retornar `true` se o valor for null ou undefined.
*/

class DOM {
  constructor(node) {
    this.element = [...document.querySelectorAll(node)];
  }

  static isArray(value) {
    return this.isTypeOf(value, "Array");
  }

  static isObject(value) {
    return this.isTypeOf(value, "Object");
  }

  static isFunction(value) {
    return this.isTypeOf(value, "Function");
  }

  static isNumber(value) {
    return this.isTypeOf(value, "Number");
  }

  static isString(value) {
    return this.isTypeOf(value, "String");
  }

  static isBoolean(value) {
    return this.isTypeOf(value, "Boolean");
  }

  static isNull(value) {
    return this.isTypeOf(value, "Null") || this.isTypeOf(value, "Undefined");
  }

  static isTypeOf(value, matchType) {
    const valueToString = Object.prototype.toString.call(value);

    const matchValue = valueToString.match(/\[\w+\s(\w+)\]/);

    if (matchValue && matchValue[1]) {
      return matchType === matchValue[1];
    }

    return false;
  }

  on(eventName, callback) {
    this.element.forEach(element => {
      element.addEventListener(eventName, callback);
    });
  }

  off(eventName, callback) {
    this.element.forEach(element => {
      element.removeEventListener(eventName, callback);
    });
  }

  get() {
    return this.element;
  }

  forEach(forEachFunction) {
    return this.element.forEach(forEachFunction);
  }

  map(mapFunction) {
    return this.element.map(mapFunction);
  }

  filter(mapFunction) {
    return this.element.filter(mapFunction);
  }

  reduce(reduceFunction, startValue) {
    return this.element.reduce(reduceFunction, startValue);
  }

  reduceRight(reduceFunction, startValue) {
    return this.element.reduceRight(reduceFunction, startValue);
  }

  every(everyFunction) {
    return this.element.reduceRight(everyFunction);
  }

  some(someFunction) {
    return this.element.some(someFunction);
  }
}
