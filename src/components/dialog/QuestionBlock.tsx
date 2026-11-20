import type { QuestionConfig, Selection } from '../../types';

interface QuestionBlockProps {
  question: QuestionConfig;
  value?: string;
  onChange: (key: keyof Selection, value: string) => void;
}

export function QuestionBlock({ question, value, onChange }: QuestionBlockProps) {
  return (
    <div className="q">
      <h3>
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
              />
              <label htmlFor={id}>
                <b>{option.value}</b>
                <span>{option.description}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
