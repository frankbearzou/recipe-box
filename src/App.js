import React from 'react';
require('react-tap-event-plugin')();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header';
import AddRecipe from './components/AddRecipe';
import Details from './components/Details';

const recipes_key = '_frank_recipes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      current_recipe: {}
    };

  }

  componentWillMount() {
    this.setState({
      recipes: this.getRecipes(),
    });
  }

  getInitRecipes = () => {
    localStorage.removeItem(recipes_key);
    let recipes = [
      {
        name: 'Pumpkin Pie',
        items: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']
      },
      {
        name: 'Spaghetti',
        items: ['Noddles', 'Tomato Sauce', '(Optional) Meatballs']
      },
      {
        name: 'Onion Pie',
        items: ['Onion', 'Pie Crust', 'Sounds Yummy right?']
      }];
    localStorage.setItem(recipes_key, JSON.stringify(recipes));
    return recipes;
  };

  /**
   * get recipes from local storage
   */
  getRecipes = () => {
    let key = JSON.parse(localStorage.getItem(recipes_key));
    if (key === null) {
      key = this.getInitRecipes();
    }
    return key;
  };

  /**
   * sync recipe from state to local storage
   */
  syncRecipes = () => {
    localStorage.clear();
    console.log('sync', this.state.recipes);
    localStorage.setItem(recipes_key, JSON.stringify(this.state.recipes));
  };

  /**
   * show details of the clicked recipe
   * @param recipeName
   */
  handleHeaderClick = (recipeName) => {
    console.log(recipeName);
    let cur = this.state.recipes.filter(recipe => recipe.name === recipeName)[0];

    if (this.state.current_recipe.name !== cur.name) {
      this.setState({
        current_recipe: cur
      });
    } else {
      this.setState({
        current_recipe: {}
      });
    }

  };

  addRecipe = (newRecipe) => {
    // TODO: add adding restrictions here
    let recipes = this.state.recipes;
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].name === newRecipe.name)
        return;
    }

    if (newRecipe && newRecipe.name) {
      this.setState({
        recipes: [...this.state.recipes, newRecipe]
      }, this.syncRecipes);
    }

  };

  deleteRecipe = (recipeName) => {
    let recipes = this.state.recipes;
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].name === recipeName) {
        recipes.splice(i, 1);
        break;
      }
    }

    this.setState({
      recipes: recipes,
      current_recipe: {}
    }, this.syncRecipes);
  };

  /**
   * edit recipe
   * @param oldRecipeName the recipe to be changed
   * @param newRecipe new recipe object {item: '', items: []}
   */
  editRecipe = (oldRecipeName, newRecipe) => {
    console.log('oldRecipeName:', oldRecipeName, 'newRecipe:', newRecipe);

    let recipes = this.state.recipes;

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].name === oldRecipeName) {
        recipes.splice(i, 1, newRecipe);
        break;
      }
    }

    this.setState({
      recipes: recipes,
      current_recipe: {}
    }, this.syncRecipes);
  };

  render() {
    console.log(this.state.recipes);

    return (
      <MuiThemeProvider>
        <div className="container">
          <Header recipes={this.state.recipes} handleClick={this.handleHeaderClick}/>
          <AddRecipe addRecipe={this.addRecipe}/>
          <Details recipe={this.state.current_recipe} deleteRecipe={this.deleteRecipe} editRecipe={this.editRecipe}/>
        </div>
      </MuiThemeProvider>
    );
  }

}



export default App;
