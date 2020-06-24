/**
 * Newsletter subscription action inpuut
 */
export interface NewsletterSubscriptionInput {
  /**
   * The email to be subscribed.
   */
  email: string;

  /**
   * Identifies the component the user interacted with to subscribe.
   */
  source: string;

  /**
   * Identifies the location the user was when subscribed
   * (ie. the current website URL).
   */
  sourceURL: string;
}
