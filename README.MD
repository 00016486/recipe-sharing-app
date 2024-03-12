# Recipe Sharing Platform

## About the App

The Recipe Sharing Platform is a live web application that provides the users with different recipes followed over the world. Users may add the created recipe by themselves at any time and view the detailed preparation instructions, as well as edit or delete the added recipe.

## Getting Started

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- npm (comes installed with Node.js)

### Installing

1. **Clone the repository:**

```bash
git clone
```

2. **Navigate to the project directory:**

```bash
cd recipe-sharing-platform
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the server:**

```bash
npm app.js
```

### Application Dependencies

**express**: The web framework for Node.js.
**pug:** A high-performance template engine heavily influenced by Haml.
**multer:** A middleware for handling multipart/form-data, used for uploading files.
**method-override:** Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

### Project Structure

**/public** - Contains static files like images, CSS, and JavaScript.
**/css**- CSS files for styling.
**/images** - Image files.
**/uploads** - Storage for uploaded image files.
**/views**- Pug templates for the application views.
**app.js** - The main application file setting up the server and routes.
**package.json** - Project metadata and dependencies.
