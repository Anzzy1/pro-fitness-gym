# Pro Fitness Gym Antipolo — website

Built with **Next.js 16 (App Router) · React 19 · TypeScript**, running on Node.js.

## Run it

```bash
npm install        # first time only
npm run dev        # http://localhost:3000 (auto-reloads while you edit)
npm run build      # production build
npm start          # serve the production build
```

## Where to edit things

| What | File |
|---|---|
| Promo dates, prices, hours, class schedule, coaches, gallery, contact info, social links, form email | `src/data/site.ts` |
| Page sections (text & layout) | `src/components/sections/*.tsx` |
| Interactive parts (nav, schedule, coach carousel, gallery, modal, inquiry form) | `src/components/*.tsx` |
| Styles | `src/app/globals.css` |
| Page title, description, share image, favicon | `src/app/layout.tsx` |
| Images | `public/assets/img/` (original photos are kept in `images/`) |

## Notes

- **Promo:** the 50% promo shows automatically between `PROMO.start` and `PROMO.end` (Philippine time) in `src/data/site.ts`; outside those dates the regular rates show.
- **Inquiry form:** emails go through FormSubmit to `FORM_CONFIG.email`. After the site is online, send one test inquiry and click the activation link FormSubmit emails to that address.
- **Deploying:** set the `SITE_URL` environment variable (e.g. `https://profitnessgym.ph`) so link previews use the right image URL.
