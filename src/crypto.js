const crypto = require('crypto');

// Get keys from environment variables and ensure they are buffers of correct length
const getAESKey = () => Buffer.from(process.env.AES_KEY, 'utf-8');
const getAESIv = () => Buffer.from(process.env.AES_IV, 'utf-8');

/**
 * Encrypts a text string using AES-256-CBC
 * @param {string} text - The text to encrypt
 * @returns {string} - Base64 encoded encrypted string
 */
function encrypt(text) {
    if (!text) return text;
    const cipher = crypto.createCipheriv('aes-256-cbc', getAESKey(), getAESIv());
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

/**
 * Decrypts a Base64 encoded encrypted string using AES-256-CBC
 * @param {string} encryptedText - The text to decrypt
 * @returns {string} - Decrypted original string
 */
function decrypt(encryptedText) {
    if (!encryptedText) return encryptedText;
    const decipher = crypto.createDecipheriv('aes-256-cbc', getAESKey(), getAESIv());
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * Validates the admin token safely to prevent timing attacks
 * @param {string} token - The token provided in the request
 * @returns {boolean} - True if valid
 */
function validateAdminToken(token) {
    if (!token || !process.env.ADMIN_TOKEN) return false;
    if (token.length !== process.env.ADMIN_TOKEN.length) return false;
    
    return crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(process.env.ADMIN_TOKEN)
    );
}

module.exports = {
    encrypt,
    decrypt,
    validateAdminToken
};
