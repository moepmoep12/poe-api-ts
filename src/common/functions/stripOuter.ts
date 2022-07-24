export function stripOuter(data: string): string {
  let obj: unknown = JSON.parse(data);
  if (obj && typeof obj == "object") {
    const key = <keyof typeof obj>Object.keys(obj)[0];
    obj = obj[key];
    return JSON.stringify(obj);
  }
  return data;
}
