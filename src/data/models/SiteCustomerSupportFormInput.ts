/**
 * send a message to customer support
 * @export
 * @interface SendMessageInput
 */

export interface SiteCustomerSupportFormInput {
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  firstName: string;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  lastName: string;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  email: string;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  message: string | null;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  phoneNumber: string;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  orderId: string | null;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  subject: string;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  attachedFile: string | null;
  /**
   * @type {string}
   * @memberof SendMessageInput
   */
  token: string;
}
