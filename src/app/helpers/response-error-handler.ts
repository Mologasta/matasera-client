export function responseErrorHandler(err): string {
    const errors: string[] = (err.error.errors)
        ? err.error.errors.map((errItem: { code: number, message: string }) => errItem.message)
        : [];
    return errors.join(',') || 'Unknown error';
}