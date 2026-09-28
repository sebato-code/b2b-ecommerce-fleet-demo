{
  "files": [
    {
      "path": "README.md",
      "content": "# API de Descuentos B2B\n\nEsta API calcula descuentos basados en el monto total de la compra.\n\n## Endpoint\n\n### Calcular Descuento\n\n*   **Método:** `POST`\n*   **Ruta:** `/calcular-descuento`\n*   **Descripción:** Calcula el descuento aplicable a una compra según las siguientes reglas:\n    *   5% de descuento para compras superiores a $10,000.\n    *   10% de descuento para compras superiores a $50,000.\n    *   0% de descuento para compras menores o iguales a $10,000.\n*   **Request Body:**\n    ```json\n    {\n      \"monto_total\": 15000.50\n    }\n    ```\n    *   `monto_total` (number): El monto total de la compra.\n*   **Response Body (Éxito):**\n    ```json\n    {\n      \"monto_descuento\": 750.025,\n      \"total_con_descuento\": 14250.475\n    }\n    ```\n    *   `monto_descuento` (number): El monto del descuento aplicado.\n    *   `total_con_descuento` (number): El monto total después de aplicar el descuento.\n*   **Response Body (Error):**\n    ```json\n    {\n      \"error\": \"Descripción del error\"\n    }\n    ```\n    *   `error` (string): Mensaje descriptivo del error.\n\n## Instalación y Ejecución\n\n1.  Clonar el repositorio.\n2.  Instalar dependencias: `npm install`\n3.  Ejecutar la aplicación: `npm start`\n\n## Pruebas\n\nEjecutar las pruebas de aceptación: `npm test`\n"
    }
  ],
  "commit_message": "DOC: Documentar endpoint de cálculo de descuentos en README",
  "pr_title": "DOC: Documentar API de Descuentos B2B",
  "pr_description": "Se ha actualizado el archivo README.md para incluir la documentación detallada del nuevo endpoint `/calcular-descuento`.\n\nLa documentación incluye:\n- Método HTTP y ruta.\n- Descripción de la lógica de negocio para los descuentos.\n- Estructura esperada del Request Body.\n- Estructura de ejemplo del Response Body (éxito y error).\n- Instrucciones básicas de instalación y ejecución.\n- Comando para ejecutar las pruebas."
}