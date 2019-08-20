import React, { Component } from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'

class OptionsStep extends Component {
  constructor(props) {
    super(props)

    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onOptionClick({ value }) {
    this.props.triggerNextStep({ value });
  }

  renderOption(option) {
    const { bubbleStyle } = this.props;
    const { bubbleColor, fontColor } = this.props.step;
    const { value, label } = option;

    return (
      <TouchableOpacity key={value} onPress={() => this.onOptionClick({ value })}>
        <View style={bubbleStyle} bubbleColor={bubbleColor}>
          <Text fontColor={fontColor}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { options } = this.props.step

    return (
      <View>
        {_.map(options, this.renderOption)}
      </View>
    )
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
};

export default OptionsStep;
