
# Office Management - Backend (Microservices) - Starter (Runnable)

This starter contains 3 services: auth-service, company-service, employee-service.
Run with Docker Compose locally (creates MongoDB and RabbitMQ containers).

## Prerequisites
- Docker & Docker Compose installed

## Run
1. From the project root run:
   ```bash
   docker compose up --build
   ```
2. Services:
   - Auth: http://localhost:4001/api/v1
   - Company: http://localhost:4002/api/v1
   - Employee: http://localhost:4003/api/v1
3. RabbitMQ management UI: http://localhost:15672 (guest/guest)

## Quick curl examples
Register admin:
```bash
curl -X POST http://localhost:4001/api/v1/auth/register -H 'Content-Type: application/json' -d '{"name":"Admin","email":"admin@local","password":"Passw0rd!","role":"admin"}'
```
Login:
```bash
curl -X POST http://localhost:4001/api/v1/auth/login -H 'Content-Type: application/json' -d '{"email":"admin@local","password":"Passw0rd!"}'
```
Create company (replace $TOKEN):
```bash
curl -X POST http://localhost:4002/api/v1/companies -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"name":"Acme Ltd","address":"Mumbai"}'
```
Create employee (replace COMPANY_ID and $TOKEN):
```bash
curl -X POST http://localhost:4003/api/v1/employees -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"firstName":"Mihir","lastName":"Trivedi","email":"mihir@acme.local","company":"COMPANY_ID"}'
```

