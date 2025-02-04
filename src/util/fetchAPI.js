export const fetchAPI = async (url, method = "GET", body = null) => {
  try {
    const init = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body && method !== "GET") {
      init.body = JSON.stringify(body);
    }
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(
        `Error when using ${method} call for url - ${url}. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(
      `Error when using ${method} call for url - ${url}. Error: `,
      error
    );
  }
};
