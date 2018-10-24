import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';

// use for later :
import {Button, Table, Label, Comment} from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import ColorContainer from './components/colorContainer'

const NUM_WEEKLY_COLORS = 9;
const ColorsQuery = gql`
  {
    colors {
      id,
      hex,
      date
    }
  }
`

const CreateColor = gql`
  mutation($hex: String!, $date: String!) {
    createColor(hex: $hex, date: $date) {
      id,
      hex,
      date
    }
  }
`

const RemoveColor = gql`
  mutation($id: ID!) {
    removeColor(id: $id)
  }
`

const WeeklyColorsQuery = gql`
  {
    weeklyColors {
      id,
      hex,
      date,
      completed
    }
  }
`

const CreateWeeklyMutation = gql`
  mutation($hex: String!, $date: String!, $completed: Boolean!) {
    createWeeklyColor(hex: $hex, date: $date, completed: $completed) {
      id,
      hex,
      date,
      completed
    }
  }
`

const RemoveWeeklyColor = gql`
  mutation($id: ID!) {
    removeWeeklyColor(id: $id)
  }
`

function generatedRandomHex() {
  return "#" + Math.random().toString(16).slice(2, 8);
}

class App extends Component {

  state = {
    updated: false,
    newColors: []
  }

  createColor = async color => {
    await this.props.createColor({
      variables: {
        hex: color.hex,
        date: color.date
      },
      update: (store, { data: { createColor } }) => {
        // Read the data from our cache for this query
        const data = store.readQuery({ query: ColorsQuery });
        // Add our comment from the mutation to the end
        data.colors.push(createColor);
        // Write our data back to the cache
        store.writeQuery({ query: ColorsQuery, data });
      }
    });
  }

  removeColor = async color => {
    await this.props.removeColor({
      variables: {
        id: color.id
      },
      update: store => {
        // Read the data from our cache for this query
        const data = store.readQuery({ query: ColorsQuery });
        // Add our comment from the mutation to the end
        data.colors = data.colors.filter(x => x.id !== color.id);
        // Write our data back to the cache
        store.writeQuery({ query: ColorsQuery, data });
      }
    });
  }

  createWeeklyColor = async color => {
    await this.props.createWeeklyColor({
      variables: {
        hex: color.hex,
        date: color.date,
        completed: color.completed
      },
      update: (store, { data: { createWeeklyColor } }) => {
        // Read the data from our cache for this query
        const data = store.readQuery({ query: WeeklyColorsQuery });
        // Add our comment from the mutation to the end
        data.weeklyColors.push(createWeeklyColor);
        // Write our data back to the cache
        store.writeQuery({ query: WeeklyColorsQuery, data });
      }
    });
  }

  removeWeeklyColor = async color => {
    await this.props.removeWeeklyColor({
      variables: {
        id: color.id
      },
      update: store => {
        // Read the data from our cache for this query
        const data = store.readQuery({ query: WeeklyColorsQuery });
        // Add our comment from the mutation to the end
        data.weeklyColors = data.weeklyColors.filter(x => x.id !== color.id);
        // Write our data back to the cache
        store.writeQuery({ query: WeeklyColorsQuery, data });
      }
    });
  }

  // testWeeklyColors(currentWeeklyColors) {
  //   if (!this.state.updated) {
  //     var oldDate = moment(currentWeeklyColors[0].date, 'MM/DD/YYYY');
  //     var today = moment();
  //     if (today.diff(oldDate, 'days') < 7) {
  //       var newWeeklyColors = [];
  //       for (var i = 0; i < NUM_WEEKLY_COLORS; i++) {
  //         newWeeklyColors.push({id: Math.random().toString(16).slice(2,8), hex: generatedRandomHex(), date: today.format("MM/DD/YYYY"), completed: false});
  //       }
  //       this.setState({newColors: newWeeklyColors});
  //     }
  //     this.setState({updated: true});
  //   }
  // }

  render() {
    // default props by graphql react apollo
    // console.log(this.props);
    const { data: { loading, colors, weeklyColors }} = this.props;
    if (loading) {
      return (
        <div className="App">
          loading
        </div>
      );
    } else {
      return (
        <div>
          <ColorContainer
              weeklyColors={weeklyColors}
              colors={colors} />
        </div>
      );
    }
  }
}

// binds it to app (this.props)
export default compose(
  graphql(ColorsQuery),
  graphql(WeeklyColorsQuery),
  graphql(CreateColor, { name: 'createColor' }),
  graphql(RemoveColor, { name: 'removeColor' }),
  graphql(CreateWeeklyMutation, { name: 'createWeeklyColor' }),
  graphql(RemoveWeeklyColor, { name: 'removeWeeklyColor' })
)(App);
