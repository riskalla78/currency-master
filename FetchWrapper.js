<<<<<<< HEAD
export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint, body) {
    return this.#send("put", endpoint, body);
  }

  post(endpoint, body) {
    return this.#send("post", endpoint, body);
  }

  delete(endpoint, body) {
    return this.#send("delete", endpoint, body);
  }

  #send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
=======
export default class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint, body) {
    return this.#send("put", endpoint, body);
  }

  post(endpoint, body) {
    return this.#send("post", endpoint, body);
  }

  delete(endpoint, body) {
    return this.#send("delete", endpoint, body);
  }

  #send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
>>>>>>> 7814d0eb5a4ec241b17d574d5178c413d1e93077
