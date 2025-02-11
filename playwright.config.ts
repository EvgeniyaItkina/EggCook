import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'serve .',
        port: 3000
    }
})