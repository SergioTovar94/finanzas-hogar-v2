# Arquitectura general — FinanzasHogar

```mermaid
---
config:
  layout: elk
---
graph TD
    Client(["👤 Cliente\nPostman / React"])
    GW["🔀 API Gateway\nSpring Cloud Gateway\n:8080"]
    MS1["⚙️ MS-1\nSpring Boot\n:8081"]
    MS2["📊 MS-2\nDjango\n:8082"]
    DB1[("🗄️ PostgreSQL\nMS-1\n:5432")]
    DB2[("🗄️ PostgreSQL\nMS-2\n:5433")]
    N8N["🤖 n8n\n:5678"]
    SG["📧 SendGrid"]

    Client -->|"HTTPS + JWT"| GW
    GW -->|"/api/core/**"| MS1
    GW -->|"/api/analytics/**"| MS2
    MS1 --- DB1
    MS2 --- DB2
    MS2 -->|"Propaga cambios\nde proyección"| MS1
    N8N -->|"Consulta datos"| MS1
    N8N -->|"Consulta datos"| MS2
    N8N -->|"Envía correos"| SG
```

# API Gateway — FinanzasHogar

```mermaid
---
config:
  layout: elk
---
graph TD
    Client(["👤 Cliente"])

    subgraph GW["API Gateway — Spring Cloud Gateway :8080"]
        Filter["🔐 JWT Filter\nValida token en cada request\nexcepto /auth/**"]
        RateLimit["⏱️ Rate Limiter\nMáx 100 req/min por usuario"]
        Router["🔀 Router"]
    end

    MS1["⚙️ MS-1 — Spring Boot :8081"]
    MS2["📊 MS-2 — Django :8082"]

    Client -->|"POST /api/core/auth/**\n(sin JWT)"| GW
    Client -->|"Resto de requests\n(con JWT)"| Filter
    Filter -->|"Token válido"| RateLimit
    Filter -->|"Token inválido"| Client
    RateLimit --> Router
    Router -->|"/api/core/**"| MS1
    Router -->|"/api/analytics/**"| MS2
```

# MS-1 Spring Boot — FinanzasHogar

```mermaid
---
config:
  layout: elk
---
graph TD
    GW["🔀 API Gateway"]

    subgraph MS1["MS-1 — Spring Boot :8081"]

        subgraph Controllers["Capa Controller"]
            AC["AuthController\nPOST /auth/register\nPOST /auth/login"]
            HC["HouseholdController\nPOST /households\nPOST /households/:id/invite\nGET /households/:id"]
            ACC["AccountController\nGET /accounts\nPOST /accounts\nPUT /accounts/:id\nDELETE /accounts/:id"]
            TC["TransactionController\nGET /transactions\nPOST /transactions\nDELETE /transactions/:id"]
            RC["RecurringPaymentController\nGET /recurring-payments\nPOST /recurring-payments\nPUT /recurring-payments/:id\nPOST /recurring-payments/:id/pay\nGET /recurring-payments/due-soon\nDELETE /recurring-payments/:id"]
            DC["DebtController\nGET /debts\nPOST /debts\nPOST /debts/:id/settle"]
            CC["CategoryController\nGET /categories\nPOST /categories"]
        end

        subgraph Services["Capa Service"]
            AS["AuthService"]
            HS["HouseholdService"]
            ACS["AccountService"]
            TS["TransactionService"]
            RS["RecurringPaymentService"]
            DS["DebtService"]
            CS["CategoryService"]
        end

        subgraph Repositories["Capa Repository"]
            UR["UserRepository"]
            HR["HouseholdRepository"]
            ACR["AccountRepository"]
            TR["TransactionRepository"]
            RR["RecurringPaymentRepository"]
            DR["DebtRepository"]
            CR["CategoryRepository"]
        end

        subgraph Security["Seguridad"]
            JF["JwtFilter"]
            JP["JwtProvider"]
            SC["SecurityConfig"]
        end
    end

    DB1[("🗄️ PostgreSQL :5432")]

    GW --> Controllers
    Controllers --> Services
    Services --> Repositories
    Repositories --> DB1
    JF --> Services
```

# MS-2 Django — FinanzasHogar

