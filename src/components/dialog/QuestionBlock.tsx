import type { Ref } from 'react';
import type { QuestionConfig, Selection } from '../../types';

interface QuestionBlockProps {
  question: QuestionConfig;
  value?: string;
  onChange: (key: keyof Selection, value: string) => void;
  onPointerSelect?: () => void;
  headingRef?: Ref<HTMLHeadingElement>;
}

export function QuestionBlock({
  question,
  value,
  onChange,
  onPointerSelect,
  headingRef,
}: QuestionBlockProps) {
  return (
    <>
      <h3 className="q-title" ref={headingRef} tabIndex={-1}>
        {question.title}
        <small>{question.hint}</small>
      </h3>
      <div className="opts">
        {question.options.map((option) => {
          const id = `${question.key}-${option.value}`;
          return (
            <div className="opt" key={option.value}>
              <input
                type="radio"
                name={question.key}
                id={id}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(question.key, option.value)}
                onClick={(event) => {
                  if (event.detail === 0) return;
                  onPointerSelect?.();
                }}
              />
              <label htmlFor={id}>
                <span className="opt-t">
                  <b>{option.value}</b>
                  <span className="opt-d">{option.description}</span>
                </span>
                <i className="opt-mark" aria-hidden="true" />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
