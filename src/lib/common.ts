export const CommonUtils = {
  parseJwt: (token: string) => {
    if (!token) return;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const binary = window.atob(base64);

    // Convert binary string to UTF-8
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decoded = new TextDecoder("utf-8").decode(bytes);

    return JSON.parse(decoded);
  },
  getUserFullname: (token: string) => {
    const jwtPayload = CommonUtils.parseJwt(token);
    console.log("jwtPayload", jwtPayload);
    return jwtPayload?.name || "User";
  },
};
