import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

class AddRecipe extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      recipeName: '',
      ingredients: [],
    };
  }

  handleOpen = () => {
    this.setState({
      editDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      editDialogOpen: false
    });
  };

  handleRecipeChange = (e) => {
    this.setState({
      recipeName: e.target.value
    });
  };

  handleIngredientsChange = (e) => {
    this.setState({
      ingredients: e.target.value.split('\n')
    });
  };

  addRecipe = () => {
    console.log(this.state.recipeName, '---', this.state.ingredients);

    let recipe = {
      name: this.state.recipeName,
      items: this.state.ingredients
    };

    this.props.addRecipe(recipe);
    this.handleClose();
  };

  render() {
    const actions = [
      <FlatButton label='Add Recipe' primary={true} keyboardFocused={true} onTouchTap={this.addRecipe}/>,
      <FlatButton label='Close' primary={true} onTouchTap={this.handleClose}/>
    ];

    return (
      <div>
        <RaisedButton label='Add Recipe' onTouchTap={this.handleOpen}/>
        <Dialog
          title='Add a Recipe'
          actions={actions}
          open={this.state.editDialogOpen}
          onRequestClose={this.handleClose}
        >
          <hr/>
          <TextField
            hintText="Recipe Name"
            floatingLabelText="Recipe"
            onChange={this.handleRecipeChange}
          /><br/>
          <TextField
            hintText="Enter Ingredients, Separated by newlines"
            floatingLabelText="Ingredients"
            multiLine={true}
            rows={2}
            onChange={this.handleIngredientsChange}
          />
        </Dialog>
      </div>
    );
  }
}

export default AddRecipe;