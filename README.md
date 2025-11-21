PROYECTO DE ARQUITECTURA DE SOFTWARE  MICROSERVICIOS
REALIZADO POR:

JUAN PABLO DÁVILA M. – ALEJANDRO CAÑADAS PARRA – NICOLÁS RAMÍREZ

Descripción General del Proyecto

Este proyecto implementa una arquitectura basada en microservicios, diseñada para simular un ecosistema de compras en línea donde los componentes se comunican de forma independiente, escalable y distribuida.
La solución se enfocó en buenas prácticas modernas de desarrollo backend, desacoplamiento, mensajería asíncrona y seguridad.

El sistema está compuesto por:
  
  1. Microservicio de Compras
  2. Microservicio de Pagos
  3. Microservicio de Notificaciones por Email
  4. Microservicio de Autenticación (JWT)
  5. FrontEnd Angular (interfaz del cliente)

La comunicación entre microservicios se realiza usando RabbitMQ, garantizando un flujo confiable de eventos entre los módulos críticos.

NOTA: Aunque la entrega permitía probar todo mediante Postman, se decidió implementar un Frontend en ANGULAR para:

 1. Facilitar pruebas del proyecto
 2. Permitir una experiencia visual completa
 3. Poder ingresar como ADMIN o como USUARIO
 4. Simular el flujo real de compras en una aplicación web
 5. Validar el JWT en tiempo real
 6. Interactuar con cada microservicio sin necesidad de herramientas externas

El frontend consume todos los endpoints de los microservicios y valida el token recibido del Auth-Service.

 **Cómo Ejecutar el Proyecto Completo**

### **1. Microservicios (Spring Boot)**

Para correr cada microservicio, entra a su carpeta principal y ejecuta:

```bash
cd <carpeta-del-microservicio>
mvn spring-boot:run
```

Cada uno se levanta de forma independiente.

---

### **2. Frontend Angular (Opcional pero implementado)**

Permite probar el proyecto fácilmente y entrar como **admin** o **usuario**.
El backend también se puede probar completamente con **Postman**.

Pasos para correr el frontend:

```bash
cd FrontAngular/frontend-tvp
nvm use 20
npm install --legacy-peer-deps
ng serve
```


### **3. Orden recomendado para correr todo**

1. Levantar RabbitMQ
2. Ejecutar cada microservicio con `mvn spring-boot:run`
3. Ejecutar el frontend con `ng serve`

