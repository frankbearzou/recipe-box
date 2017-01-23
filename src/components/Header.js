import React from 'react';

const Header = (props) => {
  // console.log('Header', props.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {

          props.recipes.map((recipe) =>
            <li key={recipe.name}>
              <a onClick={() => props.handleClick(recipe.name)}>{recipe.name}</a>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default Header;