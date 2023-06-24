import { getAuthKey } from "@/utils/auth-key";


const acceptJsonHeaders = {
  Accept: "application/json"
};

const contentTypeJsonHeaders = {
  "Content-Type": "application/json"
};

const authorizationHeaders = (authKey: string) => ({
  "Authorization": `Bearer ${authKey}` 
});

export const sessionHeaders = () => {
  const authKey = getAuthKey();
  if (authKey) {
    return authorizationHeaders(authKey);
  } else {
    return {};
  }
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const error = {
      ...errorData,
      status: response.status
    };
    throw error;
  }
  return response;
};

const requestWithBody = async (method: string, url: string, data: any, needAuth: boolean) => {
  const headers = {
    ...acceptJsonHeaders,
    ...(method === "upload" ? {} : contentTypeJsonHeaders),
    ...(needAuth ? sessionHeaders() : {})
  };

  const body = JSON.stringify(data);
  const fetchOptions = {
    method: method === "upload" ? "POST" : method,
    headers,
    body
  };

  const response = await fetch(url, fetchOptions);

  return handleResponse(response);
};

const get = async (url: string, needAuth = true) => {
  const headers = {
    ...acceptJsonHeaders,
    ...(needAuth ? sessionHeaders() : {})
  };
  const fetchOptions = {
    method: "GET",
    headers
  };

  const response = await fetch(url, fetchOptions);
  return handleResponse(response);
};

const post = (url: string, data?: any, needAuth = true, isUpload = false) => requestWithBody(isUpload ? "upload" : "POST", url, data, needAuth);
const put = (url: string, data?: any, needAuth = true) => requestWithBody("PUT", url, data, needAuth);
const patch = (url: string, data: string, needAuth = true) => requestWithBody("PATCH", url, data, needAuth);

const destroy = (url: string) => {
  const headers = {
    ...acceptJsonHeaders,
    ...sessionHeaders()
  };
  const fetchOptions = {
    method: "DELETE",
    headers
  };

  return fetch(url, fetchOptions);
};

const upload = async (url: string, data: any) => {
  const headers = {
    ...acceptJsonHeaders,
    ...sessionHeaders()
  };

  const fetchOptions = {
    method: "POST",
    headers,
    body: data
  };

  const response = await fetch(url, fetchOptions);

  return handleResponse(response);
};

export { get, post, put, patch, destroy, upload };
