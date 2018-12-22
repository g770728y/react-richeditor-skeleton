// pluck([{a:1, b:2}, {a:2, b:3}, 'a']) = [1,2]
export function pluck<T, U extends keyof T>(objects: T[], key: U): T[U][] {
  return objects.reduce((arr, obj) => {
    return obj[key] ? [...arr, obj[key]] : arr;
  }, []);
}
