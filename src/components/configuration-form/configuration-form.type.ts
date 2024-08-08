export type Configuration = Record<string, string | number | boolean>;

//TODO: Remove when API description is fixed
export type PropertyInfo = {
  /**
   * The name of the property
   * @example "isExpirationEnabled"
   */
  name?: string;
  /**
   * The data type of the property
   * @example "Boolean"
   */
  type?: string;
  /** Additional data related to the property (Map<String, String>) */
  relatedData?: Record<string, string>;
};
