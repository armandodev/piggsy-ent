# Piggsy ENT

¡Bienvenido al repositorio de **Piggsy ENT**! Este documento te guiará paso a paso para clonar el repositorio desde un fork y preparar tu entorno para colaborar con el proyecto. Sigue estas instrucciones cuidadosamente.

---

## ¿Qué es un fork?

Un fork es una copia del repositorio principal en tu cuenta de GitHub. Esto te permite trabajar en tus propios cambios sin afectar el repositorio original. Una vez que termines tus cambios, puedes enviar un **pull request** para que los revisemos y los integremos al proyecto principal.

---

## Pasos para clonar el repositorio desde un fork

### 1. Haz un fork del repositorio

1. Inicia sesión en tu cuenta de GitHub.
2. Ve al repositorio principal de **Piggsy ENT**: [Piggsy ENT Repository](https://github.com/armandodev/piggsy-ent).
3. Haz clic en el botón **Fork** en la esquina superior derecha de la página.
4. Ahora tendrás una copia del repositorio en tu cuenta de GitHub.

### 2. Clona tu fork en tu computadora

1. Ve a tu fork del repositorio en tu cuenta de GitHub.
2. Haz clic en el botón **Code** y copia la URL del repositorio (puede ser HTTPS o SSH).
3. Abre una terminal en tu computadora.
4. Escribe el siguiente comando para clonar tu fork:

```bash
git clone <URL-de-tu-fork>
```

Reemplaza `<URL-de-tu-fork>` con la URL que copiaste.

No olvides ejecutar el comando para instalar las dependencias del proyecto:

```bash
npm install
```

Esto instalará todas las dependencias necesarias para que el proyecto funcione correctamente.

### 3. Configura el repositorio remoto original

Esto te permitirá mantener tu fork actualizado con los cambios del repositorio principal.

1. Entra en la carpeta del proyecto:

```bash
cd piggsy-ent
```

2. Agrega el repositorio original como un remoto llamado `upstream`:

```bash
git remote add upstream https://github.com/armandodev/piggsy-ent.git
```

3. Verifica que los remotos estén configurados correctamente:

```bash
git remote -v
```

Deberías ver algo como esto:

```
origin    https://github.com/tu-usuario/piggsy-ent.git (fetch)
origin    https://github.com/tu-usuario/piggsy-ent.git (push)
upstream  https://github.com/armandodev/piggsy-ent.git (fetch)
upstream  https://github.com/armandodev/piggsy-ent.git (push)
```

---

## ¿Cómo hacer cambios y enviar un pull request?

### 1. Crea una nueva rama para tus cambios

Antes de hacer cambios, crea una nueva rama para mantener tu trabajo organizado:

```bash
git checkout -b nombre-de-tu-rama
```

Reemplaza `nombre-de-tu-rama` con un nombre descriptivo para tu rama de preferencia en inglés.

### 2. Realiza tus cambios

Edita los archivos necesarios y guarda tus cambios.

### 3. Guarda y sube tus cambios

1. Añade los archivos modificados al área de preparación:

```bash
git add .
```

2. Crea un commit con un mensaje descriptivo:

```bash
git commit -m "Descripción de los cambios"
```

3. Sube tu rama a tu fork:

```bash
git push origin nombre-de-tu-rama
```

Este proceso se puede realizar de forma más rápida y fácil de entender utilizando la interfaz gráfica de VSCode.

### 4. Crea un pull request

1. Ve a tu fork en GitHub.
2. Haz clic en el botón **Compare & pull request**.
3. Escribe una descripción clara de los cambios que realizaste.
4. Haz clic en **Create pull request**.

---

## Mantén tu fork actualizado

Para evitar conflictos, asegúrate de mantener tu fork sincronizado con el repositorio principal.

1. Cambia a la rama principal:

```bash
git checkout main
```

2. Descarga los últimos cambios del repositorio principal:

```bash
git fetch upstream
```

3. Fusiona los cambios en tu rama principal:

```bash
git merge upstream/main
```

4. Sube los cambios a tu fork:

```bash
git push origin main
```

---

¡Listo! Ahora estás preparado para colaborar en **Piggsy ENT**. Si tienes dudas, no dudes en preguntar a tus compañeros de equipo.
