# projet_playwright_rahul

Tests E2E Playwright + TypeScript sur https://rahulshettyacademy.com/client

## Installation
```bash
npm install
npx playwright install chromium
```

## Lancer les tests
```bash
npm test                # tous les tests
npm run test:register   # création d'utilisateur uniquement
npm run test:headed     # avec navigateur visible
npm run test:ui         # mode UI de Playwright
npm run report          # rapport HTML
```

## Structure
```
projet_playwright_rahul/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── pages/RegisterPage.ts     # Page Object de l'inscription
├── utils/userData.ts         # génération d'utilisateurs uniques
└── tests/register.spec.ts    # scénarios de création d'utilisateur
```

## Scénarios
- Création d'un utilisateur valide (API : 200 + "Registered Successfully")
- Connexion avec l'utilisateur créé (redirection vers le dashboard)
- Refus d'un mot de passe < 8 caractères
- Refus d'un email déjà utilisé
