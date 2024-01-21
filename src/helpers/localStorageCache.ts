/**
 * Stores a value in localStorage under the given key after converting it to a JSON string.
 * This function abstracts the serialization process.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {any} value - The value to be stored.
 */
export function setLocalStorageCache(key: string, value: any): void {
	try {
	  const serializedValue = JSON.stringify(value);
	  localStorage.setItem(key, serializedValue);
	} catch (error) {
	  console.error(`Error setting localStorage item for key "${key}":`, error);
	}
  }
  
  /**
   * Retrieves a value from localStorage by key and converts it from a JSON string back to its original format.
   * If the key does not exist or if an error occurs during retrieval, null is returned.
   *
   * @param {string} key - The key of the item to retrieve.
   * @returns {any | null} - The parsed value or null if not found or in case of an error.
   */
  export function getLocalStorageCache(key: string): any | null {
	try {
	  const value = localStorage.getItem(key);
	  return value ? JSON.parse(value) : null;
	} catch (error) {
	  console.error(`Error getting localStorage item for key "${key}":`, error);
	  return null;
	}
  }
  