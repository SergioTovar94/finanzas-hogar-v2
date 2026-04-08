# Historias de Usuario — FinanzasHogar

## Épica 1 — Gestión de usuarios y autenticación

### HU-001 — Registro de usuario

_Como persona nueva, quiero registrarme en FinanzasHogar para tener acceso a mi espacio financiero._

**Criterios de aceptación:**

- El sistema permite registrarse con nombre, correo y contraseña.
- El correo debe ser único en el sistema.
- La contraseña debe tener mínimo 8 caracteres.
- Al registrarse exitosamente, el sistema retorna un token JWT.
- Si el correo ya existe, el sistema retorna un error descriptivo.

---

### HU-002 — Inicio de sesión

_Como usuario registrado, quiero iniciar sesión para acceder a mi información financiera._

**Criterios de aceptación:**

- El sistema autentica con correo y contraseña.
- Al autenticarse correctamente retorna un token JWT válido.
- Si las credenciales son incorrectas, retorna un error sin especificar cuál campo falló.
- El token expira después de 24 horas.

---

### HU-003 — Crear hogar compartido

_Como usuario, quiero crear un hogar y invitar a mi pareja para gestionar las finanzas juntos._

**Criterios de aceptación:**

- Un usuario puede crear un hogar con nombre.
- El creador puede invitar a otro usuario registrado por correo.
- El hogar tiene máximo 2 miembros.
- Ambos miembros ven la misma información financiera del hogar.
- Un usuario solo puede pertenecer a un hogar a la vez.

---

## Épica 2 — Cuentas bancarias

### HU-004 — Registrar cuenta bancaria

_Como usuario, quiero registrar mis cuentas bancarias para centralizar mi información financiera._

**Criterios de aceptación:**

- Se puede registrar una cuenta con nombre, banco, tipo (ahorros/corriente) y saldo inicial.
- La cuenta queda asociada a la persona que la creó.
- Un usuario puede tener múltiples cuentas.
- El saldo inicial puede ser cero.

---

### HU-005 — Ver resumen de cuentas

_Como usuario, quiero ver todas las cuentas del hogar para tener una vista consolidada del dinero disponible._

**Criterios de aceptación:**

- Se listan todas las cuentas del hogar, agrupadas por persona.
- Cada cuenta muestra nombre, banco, tipo y saldo actual.
- Se muestra el total consolidado del hogar.
- Se muestra el total por persona.

---

## Épica 3 — Movimientos

### HU-006 — Registrar ingreso

_Como usuario, quiero registrar un ingreso en una cuenta para mantener el saldo actualizado._

**Criterios de aceptación:**

- Se registra con monto, fecha, cuenta destino y descripción opcional.
- El saldo de la cuenta se actualiza automáticamente.
- Se puede categorizar el ingreso (salario, freelance, otro).
- La fecha puede ser pasada, presente o futura.

---

### HU-007 — Registrar egreso

_Como usuario, quiero registrar un egreso para llevar el control de mis gastos._

**Criterios de aceptación:**

- Se registra con monto, fecha, cuenta origen y descripción opcional.
- El rubro es opcional — si no se especifica queda como "Sin categoría".
- El saldo de la cuenta se actualiza automáticamente.
- No se permite registrar un egreso si el saldo de la cuenta es insuficiente.

---

### HU-008 — Ver extracto de cuenta

_Como usuario, quiero ver los movimientos de una cuenta como un extracto para entender qué pasó en un período._

**Criterios de aceptación:**

- Se pueden filtrar movimientos por rango de fechas.
- Se muestran ingresos y egresos ordenados por fecha descendente.
- Cada movimiento muestra fecha, descripción, monto y saldo resultante.
- Se puede filtrar por tipo (ingreso/egreso) y por categoría.

---

## Épica 4 — Pagos recurrentes

### HU-009 — Registrar pago recurrente

_Como usuario, quiero registrar mis pagos recurrentes para no olvidar ninguna obligación mensual._

**Criterios de aceptación:**

- Se registra con nombre, monto, día del mes en que vence, cuenta desde la que sale y persona responsable.
- Se puede marcar como pagado en el mes actual.
- Al marcarlo como pagado se registra automáticamente un egreso en la cuenta correspondiente.
- Se puede editar o eliminar el pago recurrente.

---

### HU-010 — Ver pagos próximos a vencer

_Como usuario, quiero ver qué pagos se acercan a su fecha límite para organizarme con tiempo._

