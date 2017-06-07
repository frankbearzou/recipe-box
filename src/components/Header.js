import React from 'react';

const Header = (props) => {
  // console.log('Header', props.recipes);

  return (
    <div>
      <h2>Recipes</h2>
      <div className="list-group">
        {

          props.recipes.map((recipe) =>
            <a className="list-group-item list-group-item-success"
               href="#"
               key={recipe.name}
               onClick={() => props.handleClick(recipe.name)}>
              {recipe.name}
            </a>
          )
        }
      </div>
    </div>
  );
};

export default Header;