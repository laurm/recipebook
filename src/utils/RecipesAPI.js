import { mockedRecipesRes } from "./MockedAPI.js";

const requestHeaders = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  // "Content-Type": "application/json",
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPIKEY,
  "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPIHOST,
};

export const getRecipes = async function () {
  const url = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=40";
  const response = await fetch(url, {
    method: "GET",
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: requestHeaders,
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response && response.ok) {
    console.log("[getRecipes] API Results");
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
    console.log("[getRecipes] MOCKED API Results");
    return mockedRecipesRes;
  }
};

export const getRecipesTags = async function () {
  const url = "https://tasty.p.rapidapi.com/tags/list";
  const response = await fetch(url, {
    method: "GET",
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: requestHeaders,
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

export const getRecipesBySearchInput = async function (searchInput) {
  const url =
    "https://tasty.p.rapidapi.com/recipes/auto-complete?" +
    new URLSearchParams({
      prefix: searchInput,
    });
  const response = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

export const getRecipeDetailsById = async function (recipeId) {
  // return mockedRecipeDetailsObj;
  const url =
    "https://tasty.p.rapidapi.com/recipes/get-more-info?" +
    new URLSearchParams({
      id: recipeId,
    });
  const response = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
  });
  if (response && response.ok) {
    console.log("[getRecipeDetailsById] API Results");
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
    console.log("[getRecipeDetailsById] MOCKED API Results");
    const allRecipes = await getRecipes();
    const recipeDetails = allRecipes?.results.find((recipe) => {
      return recipe.id === recipeId;
    });
    return recipeDetails;
  }
};

const mockedRecipeDetailsObj = {
  buzz_id: null,
  yields: "Servings: 24",
  promotion: "partial",
  seo_title: "Blueberry Cream Muffins Recipe | Tasty",
  tags: [
    {
      name: "vegetarian",
      display_name: "Vegetarian",
      type: "dietary",
      root_tag_type: "dietary",
      id: 64469,
    },
    {
      id: 64471,
      name: "easy",
      display_name: "Easy",
      type: "difficulty",
      root_tag_type: "difficulty",
    },
    {
      id: 64472,
      name: "under_30_minutes",
      display_name: "Under 30 Minutes",
      type: "difficulty",
      root_tag_type: "difficulty",
    },
    {
      id: 64483,
      name: "breakfast",
      display_name: "Breakfast",
      type: "meal",
      root_tag_type: "meal",
    },
    {
      id: 64485,
      name: "desserts",
      display_name: "Desserts",
      type: "meal",
      root_tag_type: "meal",
    },
    {
      id: 64488,
      name: "kid_friendly",
      display_name: "Kid-Friendly",
      type: "cooking_style",
      root_tag_type: "cooking_style",
    },
    {
      root_tag_type: "appliance",
      id: 64492,
      name: "baking",
      display_name: "Baking",
      type: "appliance",
    },
    {
      id: 65851,
      name: "big_batch",
      display_name: "Big Batch",
      type: "cooking_style",
      root_tag_type: "cooking_style",
    },
    {
      type: "appliance",
      root_tag_type: "appliance",
      id: 65857,
      name: "bakery_goods",
      display_name: "Bakery Goods",
    },
    {
      display_name: "Cupcakes",
      type: "cakes",
      root_tag_type: "meal",
      id: 9299686,
      name: "cupcakes",
    },
  ],
  servings_noun_plural: "servings",
  video_id: null,
  video_url: null,
  brand: null,
  sections: [
    {
      components: [
        {
          position: 1,
          measurements: [
            {
              unit: {
                name: "",
                abbreviation: "",
                display_singular: "",
                display_plural: "",
                system: "none",
              },
              id: 652620,
              quantity: "4",
            },
          ],
          ingredient: {
            created_at: 1493314622,
            updated_at: 1509035288,
            id: 19,
            name: "egg",
            display_singular: "egg",
            display_plural: "eggs",
          },
          id: 63062,
          raw_text: "4 eggs",
          extra_comment: "",
        },
        {
          extra_comment: "",
          position: 2,
          measurements: [
            {
              id: 652619,
              quantity: "2",
              unit: {
                display_singular: "cup",
                display_plural: "cups",
                system: "imperial",
                name: "cup",
                abbreviation: "c",
              },
            },
            {
              id: 652618,
              quantity: "400",
              unit: {
                system: "metric",
                name: "gram",
                abbreviation: "g",
                display_singular: "g",
                display_plural: "g",
              },
            },
          ],
          ingredient: {
            id: 419,
            name: "granulated sugar",
            display_singular: "granulated sugar",
            display_plural: "granulated sugars",
            created_at: 1494989637,
            updated_at: 1509035262,
          },
          id: 63063,
          raw_text: "2 cups granulated sugar",
        },
        {
          extra_comment: "",
          position: 3,
          measurements: [
            {
              id: 652624,
              quantity: "240",
              unit: {
                system: "metric",
                name: "milliliter",
                abbreviation: "mL",
                display_singular: "mL",
                display_plural: "mL",
              },
            },
            {
              id: 652622,
              quantity: "1",
              unit: {
                system: "imperial",
                name: "cup",
                abbreviation: "c",
                display_singular: "cup",
                display_plural: "cups",
              },
            },
          ],
          ingredient: {
            id: 20,
            name: "vegetable oil",
            display_singular: "vegetable oil",
            display_plural: "vegetable oils",
            created_at: 1493314628,
            updated_at: 1509035288,
          },
          id: 63064,
          raw_text: "1 cup vegetable oil",
        },
        {
          raw_text: "1 teaspoon vanilla extract",
          extra_comment: "",
          position: 4,
          measurements: [
            {
              id: 652621,
              quantity: "1",
              unit: {
                name: "teaspoon",
                abbreviation: "tsp",
                display_singular: "teaspoon",
                display_plural: "teaspoons",
                system: "imperial",
              },
            },
          ],
          ingredient: {
            id: 103,
            name: "vanilla extract",
            display_singular: "vanilla extract",
            display_plural: "vanilla extracts",
            created_at: 1493745620,
            updated_at: 1509035284,
          },
          id: 63065,
        },
        {
          id: 63066,
          raw_text: "4 cups flour",
          extra_comment: "",
          position: 5,
          measurements: [
            {
              quantity: "500",
              unit: {
                system: "metric",
                name: "gram",
                abbreviation: "g",
                display_singular: "g",
                display_plural: "g",
              },
              id: 652629,
            },
            {
              id: 652628,
              quantity: "4",
              unit: {
                name: "cup",
                abbreviation: "c",
                display_singular: "cup",
                display_plural: "cups",
                system: "imperial",
              },
            },
          ],
          ingredient: {
            name: "flour",
            display_singular: "flour",
            display_plural: "flours",
            created_at: 1493314654,
            updated_at: 1509035288,
            id: 25,
          },
        },
        {
          position: 6,
          measurements: [
            {
              id: 652623,
              quantity: "1",
              unit: {
                name: "teaspoon",
                abbreviation: "tsp",
                display_singular: "teaspoon",
                display_plural: "teaspoons",
                system: "imperial",
              },
            },
          ],
          ingredient: {
            updated_at: 1509035276,
            id: 247,
            name: "baking soda",
            display_singular: "baking soda",
            display_plural: "baking sodas",
            created_at: 1494297371,
          },
          id: 63067,
          raw_text: "1 teaspoon baking soda",
          extra_comment: "",
        },
        {
          id: 63068,
          raw_text: "2 teaspoons baking powder",
          extra_comment: "",
          position: 7,
          measurements: [
            {
              unit: {
                name: "teaspoon",
                abbreviation: "tsp",
                display_singular: "teaspoon",
                display_plural: "teaspoons",
                system: "imperial",
              },
              id: 652625,
              quantity: "2",
            },
          ],
          ingredient: {
            display_singular: "baking powder",
            display_plural: "baking powders",
            created_at: 1493314647,
            updated_at: 1509035288,
            id: 23,
            name: "baking powder",
          },
        },
        {
          position: 8,
          measurements: [
            {
              id: 652631,
              quantity: "490",
              unit: {
                display_plural: "g",
                system: "metric",
                name: "gram",
                abbreviation: "g",
                display_singular: "g",
              },
            },
            {
              id: 652630,
              quantity: "2",
              unit: {
                name: "cup",
                abbreviation: "c",
                display_singular: "cup",
                display_plural: "cups",
                system: "imperial",
              },
            },
          ],
          ingredient: {
            id: 496,
            name: "sour cream",
            display_singular: "sour cream",
            display_plural: "sour creams",
            created_at: 1495154479,
            updated_at: 1509035256,
          },
          id: 63069,
          raw_text: "2 cups (16oz) sour cream",
          extra_comment: "",
        },
        {
          raw_text: "2 cups blueberries",
          extra_comment: "",
          position: 9,
          measurements: [
            {
              id: 652627,
              quantity: "200",
              unit: {
                display_plural: "g",
                system: "metric",
                name: "gram",
                abbreviation: "g",
                display_singular: "g",
              },
            },
            {
              id: 652626,
              quantity: "2",
              unit: {
                name: "cup",
                abbreviation: "c",
                display_singular: "cup",
                display_plural: "cups",
                system: "imperial",
              },
            },
          ],
          ingredient: {
            display_singular: "blueberry",
            display_plural: "blueberries",
            created_at: 1494983257,
            updated_at: 1509035263,
            id: 400,
            name: "blueberry",
          },
          id: 63070,
        },
      ],
      name: null,
      position: 1,
    },
  ],
  language: "eng",
  num_servings: 24,
  video_ad_content: null,
  topics: [
    {
      name: "Baked Goods",
      slug: "baked-goods",
    },
    {
      name: "Best Vegetarian",
      slug: "best-vegetarian",
    },
    {
      name: "Community Recipes",
      slug: "community",
    },
    {
      name: "Kid Friendly",
      slug: "kid-friendly",
    },
    {
      name: "Breakfast",
      slug: "breakfast",
    },
    {
      name: "Desserts",
      slug: "desserts",
    },
  ],
  description: "",
  slug: "blueberry-cream-muffins",
  created_at: 1574456610,
  thumbnail_alt_text: "",
  id: 5814,
  updated_at: 1628114400,
  aspect_ratio: "16:9",
  cook_time_minutes: null,
  keywords: "",
  instructions: [
    {
      id: 52137,
      display_text:
        "In a mixing bowl, beat eggs. Gradually add sugar. While beating slowly pour in oil. Add vanilla.",
      position: 1,
      start_time: 0,
      end_time: 0,
      temperature: null,
      appliance: null,
    },
    {
      display_text: "Combine the dry ingredients.",
      position: 2,
      start_time: 0,
      end_time: 0,
      temperature: null,
      appliance: null,
      id: 52138,
    },
    {
      start_time: 0,
      end_time: 0,
      temperature: null,
      appliance: null,
      id: 52139,
      display_text:
        "Add dry ingredients alternately with sour cream to the egg mixture.",
      position: 3,
    },
    {
      position: 4,
      start_time: 0,
      end_time: 0,
      temperature: null,
      appliance: null,
      id: 52140,
      display_text: "Gently add blueberries.",
    },
    {
      display_text: "Spoon into the greased muffin tin or paper liners",
      position: 5,
      start_time: 0,
      end_time: 0,
      temperature: null,
      appliance: null,
      id: 52141,
    },
    {
      appliance: "oven",
      id: 52142,
      display_text: "Bake at 400°F (200°C) for 20 minutes.",
      position: 6,
      start_time: 0,
      end_time: 0,
      temperature: 400,
    },
    {
      end_time: 0,
      temperature: null,
      appliance: null,
      id: 52697,
      display_text: "Enjoy!",
      position: 7,
      start_time: 0,
    },
  ],
  approved_at: 1574872807,
  inspired_by_url: null,
  prep_time_minutes: null,
  facebook_posts: [],
  price: {
    consumption_total: 300,
    consumption_portion: 0,
    updated_at: "2024-01-10T06:18:07+01:00",
    total: 1300,
    portion: 50,
  },
  country: "US",
  is_one_top: false,
  total_time_tier: {
    tier: "under_30_minutes",
    display_tier: "Under 30 minutes",
  },
  original_video_url: null,
  canonical_id: "recipe:5814",
  show: {
    id: 17,
    name: "Tasty",
  },
  nutrition: {
    calories: 264,
    carbohydrates: 32,
    fat: 13,
    protein: 4,
    sugar: 13,
    fiber: 0,
    updated_at: "2023-08-11T08:05:49+02:00",
  },
  is_app_only: false,
  is_subscriber_content: false,
  servings_noun_singular: "serving",
  total_time_minutes: null,
  nutrition_visibility: "auto",
  beauty_url: null,
  draft_status: "published",
  name: "Blueberry Cream Muffins",
  show_id: 17,
  tips_and_ratings_enabled: true,
  user_ratings: {
    count_positive: 149,
    count_negative: 7,
    score: 0.955128,
  },
  renditions: [],
  compilations: [],
  brand_id: null,
  is_shoppable: true,
  seo_path: "9295813,64485,9299665,9299686",
  thumbnail_url:
    "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/4e9524578f544c888af761e10630593b.jpeg",
  credits: [
    {
      name: "Kaleb Mayer",
      type: "community",
    },
  ],
};
