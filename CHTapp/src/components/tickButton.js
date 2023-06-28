import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IC_HIDE, IC_SHOW} from '../assets/icons';
import scale from '../constants/responsive';
import CUSTOM_COLORS from '../constants/colors';
import {IC_Checked} from '../assets/iconsvg';

class TickButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked || false,
    };
  }

  handleChecked = () => {
    if (isCheckAllButton) {
    } else {
      this.setState(prevState => ({isChecked: !prevState.isChecked}));
    }
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.handleChecked}>
        {this.state.isChecked && <IC_Checked fill="black" />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(30, 'w'),
    height: scale(30, 'h'),
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    marginRight: scale(20, 'w'),
  },
});

export default TickButton;
