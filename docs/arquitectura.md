# Architecture Decision Records — FinanzasHogar

## ADR-001 — Arquitectura de microservicios

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

FinanzasHogar requiere dos dominios claramente diferenciados: operaciones financieras del día a día (cuentas, movimientos, pagos) y análisis financiero (proyecciones, tendencias, balances). Ambos tienen responsabilidades distintas y tecnologías que se adaptan mejor a cada caso.

### Decisión

Se implementa una arquitectura de microservicios con dos servicios independientes: MS-1 en Spring Boot para operaciones y MS-2 en Django para análisis. Cada uno tiene su propia base de datos y se comunican vía API REST.

### Consecuencias

- Mayor complejidad operacional que un monolito.
- Cada servicio puede escalar, desplegarse y evolucionar de forma independiente.
- Permite aprender dos stacks tecnológicos diferentes en un mismo proyecto.
- Requiere un API Gateway para centralizar el acceso.

### Alternativas descartadas

- **Monolito en Spring Boot:** más simple pero no permite aprender Django ni practicar comunicación entre servicios.
- **Monolito en Django:** descartado por la misma razón.

---

## ADR-002 — Spring Boot para MS-1 (operaciones)

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

El servicio de operaciones maneja autenticación, cuentas, movimientos y pagos recurrentes. Requiere seguridad robusta, transacciones de base de datos confiables y un ecosistema maduro para APIs REST.

### Decisión

Se usa Spring Boot 3 con Java 21 para MS-1.

### Consecuencias

- Ecosistema maduro con Spring Security, Spring Data JPA y Spring Cloud Gateway.
- Inyección de dependencias nativa facilita pruebas unitarias con Mockito.
- Mayor verbosidad que Python pero más explícito en tipos y contratos.

### Alternativas descartadas

- **Node.js con Express:** menos estructurado para proyectos con múltiples capas.
- **Quarkus:** curva de aprendizaje mayor sin beneficio claro para este proyecto.

---

## ADR-003 — Django REST Framework para MS-2 (analytics)

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

El servicio de análisis calcula proyecciones, tendencias y balances. Requiere manejo de datos numéricos, lógica de negocio compleja y facilidad para iterar rápido.

### Decisión

Se usa Django 5 con Django REST Framework y Python 3.12 para MS-2.

### Consecuencias

- Python es ideal para cálculos y manipulación de datos.
- Django ORM simplifica consultas complejas de agregación.
- Permite comparar en el mismo proyecto dos paradigmas distintos: Java tipado estático vs Python tipado dinámico.

### Alternativas descartadas

- **FastAPI:** más moderno pero con menos convenciones, lo que alarga el tiempo de setup.
- **Flask:** demasiado minimalista para un servicio con múltiples modelos y endpoints.

---

## ADR-004 — Spring Cloud Gateway como API Gateway

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

Con dos microservicios independientes se necesita un punto de entrada único que centralice el enrutamiento, la validación de JWT y el control de acceso.

### Decisión

Se usa Spring Cloud Gateway como API Gateway. Enruta `/api/core/**` hacia MS-1 y `/api/analytics/**` hacia MS-2. Valida el token JWT antes de dejar pasar cualquier request.

### Consecuencias

- El cliente solo conoce una URL — la del Gateway.
- La validación de JWT ocurre una sola vez en el Gateway, no en cada microservicio.
- Agrega un componente más al sistema que debe mantenerse y desplegarse.

### Alternativas descartadas

- **Kong:** más potente pero con mayor complejidad de configuración.
- **Nginx como proxy:** no tiene integración nativa con Spring Security para validación de JWT.

---

## ADR-005 — PostgreSQL como base de datos

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

El sistema maneja datos financieros que requieren integridad transaccional, soporte para decimales precisos y consultas de agregación complejas.

### Decisión

Se usa PostgreSQL 16 para ambos microservicios, cada uno con su propia base de datos independiente.

