export abstract class Settings {
  /**
   * The POESESSID which is used as a cookie
   */
  public static sessionId: string;
  /**
   * The User-Agent Header as described in https://www.pathofexile.com/developer/docs/index
   */

  public static userAgent: string;
  /**
   * OAuth authorization token created by the authorization code grant.
   * The token can be used to access account related entities.
   * https://www.pathofexile.com/developer/docs/authorization
   */
  public static authorizationToken: string;

  /**
   * OAuth credential token created by the client credential grant.
   * The token can be used to access entities unrelated to an account.
   * https://www.pathofexile.com/developer/docs/authorization
   */
  public static serviceToken: string;
}
