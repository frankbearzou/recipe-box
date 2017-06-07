import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editDialogOpen: false,
      deleteDialogOpen: false
    };
  }

  /**
   * edit recipe
   */
  handleOpenEditDialog = () => {
    this.setState({
      editDialogOpen: true
    });
  };

  handleEditDialogClose = () => {
    this.setState({
      editDialogOpen: false
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
    this.handleEditDialogClose();
  };

  /**
   * delete recipe
   */
  handleOpenDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: true
    });
  };

  handleDeleteDialogClose = () => {
    this.setState({
      deleteDialogOpen: false
    });
  };

  handleDeleteRecipe = () => {
    this.props.deleteRecipe(this.props.recipe.name);
  };


  render() {
    console.log(this.props.recipe, this.props.recipe.items);
    let items = this.props.recipe.items;
    let style = {margin: 12};
    let content = (
      <div>
        {items ?
          <div className="panel-group">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h4>Ingredients</h4>
                <h3>Recipe {this.props.recipe.name}</h3>
              </div>
              <div className="panel-body">
                <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            </div>



            <RaisedButton label="Delete" secondary={true} onTouchTap={this.handleOpenDeleteDialog} style={style} />
            <RaisedButton label="Edit" primary={true} onTouchTap={this.handleOpenEditDialog} style={style} />
          </div>
          : null
        }
      </div>
    );


    const editActions = [
      <FlatButton
        label="Edit Recipe"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.editRecipe}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleEditDialogClose}
      />,
    ];

    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDeleteDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={() => {
          this.handleDeleteRecipe();
          this.handleDeleteDialogClose();
          }
        }
      />,
    ];

    return (
      <div>
        <hr/>
        {content}
        <Dialog
          title="Edit Recipe"
          actions={editActions}
          modal={false}
          open={this.state.editDialogOpen}
          onRequestClose={this.handleEditDialogClose}
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

        <Dialog
          actions={deleteActions}
          modal={false}
          open={this.state.deleteDialogOpen}
          onRequestClose={this.handleDeleteDialogClose}
        >
          Delete Recipe {this.props.recipe.name}?
        </Dialog>
      </div>
    );
  }
}

export default Details;
