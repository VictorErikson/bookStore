const fetchData = async <T,>(url: string): Promise<T> => {
  try {
    const response: Response = await fetch(url);
    console.log("response in fetchData:", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return Promise.reject(error);
  }
};

export default fetchData;
