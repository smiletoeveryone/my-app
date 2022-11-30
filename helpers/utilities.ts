/*
 * String Helpers
 */
export const truncate = (input: string, characterLength: number) =>
  input.length > characterLength
    ? `${input.substring(0, characterLength)}...`
    : input;

export const truncateAddress = (
  address: string,
  options?: { short: boolean }
) =>
  options?.short
    ? `${address.substring(0, 5)}`
    : `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;

export const getTimezone = () => {
  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
