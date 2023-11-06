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
          // Iterate through the properties of the object
          const items = getItemsFromObject(superhero);
          console.log(items);
          
          // alert(response);
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
          return data;
        } else {
          const data = await response.text();
          console.log("text: ",typeof data);
          return data;
        }
      } else {
        throw new Error("Failed to fetch PHP page");
      }
    } catch (error) {
      throw error;
    }
  }
  
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
  
  function renderItems(items) {
    const table = document.getElementById("table");
    table.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.alias}</td>
        <td>${item.biography}</td>
      `;
      table.appendChild(row);
    });
  }
}
