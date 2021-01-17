import router from '@/router/index';

const BACKEND = process.env.VUE_APP_ENDPOINT;

const convertParamsToURLSearch = (queryParams: any) => {
  let urlSearchParams = queryParams;
  if (urlSearchParams !== '') {
    urlSearchParams = new URLSearchParams(queryParams).toString();
    urlSearchParams = `?${urlSearchParams}`;
  }

  return urlSearchParams;
};

const convertBodyToString = (body: string) => {
  let requestBody = body;
  if (requestBody !== null) {
    requestBody = JSON.stringify(requestBody);
  }

  return requestBody;
};

const refreshBearerToken = (response: Response) => {
  if (response.status === 401) {
    console.log('401');
    router.push('/login').catch(() => 0);
  } else {
    const newBearerToken = response.headers.get('authorization');

    if (newBearerToken !== null) {
      localStorage.setItem('bearerToken', newBearerToken);
    }
  }
};

export const $http = {
  GET: async (
    endpoint: string, queryParams: any = '',
    auth = true, json = true,
  ) => {
    const urlSearchParams = convertParamsToURLSearch(queryParams);

    const url = BACKEND + endpoint + urlSearchParams;
    const requestHeaders = new Headers();

    if (auth) {
      requestHeaders.append('Authorization', localStorage.getItem('bearerToken') || '');
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: requestHeaders,
    });

    if (auth) refreshBearerToken(response);

    if (json) return response.json();

    return response;
  },
  POST: async (
    endpoint: string, queryParams: any = '',
    body: any = null, auth = true, json = true,
  ) => {
    const urlSearchParams = convertParamsToURLSearch(queryParams);
    const requestBody = convertBodyToString(body);

    const url = BACKEND + endpoint + urlSearchParams;
    const requestHeaders = new Headers();

    if (auth) {
      requestHeaders.append('Authorization', localStorage.getItem('bearerToken') || '');
    }

    const response = await fetch(url, {
      method: 'POST',
      body: requestBody,
      headers: requestHeaders,
    });

    if (auth) refreshBearerToken(response);

    if (json) return response.json();

    return response;
  },
};
