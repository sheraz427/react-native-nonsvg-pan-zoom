import React, { Component } from 'react';
export default class ResponderElement extends Component {
    constructor() {
        super(...arguments);
        this.releasedNaturally = true;
    }
    render() {
        return (<View x={this.props.x} y={this.props.y} onStartShouldSetResponder={(evt) => true} onMoveShouldSetResponder={(evt) => false} onResponderGrant={(evt) => {
            this.releasedNaturally = true;
            this.props.onClick(evt);
        }} onResponderTerminationRequest={(evt) => {
            if (evt.nativeEvent.touches.length > 1) {
                this.releasedNaturally = false;
                return true;
            }
            this.props.onClickCanceled(evt);
            return false;
        }} onResponderMove={this.props.onDrag} onResponderRelease={(evt) => {
            if (this.releasedNaturally) {
                this.props.onClickRelease(evt);
                this.releasedNaturally = true;
            }
        }}>
        {this.props.children}
      </View>);
    }
}
ResponderElement.defaultProps = {
    onClick: (evt) => { },
    onClickRelease: (evt) => { },
    onClickCanceled: (evt) => { },
    onDrag: (evt) => { }
};
