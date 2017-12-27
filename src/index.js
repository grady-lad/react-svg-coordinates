import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

export class SvgCoords extends Component {
  getMinX = () => {
    const { data } = this.props;
    return data.length > 0 ? data[0] : { x: 0, y: 0 };
  };

  getMaxX = () => {
    const { data } = this.props;
    return data.length > 0 ? data[data.length - 1] : { x: 0, y: 0 };
  };

  getMinY = () => {
    const { data } = this.props;
    const initial = data[0] ? data[0] : { x: 0, y: 0 };
    return data.reduce((min, p) => (p.y < min.y ? p : min), initial);
  };

  getMaxY = () => {
    const { data } = this.props;
    const initial = data[0] ? data[0] : { x: 0, y: 0 };
    return data.reduce((max, p) => (p.y > max.y ? p : max), initial);
  };

  getSvgX = (x = 0, ignorePadding = false) => {
    if (x) {
      const { viewBoxWidth, topBottomPadding } = this.props;
      const { x: maxX } = this.getMaxX();
      if (ignorePadding) {
        const xPoint = x / maxX;
        return xPoint * viewBoxWidth;
      }
      return topBottomPadding + x / maxX * (viewBoxWidth - topBottomPadding);
    }
    return 0;
  };

  getSvgY = (y = 0, ignorePadding = false) => {
    if (y) {
      const { viewBoxHeigth, sidesPadding } = this.props;
      const { y: minY } = this.getMinY();
      const { y: maxY } = this.getMaxY();
      if (ignorePadding) {
        return (
          (viewBoxHeigth * maxY - viewBoxHeigth * y) / //eslint-disable-line
          (maxY - minY)
        );
      }
      return (
        ((viewBoxHeigth - sidesPadding) * maxY -
          (viewBoxHeigth - sidesPadding) * y) /
        (maxY - minY)
      );
    }
    return 0;
  };

  getChartHelpers = () => ({
    getMinX: this.getMinX,
    getMaxX: this.getMaxX,
    getMinY: this.getMinY,
    getMaxY: this.getMaxY,
    getSvgX: this.getSvgX,
    getSvgY: this.getSvgY,
  });

  render() {
    return this.props.render(this.getChartHelpers());
  }
}
SvgCoords.propTypes = {
  viewBoxWidth: PropTypes.number,
  viewBoxHeigth: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
  render: PropTypes.func.isRequired,
  topBottomPadding: PropTypes.number,
  sidesPadding: PropTypes.number,
};
// DEFAULT PROPS
SvgCoords.defaultProps = {
  viewBoxWidth: 0,
  viewBoxHeigth: 0,
  data: [],
  topBottomPadding: 0,
  sidesPadding: 0,
};

export const SvgCoordsHOC = (Comp) => {
  const Wrapper = props => (
    <SvgCoords render={coordProps => <Comp {...props} {...coordProps} />} />
  );
  Wrapper.displayName = `SvgCoordsHOC(${Component.displayName ||
    Component.name})`;
  Wrapper.WrappedComponent = Component;
  return hoistNonReactStatic(Wrapper, Component);
};
