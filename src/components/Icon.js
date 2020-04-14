import React from 'react';
// import * as Font from 'expo-font';
// import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import {Icon} from 'galio-framework';

// import GalioConfig from '../assets/fonts/galioExtra';

// const GalioExtra = require('../assets/fonts/galioExtra.ttf');
// const IconGalioExtra = createIconSetFromIcoMoon(GalioConfig, 'GalioExtra');

export default class IconExtra extends React.Component {
  state = {
    fontLoaded: true,
  };

  render() {
    const {name, family, ...rest} = this.props;

    if (name && family) {
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}
