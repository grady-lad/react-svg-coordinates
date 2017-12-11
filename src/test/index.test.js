import React from 'react';
import { shallow } from 'enzyme';
import { SvgCoords } from '..';

const dataForSvg = [
  { x: 1, y: 29, some: 'data1' },
  { x: 2, y: 23, some: 'data1' },
  { x: 3, y: 24, some: 'data1' },
];

const getComponent = props =>
  shallow(<SvgCoords {...props} render={() => <div> Hi </div>} />).instance();

describe('svg co-ordinate tests', () => {
  describe('getMinX', () => {
    test('should return 0 if no data passed as props', () => {
      expect(getComponent().getMinX()).toEqual(0);
    });
    test('should return "x" prop of first item in data array', () => {
      expect(getComponent({ data: dataForSvg }).getMinX()).toEqual(1);
    });
  });
  describe('getMaxX', () => {
    test('should return 0 if no data passed as props', () => {
      expect(getComponent().getMaxX()).toEqual(0);
    });
    test('should return "x" prop of last item in data array', () => {
      expect(getComponent({ data: dataForSvg }).getMaxX()).toEqual(3);
    });
  });
  describe('getMinY', () => {
    test('should return 0 if no data passed as props', () => {
      expect(getComponent().getMinY()).toEqual(0);
    });
    test('should return item with smallest y value', () => {
      expect(getComponent({ data: dataForSvg }).getMinY()).toEqual(23);
    });
  });
  describe('getMaxY', () => {
    test('should return 0 if no data passed as props', () => {
      expect(getComponent().getMaxY()).toEqual(0);
    });
    test('should return item with largest y value', () => {
      expect(getComponent({ data: dataForSvg }).getMaxY()).toEqual(29);
    });
  });
  describe('getSvgX', () => {
    test('should return 0 if no value is passed', () => {
      expect(getComponent().getSvgX()).toEqual(0);
    });
    test('should return 0 if viewBoxWidth prop is 0', () => {
      expect(getComponent({ viewBoxWidth: 0 }).getSvgX()).toEqual(0);
    });
    test('should return item with largest y value', () => {
      expect(
        getComponent({ data: dataForSvg, viewBoxWidth: 34 }).getSvgX(23),
      ).toEqual(260.6666666666667);
    });
    describe('getSvgX', () => {
      test('should return 0 if no value is passed', () => {
        expect(getComponent().getSvgY()).toEqual(0);
      });
      test('should return 0 if viewBoxWidth prop is 0', () => {
        expect(getComponent({ viewBoxHeigth: 0 }).getSvgY()).toEqual(0);
      });
      test('should return item with largest y value', () => {
        expect(
          getComponent({ data: dataForSvg, viewBoxHeigth: 20 }).getSvgY(23),
        ).toEqual(20);
      });
    });
  });
});
