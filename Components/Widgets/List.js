/* @flow */
'use strict';

import React, {View, Text} from 'react-native';
import Title from './Title';
import NativeBaseComponent from '../Base/NativeBaseComponent';
import _ from 'lodash';
import computeProps from '../../Utils/computeProps';

export default class ListNB extends NativeBaseComponent {
    static childContextTypes = {
        theme: React.PropTypes.object
    }
    
    getChildContext() {
        return {theme: this.props.theme ? this.props.theme : this.getTheme()};
    }
    
    getInitialStyle() {
        return {
            list: {

            },
            insetList: {
                borderWidth: 1,
                borderColor: this.getTheme().listBorderColor,
                margin: 15,
                borderBottomWidth: 0
            }
        }
    }


    prepareRootProps() {
        var last = _.last(this.props.children);
        console.log(last, "[[[[][][][][]["); 
        var defaultProps = {
            style: this.props.inset ? this.getInitialStyle().insetList : this.getInitialStyle().list
        };

        return computeProps(this.props, defaultProps);

    }

    renderChildren() {
        var childrenArray = React.Children.toArray(this.props.children);

        var lastElement = _.last(childrenArray);

        var modLastElement = React.cloneElement(lastElement, computeProps(lastElement.props, {last: true}));

        return _.concat(_.slice(childrenArray, 0, childrenArray.length - 1), modLastElement);
    }
    
    render() { 
        return(
          <View {...this.prepareRootProps()} >
            {this.renderChildren()}
          </View>
        );
    }

}