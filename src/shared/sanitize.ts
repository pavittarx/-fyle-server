function sanitize(str: string) {
  if (!str || !str.length) return;

  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  const reg = /[&<>"'/]/gi;

  return str.replace(reg, (match: any) => map[match]);
}

export default sanitize;
