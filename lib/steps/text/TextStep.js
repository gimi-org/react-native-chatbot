import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import Loading from '../common/Loading'

class TextStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }

    this.renderMessage = this.renderMessage.bind(this)
  }

  componentDidMount() {
    const { step } = this.props
    const { component, delay, waitAction } = step
    const isComponentWatingUser = component && waitAction
    setTimeout(() => {
      // this.props.triggerNextStep();
      this.setState({ loading: false })
      if (!isComponentWatingUser) {
        this.props.triggerNextStep()
      }
    }, delay)
  }

  renderMessage() {
    const { previousValue, step } = this.props
    const { component } = step
    const { message } = step

    if (component) {
      const { steps, previousStep, triggerNextStep } = this.props
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep
      })
    }

    if (message) return message.replace(/{previousValue}/g, previousValue)
    return message
  }

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
      hideUserAvatar
    } = this.props
    const {
      avatar,
      bubbleColor,
      fontColor,
      user
    } = step

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar

    return (
      <View>
        {
          isFirst && showAvatar &&
          <View>
            <Image style={avatarStyle} source={{ uri: avatar }} />
          </View>
        }
        <View style={bubbleStyle}>
          { this.state.loading && <Loading color={fontColor} /> }
          {
            !this.state.loading &&
            <Text>
              {this.renderMessage()}
            </Text>
          }
        </View>
      </View>
    )
  }
}

TextStep.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  avatarStyle: PropTypes.object.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.object,
  previousValue: PropTypes.any,
  steps: PropTypes.object
}

TextStep.defaultProps = {
  previousStep: {},
  steps: {},
  previousValue: ''
}

export default TextStep
