class NoEffectError extends Error {
  constructor(message?: string) {
    super(message || 'No effect on database.')
  }
}

export default NoEffectError;