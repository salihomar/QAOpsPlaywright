import { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../utils/userData';

export class RegisterPage extends BasePage {
  readonly path = '/client/#/auth/register';

  // Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly occupationSelect: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly ageCheckbox: Locator;
  readonly submitButton: Locator;
  readonly passwordError: Locator;
  readonly duplicateEmailError: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = this.page.locator('#firstName');
    this.lastNameInput = this.page.locator('#lastName');
    this.emailInput = this.page.locator('#userEmail');
    this.phoneInput = this.page.locator('#userMobile');
    this.occupationSelect = this.page.locator('select');
    this.passwordInput = this.page.locator('#userPassword');
    this.confirmPasswordInput = this.page.locator('#confirmPassword');
    this.ageCheckbox = this.page.locator('input[type="checkbox"]');
    this.submitButton = this.page.locator('#login');

    // Le message apparaît plusieurs fois dans le DOM : on cible le premier
    this.passwordError = this.page
      .getByText('Password must be 8 Character Long!')
      .first();

    this.duplicateEmailError = this.page
      .getByText('User already exisits with this Email Id!') // Faute d'orthographe côté site cible
      .first();
  }

  /**
   * Remplit les champs du formulaire d'inscription.
   */
  async fillForm(user: UserData): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.phoneInput.fill(user.phone);
    await this.occupationSelect.selectOption({ label: user.occupation });
    await this.page.getByLabel(user.gender, { exact: true }).check();
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.ageCheckbox.check();
  }

  /**
   * Soumet le formulaire et attend la réponse réseau de l'API d'inscription.
   */
  async submitAndWaitForResponse(): Promise<Response> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (r) => r.url().includes('/auth/register') && r.request().method() === 'POST'
      ),
      this.submitButton.click(),
    ]);
    return response;
  }

  /**
   * Action métier complète : saisie et soumission.
   */
  async register(user: UserData): Promise<Response> {
    await this.fillForm(user);
    return this.submitAndWaitForResponse();
  }
}