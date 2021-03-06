import React from 'react';
import { shallow } from 'enzyme';
import { SvgCoords, SvgCoordsHOC } from '..';

const dataForSvg = [
  { x: 1, y: 29, some: 'data1' },
  { x: 2, y: 23, some: 'data1' },
  { x: 3, y: 24, some: 'data1' },
];

const getComponent = props =>
  shallow(<SvgCoords {...props} render={() => <div> Hi </div>} />).instance();

describe('svg co-ordinate tests', () => {
  describe('getMinX', () => {
    test('should return default "x, y" obj if no data passed as props', () => {
      expect(getComponent().getMinX()).toEqual({ x: 0, y: 0 });
    });
    test('should return first item in the array', () => {
      expect(getComponent({ data: dataForSvg }).getMinX()).toEqual({
        x: 1,
        y: 29,
        some: 'data1',
      });
    });
  });
  describe('getMaxX', () => {
    test('should return default "x, y" obj if no data passed as props', () => {
      expect(getComponent().getMaxX()).toEqual({ x: 0, y: 0 });
    });
    test('should return last item in data array', () => {
      expect(getComponent({ data: dataForSvg }).getMaxX()).toEqual({
        x: 3,
        y: 24,
        some: 'data1',
      });
    });
  });
  describe('getMinY', () => {
    test('should return default "x, y" obj if no data passed as props', () => {
      expect(getComponent().getMinY()).toEqual({ x: 0, y: 0 });
    });
    test('should return item with smallest y value', () => {
      expect(getComponent({ data: dataForSvg }).getMinY()).toEqual({
        x: 2,
        y: 23,
        some: 'data1',
      });
    });
  });
  describe('getMaxY', () => {
    test('should return default "x, y" obj if no data passed as props', () => {
      expect(getComponent().getMaxY()).toEqual({ x: 0, y: 0 });
    });
    test('should return item with largest y value', () => {
      expect(getComponent({ data: dataForSvg }).getMaxY()).toEqual({
        x: 1,
        y: 29,
        some: 'data1',
      });
    });
  });
  describe('getSvgX', () => {
    test('should return 0 if no value is passed', () => {
      expect(getComponent().getSvgX()).toEqual(0);
    });
    test('should return 0 if viewBoxWidth prop is 0', () => {
      expect(getComponent({ viewBoxWidth: 0 }).getSvgX()).toEqual(0);
    });
    test('should calculate correct x coordinate location even if xAxisArea is not defined', () => {
      expect(
        getComponent({ data: dataForSvg, viewBoxWidth: 20 }).getSvgX(12),
      ).toEqual(80);
    });
    test('should calculate correct x coordinate location when xAxisArea is defined', () => {
      expect(
        getComponent({
          data: dataForSvg,
          viewBoxWidth: 40,
          xAxisArea: 20,
        }).getSvgX(12),
      ).toEqual(160);
    });
  });
  describe('getSvgY', () => {
    test('should return 0 if no value is passed', () => {
      expect(getComponent().getSvgY()).toEqual(0);
    });
    test('should return 0 if viewBoxWidth prop is 0', () => {
      expect(getComponent({ viewBoxHeigth: 0 }).getSvgY()).toEqual(0);
    });
    test('should calculate correct y coordinate location even if yAxisArea not defined ', () => {
      expect(
        getComponent({
          data: dataForSvg,
          viewBoxHeigth: 20,
        }).getSvgY(23),
      ).toEqual(20);
    });
    test('should calculate correct y coordinate location when yAxisArea defined ', () => {
      expect(
        getComponent({
          data: dataForSvg,
          viewBoxHeigth: 40,
          yAxisArea: 20,
        }).getSvgY(23),
      ).toEqual(40);
    });
  });
  describe('SvgCoordsHOC', () => {
    test('should render component with coordProps and user custom props', () => {
      const TestComp = () => <div> hey </div>;
      const TestHoc = SvgCoordsHOC(TestComp);
      const props = { abc: 123 };
      const rendered = shallow(<TestHoc {...props} />);
      expect(rendered.dive().props().abc).toBe(123);
    });
  });
});
