export default function isEmptyStr(str?: string | null) {
  return !str || str.length === 0;
}
