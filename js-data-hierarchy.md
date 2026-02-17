**Layers-hierarchy**

```
Layer-0-foundation: Primitive value (Raw materials, LEGO pieces) {
  level-1-value-type {
    number,
    string,
    boolean,
    null,
    undefined,
    symbol,
    bigint
  }
}

Layer-1-naming: Variables (Labeled storage) {
  level-1-variable-type {
    const,
    let,
  }
  level-2-variable-rule {
    type coercion,
    strict equality,
    template literals
  }
}

Layer-2-collection: Organisation {
  2.1-Arrays (Ordered collections) {
    level-1-array-item {
      array-item-position: index,
      array-item-value: element,
      array-element-access: arr[index]
    },
    level-2-array-methods {
       array-method-mutable {
        array.push,
        array.unshift,
        array.pop,
        array.shift
       }
      array-method-iteration {
        array.map,
        array.filter,
        array.find,
        array.some,
        array.every,
        array.reduce
      }
    }
  }
  2.2-Objects (Key-value pairs) {
    level-1-object-property {
      object-property-name: key,
      object-property-value: value,
      object-property: key + value,
      object-property-access: obj["name"] | obj.name
    }
    level-2-object-methods-and-this {

    }
  }
  2.3-Organisation-methods {
    destructuring {
      destructuring-array,
      destructuring-object
    }
    spread-operator {
      spread-array-create,
      spread-array-combine,
      spread-object-create,
      spread-object-override
    }
    immutability {

    }
  }
}

Layer-3-behavior: Functions (Reusable instructions) {
  level-1-function-type {
    function-declaration,
    function-expression,
    function-arrow,
    function-arrow-implicit
  }
  level-2-function-parameters {
    function-multi-parameters,
    function-defult-parameters,
    function-rest-parameters,
    function-callback-function
  }
  level-3-function-return {
    function-closure,
    function-factories,
    function-recursive-function
  }
}

```

**Control-flow**

```
Flow-1-condition {
  condition-if/elses,
  condition-ternary-operator,
  condition-switch-statements
}

Flow-2-loop {
  loop-traditional-for-loop,
  loop-for-of-array-loop,
  loop-for-in-object-loop,
  loop-while-loop,
  loop-break-continue
}

Flow-3-pattern {
  pattern-early-return,
  pattern-loop-control
}



```
