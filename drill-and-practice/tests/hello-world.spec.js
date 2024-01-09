const { test, expect } = require("@playwright/test");

test("Registration form exists", async ({ page }) => {
  await page.goto("/auth/register");
  const formExists = await page.isVisible(
    'form[method="POST"][action="/auth/register"]'
  );
  expect(formExists).toBe(true);
});

test("Email input exists on registration form", async ({ page }) => {
  await page.goto("/auth/register");
  const emailInputExists = await page.isVisible(
    'input[type="email"][name="email"]'
  );
  expect(emailInputExists).toBe(true);
});

test("Password input exists on registration form", async ({ page }) => {
  await page.goto("/auth/register");
  const passwordInputExists = await page.isVisible(
    'input[type="password"][name="password"]'
  );
  expect(passwordInputExists).toBe(true);
});

test("Submit button exists on registration form", async ({ page }) => {
  await page.goto("/auth/register");
  const submitButtonExists = await page.isVisible(
    'input[type="submit"][value="Register"]'
  );
  expect(submitButtonExists).toBe(true);
});

test("Navigate to the Registration Page", async ({ page }) => {
  await page.goto("/auth/register");
  const currentUrl = page.url();
  expect(currentUrl).toBe("http://localhost:7777/auth/register");
});

// Test 2: Check if the email input can be filled in
test("Fill in Email Input on Register Form", async ({ page }) => {
  await page.goto("/auth/register");
  await page.fill('input[name="email"]', "d@d.com");
  const emailValue = await page.inputValue('input[name="email"]');
  expect(emailValue).toBe("d@d.com");
});

// Test 3: Check if the password input can be filled in
test("Fill in Password Input on Register Form", async ({ page }) => {
  await page.goto("/auth/register");
  await page.fill('input[name="password"]', "123456");
  const passwordValue = await page.inputValue('input[name="password"]');
  expect(passwordValue).toBe("123456");
});

// Test 4: Check if the form submission redirects to the login page
test("Submit Registration Form and Redirect to Login Page", async ({
  page,
}) => {
  await page.goto("/auth/register");
  await page.fill('input[name="email"]', "d@d.com");
  await page.fill('input[name="password"]', "123456");

  await page.click('input[type="submit"]');
  await page.waitForLoadState("load");

  const currentUrl = page.url();
  expect(currentUrl).toBe("http://localhost:7777/auth/login");
});

test("Showing the login page", async ({ page }) => {
  await page.goto("/auth/login");
  const formExists = await page.isVisible(
    'form[method="POST"][action="/auth/login"]'
  );
  expect(formExists).toBe(true);
  const emailInputExists = await page.isVisible(
    'input[type="email"][name="email"]'
  );
  const passwordInputExists = await page.isVisible(
    'input[type="password"][name="password"]'
  );
  const submitButtonExists = await page.isVisible(
    'input[type="submit"][value="Login"]'
  );

  expect(emailInputExists).toBe(true);
  expect(passwordInputExists).toBe(true);
  expect(submitButtonExists).toBe(true);
});

test("Filling in the login Form", async ({ page }) => {
  await page.goto("/auth/login");
  await page.fill('input[name="email"]', "d@d.com");
  await page.fill('input[name="password"]', "123456");

  await page.click('input[type="submit"]');

  await page.waitForLoadState("load");
  const currentUrl = page.url();
  expect(currentUrl).toBe("http://localhost:7777/topics");
});
