import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        adminDashboard: resolve(__dirname, 'admin-dashboard.html'),
        companyDashboard: resolve(__dirname, 'company-dashboard.html'),
        companyInternships: resolve(__dirname, 'company-internships.html'),
        companyProfile: resolve(__dirname, 'company-profile.html'),
        events: resolve(__dirname, 'events.html'),
        internships: resolve(__dirname, 'internships.html'),
        learning: resolve(__dirname, 'learning.html'),
        login: resolve(__dirname, 'login.html'),
        network: resolve(__dirname, 'network.html'),
        register: resolve(__dirname, 'register.html'),
        studentApplications: resolve(__dirname, 'student-applications.html'),
        studentDashboard: resolve(__dirname, 'student-dashboard.html'),
        studentPortfolio: resolve(__dirname, 'student-portfolio.html'),
        studentProfile: resolve(__dirname, 'student-profile.html')
      }
    }
  }
});
