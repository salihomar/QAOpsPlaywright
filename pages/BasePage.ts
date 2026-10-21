import { Page, Response } from '@playwright/test';

export abstract class BasePage {
  /**
   * Chemin relatif ou URL propre à chaque page.
   * Doit être défini par chaque sous-classe.
   */
  abstract readonly path: string;

  /**
   * `protected` permet aux sous-classes d'accéder à l'objet `page` Playwright.
   */
  constructor(protected readonly page: Page) {}

  /**
   * Navigue vers le chemin spécifique de la page.
   */
  async goto(): Promise<Response | null> {
    return this.page.goto(this.path);
  }

  /**
   * Attend que le DOM soit complètement chargé.
   */
  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Récupère l'URL courante de la page.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Récupère le titre courant du document.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}