# Playwright QA Automation Portfolio
![Playwright Tests](https://github.com/Yarwood-cmd/playwright-qa-portfolio/workflows/Playwright%20Tests/badge.svg)
Automated end-to-end test suite demonstrating QA automation skills using Playwright. Created as part of my transition from law enforcement into software quality assurance.

## 🎯 Purpose

This project showcases my ability to:
- Write clean, maintainable test automation code
- Test real-world user flows and navigation patterns
- Use modern testing frameworks (Playwright)
- Apply systematic problem-solving from my military and law enforcement background

## 🛠️ Tech Stack

- **Playwright** - Browser automation framework
- **JavaScript** - Test scripting language
- **Node.js** - Runtime environment
- **GitHub Actions** - CI/CD ready

## 📋 Test Coverage

### GitHub Login Flow Tests (`tests/github-login.spec.js`)
- ✅ Login page element validation
- ✅ Empty form submission error handling
- ✅ Search functionality verification

### GitHub Repository Navigation Tests (`tests/github-navigation.spec.js`)
- ✅ Direct repository navigation
- ✅ Issues tab navigation
- ✅ Pull Requests tab navigation  
- ✅ Issues list page loading

**Total: 7 test scenarios** running across 3 browsers (Chromium, Firefox, WebKit)

## 🚀 Running Tests

## 🐳 Docker Support

Run tests in a containerized environment:
```bash
# Build the Docker image
docker build -t playwright-qa-tests .

# Run tests in container
docker run playwright-qa-tests

# Run with custom browser
docker run playwright-qa-tests npx playwright test --project=chromium
```

**Benefits:**
- Consistent test environment across different machines
- Easy CI/CD integration
- No local Playwright installation required
- Matches production deployment patterns

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode (Watch Browser)
```bash
npx playwright test --headed
```

### Run Specific Test File
```bash
npx playwright test tests/github-login.spec.js
```

### Open Test Report
```bash
npx playwright show-report
```

### Interactive UI Mode
```bash
npx playwright test --ui
```

## 📊 Test Results

All tests passing across multiple browsers:
- ✅ Chromium
- ✅ Firefox  
- ✅ WebKit

## 🔄 Continuous Integration

This project uses GitHub Actions for automated testing on every commit. The test suite runs automatically on:
- Every push to main branch
- Every pull request
- Across multiple browsers in a clean Ubuntu environment

[View latest test runs →](https://github.com/Yarwood-cmd/playwright-qa-portfolio/actions)

## 🎓 Key Learnings

- **Selector Strategy**: Using role-based and URL-based selectors for stability
- **Error Handling**: Managing "strict mode violations" when multiple elements match
- **Cross-Browser Testing**: Ensuring compatibility across different browser engines
- **Maintainability**: Writing clear, documented tests that other QA engineers can understand

## 💼 Background

**Paul Yarwood**  
- Police Officer, Sherman Police Department (TX)
- U.S. Marine Corps Veteran (MOS 2841 - Ground Radio Repairman)
- B.S. Computer Information Systems (Texas A&M University-Commerce, May 2026)
- Security Clearance Eligible

My background in systematic problem-solving, attention to detail from accident reconstruction work, and experience with technical equipment translates directly into quality assurance automation.

## 🔗 Connect

- GitHub: [github.com/Yarwood-cmd](https://github.com/Yarwood-cmd

## 📝 Notes

This portfolio was developed specifically to demonstrate QA automation capabilities for opportunities in software quality assurance and test automation roles. The test suite follows industry best practices and is designed for maintainability and extensibility.