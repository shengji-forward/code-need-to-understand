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
    type-coercion,
    strict-equality,
    template-literals
  }
}

Layer-2-collection: Organisation {
  2.1-Arrays (Ordered collections) {
    level-1-array-item {
      array-item-position: index,
      array-item-value: element | value,
      array-item: index + element | value,
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
    level-2-object-methods {

    }
    level-3-obejct-rule {
      object-this,
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

**Typescirpt Type System**

```
// type-definition-using-contracts(interface | type-aliases)
contract typeName<generic-param> {
  type + type-rules: type-types
}

// generic-function
function functionName<generic-type-param>(value: param-type): return-type {
  return value
}

```

```
Layer-0-type: Type {
  level-1-type-types {
    number,
    string,
    boolean,
    any (avoid!),
    unknown,
    null,
    void
  },
  level-2-composite-types {
    strings-array-type: string[],
    numbers-array-type: array<number>
  },
  level-3-advanced-types {
    union: | ,
    intersection: & ,
    tupe: [number, number] ,
    mapped-type,
    conditional-type,
    template-literal-type,
    utility-types {
      Partial<>,
      Required<>,
      Pick<>,
      Omit<>
    }
  },
  level-4-type-rules {
    properties-optional-suffix: ?,
    readonly-prefix: readonly,
  },
  level-5-type-concept {
    type-guards,
    type-narrows,
    discriminated-unions,
    type-assertion
  }
}

Layer-1-contracts {
  level-1-interface {
    interface-definition,
    extending-interface
  },
  level-2-type-aliases {
    union,
    tuple,
    literal
  }
}

Layer-3-meta-type {
  level-1-generic {
    generic-functions {
      generic-parameter: functionName<T>,
      parameter-type: (arg: T),
      return-type: (): T,
    },
    generic-arrays,
    generic-constraint,
    multiple-type-parameters: <K, V>,
    generic-classes,
    generic-interfaces,
    utility-types-with-generics,
    generic-with-default-type,

  }

}

```
