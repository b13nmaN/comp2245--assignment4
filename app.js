window.onload = function () {
    const searchButton = document.getElementById("search");
    const url = "superheroes.php";
  
    searchButton.addEventListener("click", async () => {
      console.log("search button clicked");
      
      try {
        const response = await fetchData();
        alert(response);
      } catch (error) {
        console.error(error);
      }
    });
  
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.text();
          return data; 
        } else {
          throw new Error("Failed to fetch PHP page");
        }
      } catch (error) {
        throw error;
      }
    }
  };
