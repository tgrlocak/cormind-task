const AUTH_URL = "http://dev.prowmes.com/panel/login";

const USER = "task";
const PASS = "1234";

export class AuthorizationService {
  async login(): Promise<boolean> {
    try {
      const params = new URLSearchParams();
      params.append("username", USER);
      params.append("password", PASS);
      params.append("react", "true");

      await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        credentials: "include",
      }).then((response) => response.json());
      return true;
    } catch (error) {}
    return false;
  }
}
