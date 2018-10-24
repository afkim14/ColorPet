import React, {Component} from 'react';
import moment from 'moment';
import {Button, Comment, Header, Form, Checkbox, Menu} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import ImageUploader from 'react-images-upload';

import HomeColorsTable from './homeColorsTable'
import SavedColorsTable from './savedColorsTable'

class ColorContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
          activePage: 'Home'
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activePage: name })

    onImageSubmit = () => {

    }

    render() {
      const { activePage } = this.state
      if (this.state.activePage == 'Home') {
        return (
          <div>
            <Menu secondary style={{display: 'flex'}}>
              <Menu.Item name='Home' active={activePage === 'Home'} onClick={this.handleItemClick} />
              <Menu.Item name='Pet' active={activePage === 'Pet'} onClick={this.handleItemClick}/>
            </Menu>
            <HomeColorsTable
                  colors={this.props.colors}
                  weeklyColors={this.props.weeklyColors}/>
            <ImageUploader
                  withIcon={true}
                  buttonText='Submit Image'
                  onChange={this.onImageSubmit}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
              />
          </div>
        );
      } else if (this.state.activePage == 'Pet') {
        return (
          <div>
            <Menu secondary style={{display: 'flex'}}>
              <Menu.Item name='Home' active={activePage === 'Home'} onClick={this.handleItemClick} />
              <Menu.Item name='Pet' active={activePage === 'Pet'} onClick={this.handleItemClick}/>
            </Menu>
            <SavedColorsTable colors={this.props.colors}/>
          </div>
        );
      }
    }
}

export default ColorContainer;
