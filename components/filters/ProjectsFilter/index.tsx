import { LabelLayout } from '@/components/layouts/LabelLayout';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import type { IFiltersProject } from '@/types/filters';
import type { FC } from 'react';
import Select, { type MultiValue } from 'react-select';

interface Props {
  projectsFilters: IFiltersProject[];
}

interface IOption {
  label: string;
  value: number;
  disabled: boolean;
}

type Options = MultiValue<IOption>;

export const ProjectsFilter: FC<Props> = ({ projectsFilters }) => {
  const [pageQuery, setPageQuery] = useFiltersQuery();

  const options: Options = projectsFilters.map((item) => ({
    label: item.title,
    value: item.id,
    disabled: item.disabled,
  }));

  const values = projectsFilters
    .filter((item) => (pageQuery?.projects as number[])?.includes(item.id))
    .map((item) => ({
      label: item.title,
      value: item.id,
      disabled: item.disabled,
    }));

  const handleChange = (newValues: Options) => {
    setPageQuery({
      projects: newValues.map((item) => item.value),
    });
  };

  return (
    <LabelLayout label="Проект">
      <Select
        isMulti
        name="projects"
        options={options}
        isOptionDisabled={(option) => option.disabled}
        value={values}
        placeholder="Все"
        onChange={handleChange}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: '100%',
            height: 55,
            borderColor: '#35363A',
            borderRadius: 10,
            cursor: 'pointer',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            cursor: state.isDisabled ? 'not-allowed' : 'pointer',
          }),
        }}
      />
    </LabelLayout>
  );
};
