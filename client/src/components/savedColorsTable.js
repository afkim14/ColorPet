import React, {Component} from 'react';

import moment from 'moment';
import {Button, Comment, Header, Label, Menu} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';

var colorBlockStyle = {
  float: 'left',
  margin: '5px',
};

class SavedColorsTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: "auto", width: 260 }}>
              <Header as='h1' style={{textAlign: 'center'}}>My Pet Colors</Header>
              {this.props.colors.map(color =>
                <div key={`${color.id}-place-item`} style={colorBlockStyle}>
                  <div style={{height: '75px', width: '75px', backgroundColor: `${ color.hex }`, textAlign: 'center', borderRadius: '10px'}}></div>
                  <Label style={{marginTop: '5px'}} size='medium'>{color.hex}</Label>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
}

export default SavedColorsTable;
