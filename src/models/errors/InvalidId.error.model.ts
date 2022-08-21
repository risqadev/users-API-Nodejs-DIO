class InvalidIdError extends Error {
  constructor() {
    super('Invalid ID.');
  }
}

export default InvalidIdError;