import React from 'react';
import { Icon } from 'galio-framework';


class IconExtra extends React.Component {

  render() {
    const { name, family, ...rest } = this.props;
    
    if (name && family) {
      return <Icon name={'pin-3'} family={'Galio'} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