**Criterios de aceptación:**

- Se listan los pagos recurrentes no pagados del mes actual.
- Se ordenan por días restantes para su vencimiento.
- Se resalta visualmente los que vencen en los próximos 5 días.
- Se indica el total pendiente por pagar en el mes.

---

## Épica 5 — Deudas entre personas

### HU-011 — Registrar deuda

_Como usuario, quiero registrar quién me debe o a quién le debo para no perder el rastro._

**Criterios de aceptación:**

- Se registra con monto, descripción, fecha y dirección (me deben / le debo).
- Se indica la persona involucrada (puede ser el otro miembro del hogar u otra persona externa).
- Se puede marcar como saldada.
- Al saldarla se registra el movimiento correspondiente en la cuenta indicada.

---

### HU-012 — Ver resumen de deudas

_Como usuario, quiero ver un resumen de todas mis deudas activas para saber mi situación._

**Criterios de aceptación:**

- Se listan separadas: "me deben" y "le debo".
- Se muestra el total de cada grupo.
- Se puede filtrar por persona.
- Las deudas saldadas se pueden consultar en un historial separado.

---

## Épica 6 — Balance y análisis (MS-2 Django)

### HU-013 — Ver balance mensual

_Como usuario, quiero ver el balance del mes actual para saber si gasté más de lo que ingresé._

**Criterios de aceptación:**

- Se muestra total de ingresos, total de egresos y diferencia del mes.
- Se desglosa por persona.
- Se muestra el balance consolidado del hogar.
- Se puede consultar el balance de meses anteriores.

---

### HU-014 — Ver tendencias por rubro

_Como usuario, quiero ver cómo varían mis gastos por categoría mes a mes para identificar dónde gasto más._

**Criterios de aceptación:**

- Se muestra el gasto por rubro en los últimos 3 meses.
- Se indica si un rubro subió o bajó respecto al mes anterior.
- Se puede filtrar por persona o ver el consolidado del hogar.

---

### HU-015 — Proyección a 3 meses

_Como usuario, quiero planificar mis finanzas para los próximos 3 meses para saber cuánto dinero tendré disponible cada mes._

**Criterios de aceptación:**

- El usuario puede ingresar ingresos y egresos esperados para cada mes futuro.
- El sistema calcula el dinero disponible al final de cada mes proyectado.
- Se tienen en cuenta los pagos recurrentes activos automáticamente.
- Se puede ajustar la proyección en cualquier momento.
- Se muestra una alerta si algún mes proyectado tiene balance negativo.

---

### HU-016 — Resumen quincenal

_Como usuario, quiero ver qué gastos tengo en cada quincena para organizar mejor mis ingresos._

**Criterios de aceptación:**

- Se divide el mes en dos quincenas (1-15 y 16-fin de mes).
- Se listan los pagos recurrentes que caen en cada quincena.
- Se muestra el total a pagar por quincena.
- Se indica cuánto dinero queda disponible después de los pagos de cada quincena.

---

### HU-017 — Aporte proporcional al hogar

_Como usuario, quiero saber cuánto debe aportar cada persona al hogar según sus ingresos para distribuir los gastos justamente._

**Criterios de aceptación:**

- El sistema calcula el porcentaje de aporte de cada persona basado en sus ingresos del mes.
- Se muestra cuánto debe aportar cada uno en pesos y porcentaje.
- Se actualiza automáticamente cuando cambian los ingresos registrados.
- Se puede ver el histórico de aportes por mes.

---

## Épica 7 — Automatizaciones

### HU-018 — Alerta de pago próximo a vencer

_Como usuario, quiero recibir un correo cuando un pago recurrente se acerque a su fecha límite para no olvidarlo._

**Criterios de aceptación:**

- Se envía un correo 5 días antes del vencimiento de un pago recurrente no pagado.
- El correo incluye nombre del pago, monto y fecha de vencimiento.
- Se envía a ambos miembros del hogar.
- No se envía si el pago ya fue marcado como pagado.

---

### HU-019 — Resumen financiero mensual automático

_Como usuario, quiero recibir un resumen de mis finanzas al cierre de cada mes para tener una visión general sin tener que entrar a la app._

**Criterios de aceptación:**

- Se envía automáticamente el último día de cada mes.
- Incluye balance del mes, top 3 rubros de gasto y dinero disponible.
- Incluye los pagos recurrentes pendientes para el mes siguiente.
- Se envía a ambos miembros del hogar.
