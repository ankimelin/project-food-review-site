apiKey = "664adcf722923dd23e1c9e19a45a0b9a"
apiUrl = "https://developers.zomato.com/api/v2.1/search?entity_id=61&cuisines=128"

const restaurantListElement = document.getElementById("restaurantList")
const titleElement = document.getElementById("title")
const sortButtonElement = document.getElementById("sortButton")
const filterButtonElement = document.getElementById("filterButton")

fetch(apiUrl, { headers: { "user-key": apiKey } })
  .then(response => response.json())
  .then(json => {
    const myRestaurants = json.restaurants.map(item => {
      name = item.restaurant.name
      cost = item.restaurant.average_cost_for_two
      if (cost < 50) {
        dollar = '$'
      } else if (cost < 100) {
        dollar = '$$'
      } else {
        dollar = '$$$'
      }
      rating = item.restaurant.user_rating.aggregate_rating
      if (item.restaurant.featured_image) {
        photo = item.restaurant.featured_image
      } else {
        photo = `https://images.unsplash.com/photo-1564869733874-7c154d5de210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60`
      }
      return { name, dollar, rating, photo }
    })

    const displayRestaurants = restaurants => {
      restaurantListElement.innerHTML = ""
      restaurants.forEach(restaurant => {
        restaurantListElement.innerHTML += generateHTML(restaurant)
      })

    }
    displayRestaurants(myRestaurants)

    const sortRestaurants = () => {
      displayRestaurants(myRestaurants.sort(function (a, b) { return b.rating - a.rating }))
    }
    sortButtonElement.addEventListener("click", sortRestaurants)

    const filterRestaurants = () => {
      displayRestaurants(myRestaurants.filter(function check(item) { return item.dollar === "$" }))
    }
    filterButtonElement.addEventListener("click", filterRestaurants)

    const resetRestaurants = () => {
      displayRestaurants(myRestaurants)
    }
    titleElement.addEventListener("click", resetRestaurants)
  })

const generateHTML = restaurant => {
  let restaurantHTML = ""
  restaurantHTML += `<li class="restaurant">`
  restaurantHTML += `<img src=${restaurant.photo}>`
  restaurantHTML += `<h3>${restaurant.name}</h3>`
  restaurantHTML += `<div class="restaurant-footer">`
  restaurantHTML += `<p>${restaurant.dollar}</p>`
  restaurantHTML += `<p><span>&#11088;</span>${restaurant.rating}</p>`
  restaurantHTML += `</div>`
  restaurantHTML += `</li>`
  return restaurantHTML
}



