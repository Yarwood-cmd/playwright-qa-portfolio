# Playwright QA Automation Portfolio
![Playwright Tests](https://github.com/Yarwood-cmd/playwright-qa-portfolio/workflows/Playwright%20Tests/badge.svg)

Automated end-to-end test suite demonstrating QA automation skills using Playwright. Created as part of my transition from law enforcement into software engineering and quality assurance.

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
- **GitHub Actions** - CI/CD
- **Docker** - Containerized test execution

## 📋 Test Coverage

### GitHub Login Flow Tests (\`tests/github-login.spec.js\`)
- ✅ Login page element validation
- ✅ Empty form submission error handling
- ✅ Search functionality verification

### GitHub Repository Navigation Tests (\`tests/github-navigation.spec.js\`)
- ✅ Direct repository navigation
- ✅ Issues tab navigation
- ✅ Pull Requests tab navigation
- ✅ Issues list page loading

**Total: 7 test scenarios** running across 3 browsers (Chromium, Firefox, WebKit)

## 🚀 Running Tests

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Run All Tests
\`\`\`bash
npx playwright test
\`\`\`

### Run Tests in Headed Mode (Watch Browser)
\`\`\`bash
npx playwright test --headed
\`\`\`

### Run a Specific Test File
\`\`\`bash
npx playwright test tests/github-login.spec.js
\`\`\`

### Open the Test Report
\`\`\`bash
npx playwright show-report
\`\`\`

### Interactive UI Mode
\`\`\`bash
npx playwright test --ui
\`\`\`

## 🐳 Docker Support

Run tests in a containerized environment:
\`\`\`bash
# Build the Docker image
docker build -t playwright-qa-tests .

# Run tests in container
docker run playwright-qa-tests

# Run with a specific browser
docker run playwright-qa-tests npx playwright test --project=chromium
\`\`\`

**Benefits:**
- Consistent test environment across different machines
- Easy CI/CD integration
- No local Playwright installation required
- Matches production deployment patterns

## 📊 Test Results

All tests passing across multiple browsers:
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit

## 🔄 Continuous Integration

This project uses GitHub Actions for automated testing on every commit. The suite runs automatically on:
- Every push to the main branch
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
- Sworn patrol officer, Sherman Police Department (TX)
- U.S. Marine Corps veteran (MOS 2841 — Ground Radio Repairman)
- M.S. Computer Science, University of Tennessee, Knoxville (online, in progress)
- B.S. Computer Information Systems, *Cum Laude*, Technology Management minor — East Texas A&M University (May 2026)
- Inactive DoD Secret clearance (eligible for reinstatement); CUI access eligible; CompTIA Security+ in progress

My background in systematic problem-solving, attention to detail from accident reconstruction work, and hands-on experience with technical equipment translates directly into test automation and quality engineering.

## 🔗 Connect

- GitHub: [github.com/Yarwood-cmd](https://github.com/Yarwood-cmd)

## 📝 Notes

This portfolio was developed to demonstrate QA automation capabilities for software engineering and test automation roles. The suite follows industry best practices and is designed for maintainability and extensibility.
