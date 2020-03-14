export function CollectionName(name: string): Function {
    return (constructor: Function): void => {
        constructor.prototype.__collectionName = name;
    };
}
