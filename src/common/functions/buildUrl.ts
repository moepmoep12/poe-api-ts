import { URL } from "url";

interface Parameters {
  [key: string]: string;
}

export function buildURL<T>(
  url: string,
  optionalParameters?: T,
  defaults?: T,
  additionalParameters?: Parameters,
  languagePrefix?: string
): URL {
  const urlObj: URL = new URL(url);

  if (languagePrefix) {
    urlObj.host = `${languagePrefix}.${urlObj.host}`;
  }

  if (optionalParameters && defaults) {
    for (const key in defaults) {
      /* istanbul ignore if */
      if (optionalParameters[key] == null) {
        optionalParameters[key] = defaults[key];
      }
    }
  }

  if (optionalParameters == null && defaults) {
    optionalParameters = defaults;
  }

  if (optionalParameters != null) {
    for (const [key, value] of Object.entries(optionalParameters)) {
      /* istanbul ignore if */
      if (value != null) {
        urlObj.searchParams.append(key, value as string);
      }
    }
  }

  if (additionalParameters) {
    for (const key in additionalParameters) {
      urlObj.searchParams.append(key, additionalParameters[key]);
    }
  }

  return urlObj;
}
