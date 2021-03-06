// const content = document.querySelector('#content')

function food(event) {
    resetContent()
    // event target here is just the <a> tag
    let target = event.target
    target.classList.add('active')
    // code here
    console.log('food')
    retrieveData()
}


function retrieveData() {
    axios({
        "method":"GET",
        "url":"https://tasty.p.rapidapi.com/recipes/list",
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"tasty.p.rapidapi.com",
            "x-rapidapi-key":"f4b5d309dbmshfc13cb7f654eb23p181331jsn4e6745a2178c",
            "useQueryString":true
        },"params":{
            "tags":"comfort_food",
            "from": "1",
            "sizes": "2"
        }
    })
    .then((response)=>{
        var recipeDisplay = []
        var recipes = ''
        var foodResults = response.data.results
        console.log(foodResults)
        let foodDiv = document.createElement('div')
        content.appendChild(foodDiv)
        foodResults.forEach(recipe => {
            if(recipe.name && recipe.description && recipe.num_servings && recipe.original_video_url) { 
                recipeDisplay.push(recipe)
            }                
        })
        recipeDisplay.forEach((recipe, index) => {
            var ingredients = recipe.sections[0].components
            var instructions = recipe.instructions
            console.log(instructions)
            let nameTemplate = `
                <section>
                    <h3>${recipe.name}</h3> 
                    <video width="320" height="240" controls>
                    <source src="${recipe.original_video_url}">
                    </video>
                        <p>${recipe.description}</p>
                    <ul class="recipe-list">
                        ${ingredients.map(ing => `<li>${ing.raw_text}</li>`).join('') }    
                    </ul>
                    <ol class="description-list">
                    ${instructions.map(ins => `<li>${ins.display_text}</li>`).join('') } 
                    </ol>
                    <p>${recipe.num_servings}</p>
                </section>`
            recipes += nameTemplate
        })
    foodDiv.innerHTML = recipes
    }) 
}


