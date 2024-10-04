#!/bin/bash
npx prisma migrate dev
bun prisma/seed.ts