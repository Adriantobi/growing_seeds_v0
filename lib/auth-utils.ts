export function generateSecureString(length: number = 64): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let secureString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(
      crypto.getRandomValues(new Uint32Array(1))[0] % characters.length,
    );
    secureString += characters[randomIndex];
  }

  return secureString;
}

export function checkTokenExpiration(expiration: Date): boolean {
  const expiryDate = new Date(expiration);
  const currentDate = new Date();

  return currentDate > expiryDate;
}