### Consecuencias

- Soporte nativo para enums, decimales de alta precisión y transacciones ACID.
- Dos instancias separadas refuerzan el principio de independencia entre microservicios.
- Escalable a futuro con extensiones como TimescaleDB para series de tiempo financieras.

### Alternativas descartadas

- **MySQL:** menor soporte para enums nativos y tipos avanzados.
- **MongoDB:** los datos financieros tienen estructura relacional clara — una BD documental añadiría complejidad sin beneficio.
- **Una sola BD compartida:** violaría el principio de independencia entre microservicios.

---

## ADR-006 — Enums en base de datos

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

Varios campos del modelo tienen valores restringidos: tipos de cuenta, tipos de transacción, roles, etc.

### Decisión

Se definen como enums nativos de PostgreSQL en lugar de strings libres o tablas de referencia.

### Consecuencias

- Validación a nivel de base de datos — imposible insertar un valor no definido.
- Más explícito y legible que usar strings.
- Cambiar un enum en PostgreSQL requiere una migración — hay que pensar bien los valores antes de implementar.

### Alternativas descartadas

- **Strings sin restricción:** permite valores inválidos y complica el mantenimiento.
- **Tablas de referencia (lookup tables):** overhead innecesario para valores que no cambian con frecuencia.

---

## ADR-007 — n8n para automatizaciones

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

El sistema requiere automatizaciones: alertas de pagos próximos a vencer y resumen mensual por correo. Estas tareas no deben estar acopladas al código de los microservicios.

### Decisión

Se usa n8n como motor de automatizaciones. Corre como un servicio independiente en Docker Compose y consume las APIs de MS-1 y MS-2 para obtener datos y disparar notificaciones.

### Consecuencias

- Las automatizaciones son configurables sin tocar código.
- n8n puede integrarse con SendGrid para correos y Twilio para SMS sin desarrollo adicional.
- Agrega un componente más al Docker Compose.

### Alternativas descartadas

- **Scheduled jobs en Spring Boot:** acoplaría la lógica de notificaciones al microservicio de operaciones.
- **Celery en Django:** válido pero requiere Redis como broker y añade complejidad.
- **Zapier / Make:** herramientas SaaS de pago con límites en el plan gratuito.

---

## ADR-008 — Moneda única con diseño escalable

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

Inicialmente el sistema opera solo con pesos colombianos (COP) pero debe poder soportar multi-moneda en el futuro sin rediseñar el modelo.

### Decisión

Se almacena el campo `currency` en la tabla `accounts` con valor por defecto `COP`. Toda la lógica actual asume una sola moneda. Cuando se implemente multi-moneda se agrega una tabla `exchange_rates` y se ajusta la lógica de consolidación sin cambiar el modelo existente.

### Consecuencias

- El modelo actual es simple y no tiene overhead de conversión de monedas.
- La migración a multi-moneda en el futuro es incremental y no destructiva.

---

## ADR-009 — Proyecciones acopladas a pagos recurrentes

**Fecha:** 2026-03-31
**Estado:** Aprobado

### Contexto

Los pagos recurrentes se copian automáticamente a las proyecciones mensuales. Cuando el usuario edita el monto de un pago en una proyección futura, ese cambio debe reflejarse en los meses siguientes y en el pago recurrente base.

### Decisión

MS-2 es responsable de propagar los cambios. Cuando se edita un `projection_item` de origen `recurring`, MS-2 llama a MS-1 para actualizar el `base_amount` del pago recurrente y actualiza los `projection_items` de los meses futuros con el mismo `recurring_payment_id`. Las proyecciones con `is_closed = true` no se modifican.

### Consecuencias

- Consistencia entre lo planeado y el pago recurrente base.
- MS-2 necesita llamar a MS-1 vía API — introduce dependencia entre servicios en escritura.
- Si MS-1 no está disponible en el momento de la propagación se requiere manejo de errores y reintento.
