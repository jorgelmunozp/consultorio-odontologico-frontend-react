const hours = new Date();

export const getTime = hours.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
});