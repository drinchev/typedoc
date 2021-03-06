import {Type} from './abstract';

/**
 * Represents an union type.
 *
 * ~~~
 * let value: string | string[];
 * ~~~
 */
export class UnionType extends Type {
    /**
     * The types this union consists of.
     */
    types: Type[];

    /**
     * Create a new TupleType instance.
     *
     * @param types  The types this union consists of.
     */
    constructor(types: Type[]) {
        super();
        this.types = types;
    }

    /**
     * Clone this type.
     *
     * @return A clone of this type.
     */
    clone(): Type {
        const clone = new UnionType(this.types);
        clone.isArray = this.isArray;
        return clone;
    }

    /**
     * Test whether this type equals the given type.
     *
     * @param type  The type that should be checked for equality.
     * @returns TRUE if the given type equals this type, FALSE otherwise.
     */
    equals(type: UnionType): boolean {
        if (!(type instanceof UnionType)) {
            return false;
        }
        if (type.isArray !== this.isArray) {
            return false;
        }
        return Type.isTypeListSimiliar(type.types, this.types);
    }

    /**
     * Return a raw object representation of this type.
     */
    toObject(): any {
        const result: any = super.toObject();
        result.type = 'union';

        if (this.types && this.types.length) {
            result.types = this.types.map((e) => e.toObject());
        }

        return result;
    }

    /**
     * Return a string representation of this type.
     */
    toString() {
        const names: string[] = [];
        this.types.forEach((element) => {
            names.push(element.toString());
        });

        return names.join(' | ');
    }
}
