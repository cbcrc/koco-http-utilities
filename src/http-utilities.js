// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

class HttpUtilities {
  checkStatus(response) {
    if (response && response.status && response.status < 200 || response.status >= 300) {
      const error = new Error(response.statusText);
      return response.json()
        .then((jsonResponse) => {
          error.response = {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            type: response.type,
            body: jsonResponse
          };
          throw error;
        });
    }

    return response;
  }

  parseJSON(response) {
    if (response && response.status === 204) {
      return {};
    }

    return response.json();
  }
}

export default new HttpUtilities();
