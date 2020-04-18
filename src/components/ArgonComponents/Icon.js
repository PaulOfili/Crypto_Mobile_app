import React from 'react';
import { Icon } from 'galio-framework';


class IconExtra extends React.Component {

  render() {
    const { name, family, ...rest } = this.props;
    
    if (name && family) {
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
