export function formatEnum(en: object): Record<string, string>[] {
  const enum_keys = Object.keys(en);
  const enum_values = Object.values(en);
  const formatted_enum_values = enum_values.map((value: string) => {
    return value.split('_').join(' ');
  });
  const labels = [];
  for (let i = 0; i < formatted_enum_values.length; i += 1) {
    labels.push({
      label: formatted_enum_values[i],
      value: enum_keys[i],
    });
  }

  return labels;
}

export function removeEmptyStringFields(obj: any) {
  const ret: {[k: string]: any} = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== '') {
      ret[key] = value;
    }
  }

  return ret;
}
