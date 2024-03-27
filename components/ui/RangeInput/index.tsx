/* eslint-disable react/require-default-props */

import {
  type ChangeEventHandler, type FC, useEffect, useState,
} from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { isEqual } from 'lodash';

export type RangeValuesType = [number, number];

interface Props {
  from: number;
  to: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => number | string;
  onChange?: (values: RangeValuesType) => void;
  disabled?: boolean;
}

export const RangeInput: FC<Props> = ({
  from, to, min, max, step, formatValue, onChange, disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [values, setValues] = useState<RangeValuesType>([from, to]);

  const [fromValue, toValue] = values;
  const dbValues = useDebounce(values, 500);

  const formattedFromValue = `от ${formatValue ? formatValue(fromValue) : fromValue}`;
  const formattedToValue = `до ${formatValue ? formatValue(toValue) : toValue}`;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((s) => (e.target.name === 'from' ? [+e.target.value, s[1]] : [s[0], +e.target.value]));
  };

  useEffect(() => {
    const newValues: RangeValuesType = [from, to];
    if (!isEqual(newValues, values)) {
      setValues(newValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  useEffect(() => {
    if (!!onChange && !isEqual(dbValues, [from, to])) {
      onChange(dbValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbValues]);

  return (
    <div className="w-full h-[55px] flex items-center justify-between border border-black rounded-base relative">
      <input
        className="w-full h-full bg-transparent font-ev font-normal text-xs lg:text-lg text-black text-center px-[24px] outline-0"
        value={!isFocused ? formattedFromValue : fromValue}
        name="from"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        disabled={disabled}
      />
      <div className="w-[20px] h-[1px] bg-grey shrink-0" />
      <input
        className="w-full h-full bg-transparent font-ev font-normal text-xs lg:text-lg text-black text-center px-[24px] outline-0"
        value={!isFocused ? formattedToValue : toValue}
        name="to"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div className="absolute bottom-0 left-0 right-0 w-full px-[10px]">
        <Slider
          range
          allowCross={false}
          min={min}
          max={max}
          value={values}
          step={step}
          // @ts-ignore
          onChange={setValues}
          styles={{
            track: { background: '#2495FE', height: 1, bottom: -1 },
            rail: { position: 'absolute', bottom: 0, display: 'none' },
            handle: {
              background: '#2495FE', opacity: 1, width: 10, height: 10, bottom: -5, border: 'none',
            },
          }}
        />
      </div>
    </div>
  );
};
