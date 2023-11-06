window.onload = function () {
    const form = document.getElementById("form");
    const searchButton = document.getElementById("search-button");
    const result = document.getElementById("result");
    // get the search input value
    let searchInput = form.elements["search-input"];

    const url = "superheroes.php";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("search button clicked");
      console.log("value: ",searchInput.value);

        try {
          const superhero = await searchSuperhero();
          console.log(superhero);
          // Iterate through the properties of the object
          if (superhero.type === "json") {
            const items = getItemsFromObject(superhero.data);
            // console.log(items);
            renderHero(items);
            // console.log(items);
          } else {

            renderHeroList(superhero.data)
          }
        } catch (error) {
          console.error(error);
        }
    })

  //send a query to the superheroes.php file for a superhero name
  async function searchSuperhero() {
    try {
      const response = await fetch(url + "?name=" + searchInput.value);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("json: ",typeof data);
          return {"data":data, "type":"json" };
        } else {
          const data = await response.text();
          console.log("text: ",typeof data);
          return {"data":data, "type":"string" };
        }
      } else {
        throw new Error("Failed to fetch PHP page");
      }
    } catch (error) {
      throw error;
    }
  }
  
  // This function returns all the items from the object
  function getItemsFromObject(object) {
    const items = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const item = object[key];
        items.push({
          id: item.id,
          name: item.name,
          alias: item.alias,
          biography: item.biography,
        });
      }
    }
    return items;
  }
  

  // This function renders items provided
  function renderHero(items) {

    if (items.length === 0) {
      result.innerHTML = '<h2>Superhero not found</h2>'
      return;
    }

    else if (items.length > 0) {
      items.forEach((item) => {

        result.innerHTML = `
        <h3>${item.name}</h3>
        <h4>A.K.A. ${item.alias}</h4>
        <p>${item.biography}</p>
        `;
    });
  } 
  }

  function renderHeroList(list){
    return result.innerHTML = list
  }

}
