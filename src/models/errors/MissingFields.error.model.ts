class MissingFieldsError extends Error {
  constructor(message?: string) {
    super(message || `'name', 'username', 'email' and 'password' fields are required.`);
  }
}

export default MissingFieldsError;