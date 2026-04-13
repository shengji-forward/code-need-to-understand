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
