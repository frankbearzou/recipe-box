import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {

    this.setState({
      open: false
    });
  };

  editRecipe = () => {
    let name = this.refs.recipeName.getValue();
    let ingredients = this.refs.ingredients.getValue().split('\n');
    console.log('handleClose', name, ingredients);

    let recipe = {
      name: name,
      items: ingredients
    };

    this.props.editRecipe(this.props.recipe.name, recipe);
    this.handleClose();
  };

  render() {
    console.log(this.props.recipe, this.props.recipe.items);
    let items = this.props.recipe.items;
    let style = {margin: 12};
    let content = (
      <div>
        {items ?
          <div>
            <h3>Recipe {this.props.recipe.name}</h3>
            <h4>Ingredients</h4>
            <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.props.deleteRecipe(this.props.recipe.name)} style={style} />
            <RaisedButton label="Edit" primary={true} onTouchTap={this.handleOpen} style={style} />
          </div>
          : null
        }
      </div>
    );


    const actions = [
      <FlatButton
        label="Edit Recipe"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.editRecipe}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <hr/>
        {content}
        <Dialog
          title="Edit Recipe"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          ref={(input) => this.name = input}
        >
          <hr/>
          <TextField
            defaultValue={this.props.recipe.name}
            floatingLabelText="Recipe"
            ref="recipeName"
          /><br />
          <TextField
            defaultValue={items? items.join('\n') : null}
            floatingLabelText="Ingredients"
            multiLine={true}
            rows={2}
            ref="ingredients"
          /><br />
        </Dialog>
      </div>
    );
  }
}

export default Details;
