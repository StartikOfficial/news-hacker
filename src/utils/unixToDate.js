export const unixToDate = (unixTimestamp) => {
    const time = new Date(unixTimestamp * 1000);
    return `${time.toLocaleTimeString("ru-RU").slice(0, -3)}, ${(time).toLocaleDateString("ru-RU")}`;
}