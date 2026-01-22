// This converts backend fieldErrors[] → frontend-friendly object.
export function mapFieldErrors(errorResponse) {
  if (!errorResponse?.fieldErrors) return {};

  return errorResponse.fieldErrors.reduce((acc, err) => {
    acc[err.field] = err.message;
    return acc;
  }, {});
}
