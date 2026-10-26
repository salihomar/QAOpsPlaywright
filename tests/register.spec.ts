import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { buildUser } from '../utils/userData';

test.describe('Création d un utilisateur', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('crée un nouvel utilisateur avec des données valides', async () => {
    const user = buildUser();

    const response = await registerPage.register(user);
    
    // Ajout d'un commentaire pour le test
    
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ message: 'Registered Successfully' });
  });

  test('l utilisateur créé peut se connecter', async ({ page }) => {
    const user = buildUser();
    const response = await registerPage.register(user);
    expect(response.status()).toBe(200);

    await page.goto('/client/#/auth/login');
    await page.reload(); // garantit un formulaire de connexion vierge
    await page.locator('#userEmail').fill(user.email);
    await page.locator('#userPassword').fill(user.password);
    await page.locator('#login').click();

    await expect(page).toHaveURL(/#\/dashboard\/dash/);
  });

  test('refuse un mot de passe de moins de 8 caractères', async () => {
    const user = buildUser({ password: '12345' });

    await registerPage.fillForm(user);
    await registerPage.submitButton.click();

    await expect(registerPage.passwordError).toBeVisible();
  });

  test('refuse un email déjà utilisé', async ({ page }) => {
    const user = buildUser();

    const first = await registerPage.register(user);
    expect(first.status()).toBe(200);

    // Nouvelle tentative avec le même email
    await registerPage.goto();
    await page.reload();
    await registerPage.fillForm(user);
    await registerPage.submitButton.click();

    await expect(registerPage.duplicateEmailError).toBeVisible();
  });
});
