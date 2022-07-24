export interface AvatarsOptions {
  /**
   * Page offset
   *
   * Default: `1`
   */
  page?: number;

  /**
   * Results per page
   *
   * Default: `16` (maximum)
   */
  perPage?: number;

  /**
   * When set to `true` only custom avatars (supporter avatars) of the account will be fetched
   *
   * Default: `false`
   */
  custom?: boolean;
}
