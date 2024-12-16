export const getAssetsFile = (url: string) => {
  console.log(new URL(`../assets/images/${url}`, import.meta.url).href);
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