```mermaid
---
config:
  layout: elk
---
graph TD
    GW["🔀 API Gateway"]
    MS1["⚙️ MS-1 Spring Boot"]

    subgraph MS2["MS-2 — Django REST Framework :8082"]

        subgraph Views["Capa Views (Controllers)"]
            BV["BalanceView\nGET /balance\nGET /balance/contribution\nGET /balance/summary"]
            TV["TrendsView\nGET /trends"]
            BWV["BiweeklyView\nGET /biweekly"]
            PV["ProjectionView\nPOST /projections\nGET /projections/:month\nPOST /projections/:id/items\nPUT /projections/items/:id\nDELETE /projections/items/:id"]
        end

        subgraph AppServices["Capa Services"]
            BS["BalanceService\nCalcula balances\ny aportes proporcionales"]
            TS["TrendsService\nCalcula tendencias\npor categoría"]
            BWS["BiweeklyService\nAgrupa pagos\npor quincena"]
            PS["ProjectionService\nGestiona proyecciones\ny propaga cambios"]
        end

        subgraph Models["Capa Models (ORM)"]
            PM["ProjectionModel"]
            PIM["ProjectionItemModel"]
        end

        subgraph Clients["Clientes externos"]
            MS1C["MS1Client\nConsuме API de MS-1\npara transacciones\ny pagos recurrentes"]
        end
    end

    DB2[("🗄️ PostgreSQL :5433")]

    GW --> Views
    Views --> AppServices
    AppServices --> Models
    AppServices --> MS1C
    Models --> DB2
    MS1C -->|"GET /transactions\nGET /recurring-payments"| MS1
    PS -->|"PUT /recurring-payments/:id"| MS1
```

# Automatizaciones n8n — FinanzasHogar

```mermaid
---
config:
  layout: elk
---
graph TD
    subgraph Flow1["Flujo 1 — Alerta de pago próximo a vencer"]
        C1["⏰ Cron\nEjecuta diariamente\na las 8:00 AM"]
        R1["📥 GET /api/core/\nrecurring-payments/due-soon"]
        F1{"¿Hay pagos\nque vencen\nen 5 días?"}
        E1["📧 SendGrid\nEnvía correo de alerta\na miembros del hogar"]
        S1["✅ Fin"]

        C1 --> R1
        R1 --> F1
        F1 -->|"Sí"| E1
        F1 -->|"No"| S1
        E1 --> S1
    end

    subgraph Flow2["Flujo 2 — Resumen financiero mensual"]
        C2["⏰ Cron\nEjecuta el último día\ndel mes a las 9:00 PM"]
        R2["📥 GET /api/analytics/\nbalance/summary"]
        R3["📥 GET /api/core/\nrecurring-payments\n(mes siguiente)"]
        B2["🔀 Combina datos\ndel resumen"]
        E2["📧 SendGrid\nEnvía resumen mensual\na miembros del hogar"]
        S2["✅ Fin"]

        C2 --> R2
        C2 --> R3
        R2 --> B2
        R3 --> B2
        B2 --> E2
        E2 --> S2
    end
```

# Comunicación entre servicios — FinanzasHogar

```mermaid
---
config:
  layout: elk
---
sequenceDiagram
    participant C as 👤 Cliente
    participant GW as 🔀 Gateway
    participant MS2 as 📊 MS-2 Django
    participant MS1 as ⚙️ MS-1 Spring Boot
    participant N8N as 🤖 n8n

    note over MS2,MS1: Consulta de datos para análisis
    MS2->>MS1: GET /api/core/transactions?month=2026-03
    MS1-->>MS2: Lista de transacciones del mes

    MS2->>MS1: GET /api/core/recurring-payments
    MS1-->>MS2: Lista de pagos recurrentes activos

    note over C,MS1: Propagación de cambio en proyección
    C->>GW: PUT /api/analytics/projections/items/10
    GW->>MS2: Reenvía request
    MS2->>MS2: Actualiza ítem y meses futuros
    MS2->>MS1: PUT /api/core/recurring-payments/1
    MS1-->>MS2: 200 OK — base_amount actualizado
    MS2-->>GW: 200 OK + meses propagados
    GW-->>C: 200 OK

    note over N8N,MS2: Automatización diaria
    N8N->>MS1: GET /api/core/recurring-payments/due-soon
    MS1-->>N8N: Pagos que vencen en 5 días

    note over N8N,MS2: Automatización fin de mes
    N8N->>MS2: GET /api/analytics/balance/summary
    MS2-->>N8N: Resumen financiero del mes
    N8N->>MS1: GET /api/core/recurring-payments
    MS1-->>N8N: Pagos del mes siguiente
```
