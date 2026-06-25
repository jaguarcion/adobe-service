const axios = require('axios');
const https = require('https');

// Create an Axios instance with base URL and required headers
const apiClient = axios.create({
    baseURL: 'https://fivebot.co/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://fivebot.co',
        'Referer': 'https://fivebot.co/status'
    },
    // The prompt says "не отключать TLS-проверку" so we keep it strict
    httpsAgent: new https.Agent({ rejectUnauthorized: true })
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * Endpoint 1: Получить текущую организацию
 */
async function subscriptionCheck(email) {
    try {
        const response = await apiClient.post('/subscription-check', { email });
        return response.data;
    } catch (error) {
        // Log basic error details but don't crash
        console.error(`[Fivebot] subscriptionCheck error for ${email}:`, error.message);
        return null; // Return null on network error to mark as 'error' in DB
    }
}

/**
 * Endpoint 2: Проверить, не заблокирована ли организация
 */
async function orgSwitchOptions(email) {
    try {
        const response = await apiClient.post('/org-switch-options', { email });
        return response.data;
    } catch (error) {
        console.error(`[Fivebot] orgSwitchOptions error for ${email}:`, error.message);
        return null;
    }
}

/**
 * Endpoint 3: Переключить на рабочую организацию (вспомогательный метод)
 */
async function _orgSwitch(email) {
    try {
        const response = await apiClient.post('/org-switch', { email });
        return response.data;
    } catch (error) {
        console.error(`[Fivebot] _orgSwitch error for ${email}:`, error.message);
        return null;
    }
}

module.exports = {
    subscriptionCheck,
    orgSwitchOptions,
    sleep,
    _orgSwitch
};
