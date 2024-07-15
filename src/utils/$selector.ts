export default function $(selector: string, context = document) {
  const elements = context.querySelector(selector);
  if (elements !== null) {
    return elements;
  }
  return null;
}
