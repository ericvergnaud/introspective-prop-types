import IntrospectivePropTypesExtra from '../src/introspective-prop-types-extra'

function check(
  type: string,
  arg?: string | string[] | (() => void) | (() => void)[],
): void {
  if (!arg) {
    const propType = IntrospectivePropTypesExtra[type]
    it('exposes its type', () => {
      expect(propType.type).toBe(type)
    })
    it('has no arg', () => {
      expect(propType.arg).toBe(undefined)
    })
    it('exposes that it is not required', () => {
      expect(propType.required).toBe(false)
    })
    describe('.isRequired', () => {
      const requiredPropType = propType.isRequired
      it('exposes its type', () => {
        expect(requiredPropType.type).toBe(type)
      })
      it('has no arg', () => {
        expect(requiredPropType.arg).toBe(undefined)
      })
      it('exposes that it is required', () => {
        expect(requiredPropType.required).toBe(true)
      })
    })
  } else {
    const propType = IntrospectivePropTypesExtra[type](arg)
    it('exposes its type', () => {
      expect(propType.type).toBe(type)
    })
    it('exposes its arg', () => {
      expect(propType.arg).toBe(arg)
    })
    it('exposes that it is not required', () => {
      expect(propType.required).toBe(false)
    })
    describe('.isRequired', () => {
      const requiredPropType = propType.isRequired
      it('exposes its type', () => {
        expect(requiredPropType.type).toBe(type)
      })
      it('exposes its arg', () => {
        expect(requiredPropType.arg).toBe(arg)
      })
      it('exposes that it is required', () => {
        expect(requiredPropType.required).toBe(true)
      })
    })
  }
}

describe('elementType', () => check('elementType'))
describe('componentOrElement', () => check('componentOrElement'))
describe('all', () => check('all', [function fn1() {}, function fn2() {}]))

describe('deprecated', () => check('deprecated', function fn() {}))

describe('isRequiredForA11y', () =>
  check('isRequiredForA11y', [function fn() {}]))
