const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ),
});
const upload = multer({ storage: storage });

// Pug as the view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static files served from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Recipes data store (in-memory)
let recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.",
    img: "/images/spaghetti.jpeg",
  },
  {
    id: 2,
    title: "Plov",
    description:
      "Plov is the symbol of Uzbek food. It is prepared in every Uzbekistan family, whether Uzbek, Russian, Tatar of Korean. Uzbek plov is the part of mentality of Uzbekistan people. Traditionally plov is cooked by men.",
    img: "/images/plov.jpeg",
  },
  {
    id: 3,
    title: "Norin",
    description:
      "Norin is a very popular dish in Uzbekistan. Norin is a combination of thinly-sliced home-made noodles, aged meat (previously marinated and dried) and herbs. Of all regions in Uzbekistan, Norin is widely available in Tashkent, the capital of the country.",
    img: "/images/norin.jpeg",
  },
];

// Routes
app.get("/", (req, res) => res.render("index"));

app.get("/recipes", (req, res) => res.render("recipes", { recipes }));

app.get("/share", (req, res) => res.render("share"));

app.post("/recipe/create", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const img = req.file
    ? `/uploads/${req.file.filename}`
    : "/images/default.png";

  const newRecipe = { id: recipes.length + 1, title, description, img };
  recipes.push(newRecipe);
  res.redirect("/recipes");
});

app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id.toString() === req.params.id);
  if (!recipe) {
    return res.status(404).send("Recipe not found.");
  }
  res.render("details", { recipe });
});

app.post("/recipes/remove/:id", (req, res) => {
  const { id } = req.params;
  recipes = recipes.filter((recipe) => recipe.id.toString() !== id);
  res.redirect("/recipes");
});

app.get("/recipes/edit/:id", (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) {
    return res.status(404).send("Recipe not found.");
  }

  res.render("edit-recipe", { recipe });
});

app.post("/recipes/update/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null; // Only update image if a new one is provided

  const recipeIndex = recipes.findIndex((r) => r.id.toString() === id);
  if (recipeIndex !== -1) {
    recipes[recipeIndex].title = title;
    recipes[recipeIndex].description = description;
    if (img) {
      recipes[recipeIndex].img = img;
    }
  }

  res.redirect(`/recipes/${id}`);
});

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
