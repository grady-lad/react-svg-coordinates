import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

export class SvgCoords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgData: props.data.reduce((svgPointArr, point) => {
        const { x, y, ...rest } = point;
        const currCord = {
          svgX: this.getSvgX(x),
          svgY: this.getSvgY(y),
          ...rest,
        };
        return [currCord, ...svgPointArr];
      }, []),
    };
  }

  getMinX = () => {
    const { data } = this.props;
    return data.length > 0 ? data[0].x : 0;
  };

  getMaxX = () => {
    const { data } = this.props;
    return data.length > 0 ? data[data.length - 1].x : 0;
  };

  getMinY = () => {
    const { data } = this.props;
    const initial = data[0] ? data[0].y : 0;
    return data.reduce((min, p) => (p.y < min ? p.y : min), initial);
  };

  getMaxY = () => {
    const { data } = this.props;
    const initial = data[0] ? data[0].y : 0;
    return data.reduce((max, p) => (p.y > max ? p.y : max), initial);
  };

  getSvgX = (x = 0) => {
    if (x) {
      const { viewBoxWidth } = this.props;
      const xPoint = x / this.getMaxX();
      return xPoint * viewBoxWidth;
    }
    return x;
  };

  getSvgY = (y = 0) => {
    if (y) {
      const { viewBoxHeigth } = this.props;
      const minY = this.getMinY();
      const maxY = this.getMaxY();
      return (
        (viewBoxHeigth * maxY - viewBoxHeigth * y) / //eslint-disable-line
        (maxY - minY)
      );
    }
    return y;
  };

  getChartHelpers = () => ({
    coordFuncs: {
      getMinX: this.getMinX,
      getMaxX: this.getMaxX,
      getMinY: this.getMinY,
      getMaxY: this.getMaxY,
      getSvgX: this.getSvgX,
      getSvgY: this.getSvgY,
    },
    svgData: this.state.svgData,
  });

  render() {
    return this.props.render(this.getChartHelpers());
  }
}
SvgCoords.propTypes = {
  viewBoxWidth: PropTypes.number,
  viewBoxHeigth: PropTypes.number,
  data: PropTypes.array.isRequired, // TODO: Disable this line
  render: PropTypes.func.isRequired,
};
// DEFAULT PROPS
SvgCoords.defaultProps = {
  viewBoxWidth: 0,
  viewBoxHeigth: 0,
  data: [],
};

export const SvgCoordsHOC = (Comp) => {
  const Wrapper = props => (
    <SvgCoords render={coordProps => <Comp {...coordProps} {...props} />} />
  );
  Wrapper.displayName = `SvgCoordsHOC(${Component.displayName ||
    Component.name})`;
  Wrapper.WrappedComponent = Component;
  return hoistNonReactStatic(Wrapper, Component);
};
