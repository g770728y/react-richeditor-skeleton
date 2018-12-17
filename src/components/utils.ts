export function pick<T, U extends keyof T>(objects: T[], key: U): Partial<T>[] {
  let result: Partial<T>[] = [];

  objects.forEach((entity: T) => {
    const newEntity: Partial<T> = {};
    const v = entity[key];
    v !== undefined && (newEntity[key] = v);
    result.push(newEntity);
  });

  return result;
}
