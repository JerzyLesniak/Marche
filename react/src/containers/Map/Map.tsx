import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import './Map.scss';
import StatesMap from '../../assets/map.svg';
import { VisitsData } from '../../App';
const data = require('../../assets/stateData.json');

const SELECTED_COLOR = '#F59200';
const UNSELECTED_COLOR = '#FCDAA9';

enum Range {
  TwoHundredFifty = '0 - 250',
  FiveHundred = '250 - 500',
  TenHundreds = '500 - 1000',
  TenHundredsMore = '1000+',
}

interface Props {
  data: VisitsData[];
}

const Map = (props: Props) => {
  const [optionsState, setOptionsState] = useState<Range>(Range.TwoHundredFifty);
  const svgConteinerRef = useRef<HTMLDivElement>();

  const getFilterFunction = (element: VisitsData, range: Range) => {
    switch (range) {
      case Range.TwoHundredFifty:
        return element.visits <= 250;
      case Range.FiveHundred:
        return element.visits > 250 && element.visits <= 500;
      case Range.TenHundreds:
        return element.visits > 500 && element.visits <= 1000;
      case Range.TenHundredsMore:
        return element.visits > 1000;
    }
  };

  useEffect(() => {
    props.data
      .filter((element: VisitsData) => {
        return getFilterFunction(element, optionsState);
      })
      .forEach((element: VisitsData) => {
        const e = svgConteinerRef.current.getElementsByClassName(`map_svg__${element.id.toLocaleLowerCase()}`)[0];
        if (e) {
          e.setAttribute('style', `fill: ${SELECTED_COLOR}`);
        }
      });
  }, [optionsState]);

  const onChangeRange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOptionsState(e.target.value as Range);
    if (svgConteinerRef && svgConteinerRef.current)
      Array.from(svgConteinerRef.current.getElementsByTagName('path')).forEach((element: SVGPathElement) => {
        if (element) {
          element.setAttribute('style', `fill: ${UNSELECTED_COLOR}`);
        }
      });
  };

  return (
    <div className="map">
      <div className="map-controls">
        <span>User visits:</span>
        <select value={optionsState} onChange={onChangeRange}>
          <option value={Range.TwoHundredFifty}>{Range.TwoHundredFifty}</option>
          <option value={Range.FiveHundred}>{Range.FiveHundred}</option>
          <option value={Range.TenHundreds}>{Range.TenHundreds}</option>
          <option value={Range.TenHundredsMore}>{Range.TenHundredsMore}</option>
        </select>
      </div>
      <div ref={svgConteinerRef} className="map-container">
        <StatesMap />
      </div>
    </div>
  );
};

export default Map;
