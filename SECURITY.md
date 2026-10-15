# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

TRUST.TRAVEL takes software security seriously. If you discover a potential vulnerability within this codebase or template, please report it privately:

1. **Email**: security@trust.travel
2. Include reproduction steps, affected components, and potential impact.
3. We will acknowledge receipt within 48 hours and work with you on a coordinated fix.

## Prototype & Client Safety

- This repository represents an open-source travel booking template and interactive prototype.
- **No real payment card data** is collected, processed, or transmitted.
- **No real authentication credentials** are stored in plain text.
- Before connecting live Stripe or PMS provider credentials in production, ensure your deployment satisfies PCI-DSS Level 1 compliance and environment variable isolation.
