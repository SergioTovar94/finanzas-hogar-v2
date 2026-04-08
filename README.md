# Project Charter — FinanzasHogar

**Versión:** 1.0 **Fecha:** 8 de abril de 2026 **Estado:** Aprobado

## 1. Descripción del proyecto

FinanzasHogar es una aplicación web de gestión financiera personal diseñada para parejas. Permite registrar ingresos, egresos, pagos recurrentes y deudas de ambas personas, calcular aportes proporcionales al hogar, proyectar los tres meses siguientes y generar informes del mes en curso.
No se conecta a entidades bancarias reales ni ejecuta transacciones. Es una herramienta de registro, análisis y planificación financiera.

## 2. Objetivos

- Permitir a cualquier pareja registrar y centralizar su información financiera en un solo lugar.
- Calcular automáticamente el aporte proporcional que debe realizar cada persona al hogar según sus ingresos.
- Proyectar el flujo de dinero para los tres meses siguientes, desglosado por mes.
- Generar informes del mes actual con balance, tendencias por rubro y alertas de pagos próximos.

## 3. Alcance

**Incluye:**

- Registro de cuentas bancarias por persona
- Registro de ingresos y egresos (con o sin categoría)
- Extracto de movimientos por cuenta y período
- Registro de pagos recurrentes con fecha límite
- Registro de deudas entre personas (te debo / me deben)
- Cálculo de aporte proporcional al hogar
- Balance mensual y proyección a 3 meses
- Análisis de tendencias por rubro
- Resumen quincenal de gastos
- Alertas automáticas por correo cuando se acerca un pago
- Resumen mensual automático por correo

**No incluye:**

- Conexión con bancos o entidades financieras reales
- Ejecución de transacciones o pagos reales
- Manejo de inversiones, portafolios o criptomonedas
- Aplicación móvil nativa (puede ser responsive en el futuro)

## 4. Criterio de éxito

El proyecto se considera exitoso cuando un usuario puede:

- Cargar toda la información financiera de su mes actual.
- Generar un informe del mes con balance, tendencias y pagos pendientes.
- Planificar los tres meses siguientes con proyección de ingresos, egresos y dinero disponible por mes.

## 5. Documentación

- [Project Charter](docs/project-charter.md)
- [Historias de usuario](docs/historias-de-usuario.md)
- [Modelo de datos](docs/modelo-de-datos.md)
- [Arquitectura](docs/arquitectura/general.md)
- [Backlog](docs/backlog.md)

## 6. Stack tecnológico

| Componente             | Tecnología                 |
| ---------------------- | -------------------------- |
| MS-1 Backend core      | Node.js 24 + Express       |
| MS-2 Backend analytics | Node.js 24 + Express       |
| API Gateway            | Node.js 24 + Express       |
| Base de datos          | PostgreSQL 16              |
| Contenedores           | Docker + Docker Compose    |
| Control de versiones   | Git + GitHub               |
| Gestión de tareas      | GitHub Projects            |
| Documentación          | Markdown en el repositorio |
| Automatizaciones       | n8n                        |
| Frontend (fase final)  | Angular                    |

## 7. Restricciones

- No requiere conexión con sistemas bancarios externos.
- El despliegue inicial debe ser local mediante Docker Compose.
- El proyecto debe poder desplegarse en la nube de forma gratuita o de bajo costo.

## 8. Entregables principales

1. Repositorio GitHub con estructura completa y documentación
2. MS-1 funcional: autenticación, cuentas, movimientos, pagos, deudas
3. MS-2 funcional: balance, proyecciones, tendencias, alertas
4. API Gateway configurado con enrutamiento y seguridad JWT
5. Docker Compose que levanta todo el sistema
6. Colección Postman con todos los endpoints documentados
7. Frontend básico en React (fase final)

## 9. Levantar el proyecto
