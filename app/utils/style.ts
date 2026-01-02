export function modifyAlpha(
  color: string | null,
  alpha: number = 0.5
): string | null {
  if (!color) return null

  if (color.startsWith("rgba")) {
    return color.replace(
      /rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/,
      `rgba($1, $2, $3, ${alpha})`
    )
  }

  if (color.startsWith("rgb")) {
    return color.replace(
      /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
      `rgba($1, $2, $3, ${alpha})`
    )
  }

  return color
}
