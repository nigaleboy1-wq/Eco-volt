# EcoVolt Solutions — Site Web Premium

Site web premium pour EcoVolt Solutions, une entreprise d'énergie solaire basée à Ouagadougou, Burkina Faso.

## Technologies

- **Next.js 16** (App Router, Turbopack)
- **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui
- **Framer Motion** (animations)
- **Lucide React** (icônes)
- **Prisma ORM** (base de données, si nécessaire)

## Démarrage

```bash
# Installer les dépendances
bun install

# Lancer le serveur de développement
bun run dev

# Build de production
bun run build

# Lancer en production
bun run start

# Linter
bun run lint
```

Le site sera disponible sur `http://localhost:3000`.

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Layout racine (polices, métadonnées)
│   ├── page.tsx            # Page d'accueil (toutes les sections)
│   ├── globals.css         # Styles globaux + thème
│   └── api/                # Routes API
├── components/
│   ├── site/               # Composants du site
│   │   ├── navbar.tsx      # Navigation avec scroll animé
│   │   ├── hero.tsx        # Section hero
│   │   ├── about.tsx       # À propos
│   │   ├── services.tsx    # Services (sticky scroll)
│   │   ├── approach.tsx    # Notre approche (graphique animé)
│   │   ├── why-us.tsx      # Pourquoi EcoVolt
│   │   ├── projects.tsx    # Réalisations (filtres + cartes 3D)
│   │   ├── process.tsx     # Notre processus (sticky desktop / vertical mobile)
│   │   ├── stats.tsx       # Statistiques (count-up)
│   │   ├── testimonials.tsx # Témoignages (glassmorphism)
│   │   ├── contact.tsx     # Contact (formulaire multi-étapes)
│   │   ├── footer.tsx      # Footer
│   │   ├── smooth-scroll.tsx    # Scroll fluide (lerp + vélocité)
│   │   ├── scroll-progress.tsx  # Barre de progression + curseur
│   │   ├── scroll-anim.tsx      # Animations scroll (FromLeft, FromRight, etc.)
│   │   ├── reveal.tsx           # Révélations au scroll
│   │   ├── magnetic.tsx         # Effet magnétique sur boutons
│   │   └── card-3d.tsx          # Cartes avec effet 3D tilt
│   └── ui/                 # Composants shadcn/ui
├── hooks/                  # Hooks personnalisés
└── lib/                    # Utilitaires
```

## Fonctionnalités

- **Scroll fluide** : interpolation lerp avec tracking de vélocité
- **Navigation animée** : scroll avec easing easeInOutCubic vers les sections
- **Sticky scroll** : sections Services et Process avec scroll pinned (desktop)
- **Responsive** : layout adaptatif mobile/desktop pour Process
- **Animations** : révélations au scroll, stagger, count-up, parallaxe, 3D tilt
- **Glassmorphism** : cartes avec backdrop-blur dans Témoignages
- **Formulaire multi-étapes** : contact en 3 étapes avec validation
- **Effets 3D** : tilt au survol sur les cartes Projects et WhyUs

## Palette de couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Vert forêt | `#0E3B2E` | Primaire |
| Doré | `#D8A928` | Accent |
| Crème | `#F8F7F2` | Fond clair |
| Texte foncé | `#132C25` | Texte principal |
| Vert foncé | `#07241c` | Fond sombre (hero, navbar) |

## Déploiement sur Vercel

1. Poussez le code sur GitHub
2. Connectez le dépôt à Vercel
3. Vercel détecte automatiquement Next.js
4. Le build se lance avec `bun run build`
5. Le site est déployé

## Licence

© EcoVolt Solutions. Tous droits réservés.
