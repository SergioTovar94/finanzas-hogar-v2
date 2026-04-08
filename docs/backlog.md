# Backlog — FinanzasHogar

## Metodología

- Sprints de 1 semana
- Priorización MoSCoW
- Cada historia de usuario se convierte en un Issue de GitHub
- Etiquetas: `must-have`, `should-have`, `could-have`, `ms-1`, `ms-2`, `automatizacion`

---

## Clasificación MoSCoW

| ID     | Historia                              | Prioridad   | Microservicio |
| ------ | ------------------------------------- | ----------- | ------------- |
| HU-001 | Registro de usuario                   | Must Have   | MS-1          |
| HU-002 | Inicio de sesión                      | Must Have   | MS-1          |
| HU-003 | Crear hogar compartido                | Must Have   | MS-1          |
| HU-013 | Ver balance mensual                   | Must Have   | MS-2          |
| HU-014 | Ver tendencias por rubro              | Must Have   | MS-2          |
| HU-015 | Proyección a 3 meses                  | Must Have   | MS-2          |
| HU-016 | Resumen quincenal                     | Must Have   | MS-2          |
| HU-017 | Aporte proporcional al hogar          | Must Have   | MS-2          |
| HU-018 | Alerta de pago próximo a vencer       | Must Have   | n8n           |
| HU-019 | Resumen financiero mensual automático | Must Have   | n8n           |
| HU-004 | Registrar cuenta bancaria             | Should Have | MS-1          |
| HU-005 | Ver resumen de cuentas                | Should Have | MS-1          |
| HU-006 | Registrar ingreso                     | Should Have | MS-1          |
| HU-007 | Registrar egreso                      | Should Have | MS-1          |
| HU-008 | Ver extracto de cuenta                | Should Have | MS-1          |
| HU-009 | Registrar pago recurrente             | Should Have | MS-1          |
| HU-010 | Ver pagos próximos a vencer           | Should Have | MS-1          |
| HU-011 | Registrar deuda                       | Should Have | MS-1          |
| HU-012 | Ver resumen de deudas                 | Should Have | MS-1          |

---

## Sprints

### Sprint 1 — Autenticación y estructura base

**Objetivo:** Un usuario puede registrarse, iniciar sesión y crear un hogar. La estructura del proyecto está lista con Docker, Git y la arquitectura de microservicios funcionando.

| Issue | Historia                                             | Tipo          | Etiquetas           |
| ----- | ---------------------------------------------------- | ------------- | ------------------- |
| #1    | Inicializar repositorio con estructura de carpetas   | Tarea técnica | `setup`             |
| #2    | Configurar Docker Compose con MS-1, MS-2 y ambas BDs | Tarea técnica | `setup`, `docker`   |
| #3    | Configurar API Gateway con enrutamiento base         | Tarea técnica | `setup`, `ms-1`     |
| #4    | HU-001 — Registro de usuario                         | Historia      | `must-have`, `ms-1` |
| #5    | HU-002 — Inicio de sesión con JWT                    | Historia      | `must-have`, `ms-1` |
| #6    | HU-003 — Crear hogar y invitar miembro               | Historia      | `must-have`, `ms-1` |
| #7    | Pruebas unitarias — AuthService y HouseholdService   | Tarea técnica | `testing`, `ms-1`   |

---

### Sprint 2 — Cuentas y movimientos

**Objetivo:** Un usuario puede registrar sus cuentas bancarias y sus movimientos del mes.

| Issue | Historia                                                | Tipo          | Etiquetas             |
| ----- | ------------------------------------------------------- | ------------- | --------------------- |
| #8    | HU-004 — Registrar cuenta bancaria                      | Historia      | `should-have`, `ms-1` |
| #9    | HU-005 — Ver resumen de cuentas del hogar               | Historia      | `should-have`, `ms-1` |
| #10   | HU-006 — Registrar ingreso                              | Historia      | `should-have`, `ms-1` |
| #11   | HU-007 — Registrar egreso                               | Historia      | `should-have`, `ms-1` |
| #12   | HU-008 — Ver extracto de cuenta                         | Historia      | `should-have`, `ms-1` |
| #13   | Categorías predefinidas — seed de datos                 | Tarea técnica | `ms-1`, `database`    |
| #14   | Pruebas unitarias — AccountService y TransactionService | Tarea técnica | `testing`, `ms-1`     |

---

### Sprint 3 — Pagos recurrentes y deudas

**Objetivo:** Un usuario puede registrar sus pagos recurrentes, marcarlos como pagados y llevar el control de deudas.

| Issue | Historia                                                  | Tipo          | Etiquetas             |
| ----- | --------------------------------------------------------- | ------------- | --------------------- |
| #15   | HU-009 — Registrar pago recurrente                        | Historia      | `should-have`, `ms-1` |
| #16   | HU-010 — Ver pagos próximos a vencer                      | Historia      | `should-have`, `ms-1` |
| #17   | HU-011 — Registrar deuda                                  | Historia      | `should-have`, `ms-1` |
| #18   | HU-012 — Ver resumen de deudas                            | Historia      | `should-have`, `ms-1` |
| #19   | Pruebas unitarias — RecurringPaymentService y DebtService | Tarea técnica | `testing`, `ms-1`     |

