export const formatDate = (date, config) => {
  try {
    const defaultOptions = { day: "numeric", month: "short", year: "numeric" };
    const options = config ? { ...defaultOptions, ...config } : defaultOptions;

    // Validate options
    const validOptions = ["day", "month", "year", "hour", "minute", "second"];
    Object.keys(options).forEach((key) => {
      if (!validOptions.includes(key)) {
        throw new Error(`Invalid option: ${key}`);
      }
    });

    return new Date(date).toLocaleDateString("en-US", options);
  } catch (error) {
    console.error(`Error formatting date: ${error}`);
    return null;
  }
};
