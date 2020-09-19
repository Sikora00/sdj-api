export class ArrayUtil {
  static arrayToMap<T extends { id: string }>(array: T[]): { [id: string]: T } {
    return array.reduce(
      (previousValue: { [id: string]: T }, currentValue: T) => {
        return {
          ...previousValue,
          [currentValue.id]: currentValue,
        };
      },
      {}
    );
  }
}