---

### Sprint 4 — Balance y análisis (MS-2)

**Objetivo:** Un usuario puede ver el balance del mes, el aporte proporcional y las tendencias por rubro.

| Issue | Historia                                                      | Tipo          | Etiquetas           |
| ----- | ------------------------------------------------------------- | ------------- | ------------------- |
| #20   | Configurar Django REST Framework y conexión a PostgreSQL MS-2 | Tarea técnica | `setup`, `ms-2`     |
| #21   | Configurar cliente HTTP en MS-2 para consumir MS-1            | Tarea técnica | `ms-2`              |
| #22   | HU-013 — Ver balance mensual                                  | Historia      | `must-have`, `ms-2` |
| #23   | HU-017 — Aporte proporcional al hogar                         | Historia      | `must-have`, `ms-2` |
| #24   | HU-014 — Ver tendencias por rubro                             | Historia      | `must-have`, `ms-2` |
| #25   | HU-016 — Resumen quincenal                                    | Historia      | `must-have`, `ms-2` |
| #26   | Pruebas unitarias — BalanceService y TrendsService            | Tarea técnica | `testing`, `ms-2`   |

---

### Sprint 5 — Proyecciones

**Objetivo:** Un usuario puede proyectar sus finanzas a 3 meses, comparar proyección vs ejecución y propagar cambios a pagos recurrentes.

| Issue | Historia                                                       | Tipo          | Etiquetas           |
| ----- | -------------------------------------------------------------- | ------------- | ------------------- |
| #27   | HU-015 — Crear proyección mensual con ítems automáticos        | Historia      | `must-have`, `ms-2` |
| #28   | HU-015 — Ver comparativo proyección vs ejecución por categoría | Historia      | `must-have`, `ms-2` |
| #29   | HU-015 — Propagar cambio de monto a meses futuros y MS-1       | Historia      | `must-have`, `ms-2` |
| #30   | Pruebas unitarias — ProjectionService                          | Tarea técnica | `testing`, `ms-2`   |

---

### Sprint 6 — Automatizaciones

**Objetivo:** El sistema envía correos automáticos de alerta y resumen mensual vía n8n.

| Issue | Historia                                                | Tipo          | Etiquetas                     |
| ----- | ------------------------------------------------------- | ------------- | ----------------------------- |
| #31   | Configurar n8n en Docker Compose                        | Tarea técnica | `setup`, `automatizacion`     |
| #32   | Configurar SendGrid como proveedor de correo            | Tarea técnica | `automatizacion`              |
| #33   | HU-018 — Flujo de alerta de pago próximo a vencer       | Historia      | `must-have`, `automatizacion` |
| #34   | HU-019 — Flujo de resumen financiero mensual automático | Historia      | `must-have`, `automatizacion` |

---

### Sprint 7 — Despliegue y cierre

**Objetivo:** El sistema corre completo en Docker Compose local y está desplegado en la nube.

| Issue | Historia                                              | Tipo          | Etiquetas          |
| ----- | ----------------------------------------------------- | ------------- | ------------------ |
| #35   | Docker Compose completo — todos los servicios         | Tarea técnica | `docker`, `deploy` |
| #36   | Despliegue en Railway o Render                        | Tarea técnica | `deploy`, `nube`   |
| #37   | Colección Postman documentada con todos los endpoints | Tarea técnica | `documentacion`    |
| #38   | README final con instrucciones de instalación y uso   | Tarea técnica | `documentacion`    |

---

## Configuración de GitHub Projects

### Columnas del tablero

- **📋 Backlog** — todos los issues que aún no están en un sprint
- **🗓️ Sprint actual** — issues del sprint en curso
- **🔄 En progreso** — issues que se están desarrollando
- **👀 En revisión** — issues con PR abierto
- **✅ Hecho** — issues completados y mergeados a `develop`

### Etiquetas a crear en GitHub

| Etiqueta         | Color       | Descripción                        |
| ---------------- | ----------- | ---------------------------------- |
| `must-have`      | 🔴 Rojo     | Funcionalidad crítica              |
| `should-have`    | 🟠 Naranja  | Importante pero no bloquea         |
| `ms-1`           | 🔵 Azul     | Pertenece a Spring Boot            |
| `ms-2`           | 🟣 Morado   | Pertenece a Django                 |
| `automatizacion` | 🟡 Amarillo | Flujo de n8n                       |
| `testing`        | 🟢 Verde    | Pruebas unitarias o de integración |
| `setup`          | ⚫ Gris     | Configuración inicial              |
| `docker`         | 🩵 Celeste  | Relacionado con contenedores       |
| `deploy`         | 🟤 Café     | Despliegue en nube                 |
| `documentacion`  | ⚪ Blanco   | Documentación del proyecto         |
| `database`       | 🌸 Rosa     | Relacionado con base de datos      |

### Estrategia de ramas

- `main` — código en producción, solo recibe merges desde `develop`
- `develop` — rama de integración, aquí se mergean los features
- `feature/HU-XXX-descripcion` — una rama por historia de usuario
- `hotfix/descripcion` — correcciones urgentes sobre `main`
