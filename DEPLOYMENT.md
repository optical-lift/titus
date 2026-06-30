# Titus Deployment Record

## Live URLs

Primary public URL:

https://titus.elmfarm.co

Vercel fallback URL:

https://titus-nu.vercel.app

## Hosting

Titus is hosted on Vercel as the `titus` project under Optical Lift's projects.

## GitHub

Repository:

https://github.com/optical-lift/titus

Branch:

main

## DNS

DNS is managed through DreamHost.

Custom domain:

titus.elmfarm.co

DreamHost record:

Type: CNAME
Name / Host: @
Value / Points to: 664e5bd5bad399c4.vercel-dns-017.com

Note: In DreamHost, this record was added inside the DNS screen for `titus.elmfarm.co`, so `@` means `titus.elmfarm.co`.

## Local Development

Titus uses port 3001 locally so it does not collide with Atlas.

Run:

npm run dev

Open:

http://localhost:3001

## Current V1 Proof

- Course Catalogue
- Ecology course page
- H0776 — אֶרֶץ / erets drawer-based lesson
- Fixed Lex Stamp
- Bible-first Canon Reading drawer
- Deployed to titus.elmfarm.co


## URL Convention

Canonical lesson route:

/lessons/h0776

Rule:

- Strong's-centered word lessons use the normalized lowercase Strong's ID.
- Public display still uses original language and transliteration, for example H0776 — אֶרֶץ / erets.
- Transliteration aliases may continue resolving for convenience, but should not be treated as canonical routes.
- Later bounded word-field lessons may use field-based routes such as /lessons/field-land-domain.
