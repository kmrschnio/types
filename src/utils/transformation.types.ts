/**
 * Date string type
 * ISO 8601 formatted date string
 */
export type DateString = string;

/**
 * UUID type
 * Universally unique identifier string
 */
export type UUID = string;

/**
 * Entity to DTO transformation type
 * Transforms entity dates to ISO strings
 */
export type EntityToDto<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: DateString;
  updatedAt: DateString;
};

/**
 * DTO to entity transformation type
 * Transforms DTO dates to Date objects
 */
export type DtoToEntity<T> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Partial entity type
 * Makes all entity properties optional except ID
 */
export type PartialEntity<T> = Partial<Omit<T, 'id'>> & {
  id: string;
};

/**
 * Create entity type
 * Entity type for creation (without ID and timestamps)
 */
export type CreateEntity<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Update entity type
 * Entity type for updates (partial with ID)
 */
export type UpdateEntity<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>> & {
  id: string;
};

/**
 * Response entity type
 * Entity type for API responses (with string dates)
 */
export type ResponseEntity<T> = EntityToDto<T>;

/**
 * Database entity type
 * Entity type for database operations (with Date objects)
 */
export type DatabaseEntity<T> = DtoToEntity<T>;
