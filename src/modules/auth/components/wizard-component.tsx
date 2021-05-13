import { StylesProvider } from "@material-ui/styles";
import React, { PureComponent } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AppButton from "../../common/components/button.component";

class Step extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, bottom: 25 }}>
        {this.props.children}
        <AppButton
          title="Prev"
          disabled={this.props.currentIndex === 0}
          onPress={this.props.prevStep}
        />
        <AppButton
          title="Next"
          disabled={this.props.isLast}
          onPress={this.props.nextStep}
          style={styles.button}
        />
      </View>
    );
  }
}

class Wizard extends PureComponent {
  static Step = (props) => <Step {...props} />;

  state = {
    index: 0,
  };

  _nextStep = () => {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
      }));
    }
  };

  _prevStep = () => {
    if (this.state.index !== 0) {
      this.setState((prevState) => ({
        index: prevState.index - 1,
      }));
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.map(this.props.children, (el, index) => {
          if (index === this.state.index) {
            return React.cloneElement(el, {
              currentIndex: this.state.index,
              nextStep: this._nextStep,
              prevStep: this._prevStep,
              isLast: this.state.index === this.props.children.length - 1,
            });
          }

          return null;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
});

export default Wizard;
