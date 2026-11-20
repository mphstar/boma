import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { useRecommendation } from '../../context/RecommendationContext';
import { QUESTIONS } from '../../data/options';
import type { ActivityLevel, PriceLevel, Selection, TouristType } from '../../types';
import { classify } from '../../utils/classify';
import { QuestionBlock } from './QuestionBlock';

type Answers = Partial<Record<keyof Selection, string>>;

const TOTAL_QUESTIONS = QUESTIONS.length;

export function PersonalizationDialog() {
  const { dialogOpen, closeDialog, setRecommendation } = useRecommendation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [answers, setAnswers] = useState<Answers>({});

  const answered = QUESTIONS.filter((question) => answers[question.key]).length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogOpen && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!dialogOpen && dialog.open) {
      dialog.close();
    }
  }, [dialogOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => closeDialog();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [closeDialog]);

  const handleChange = (key: keyof Selection, value: string) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
  };

  const handleReset = () => setAnswers({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { activity, price, tourist } = answers;
    if (!activity || !price || !tourist) return;

    const selection: Selection = {
      activity: activity as ActivityLevel,
      price: price as PriceLevel,
      tourist: tourist as TouristType,
    };

    setRecommendation({ selection, result: classify(selection) });
    closeDialog();
    window.location.hash = '#/hasil';
  };

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  return (
    <dialog ref={dialogRef} aria-labelledby="dlgT" onClick={handleDialogClick}>
      <div className="dlg-in">
        <button className="x" aria-label="Tutup" onClick={closeDialog}>
          ×
        </button>
        <h2 className="h2" id="dlgT" style={{ fontSize: 'clamp(28px,4vw,42px)' }}>
          Seperti apa perjalananmu?
        </h2>
        <p className="sub" style={{ marginTop: 10 }}>
          Pilih satu jawaban di setiap baris. Rekomendasi dihitung dengan Decision Tree ID3.
        </p>

        <div className="dp">
          <span>
            {answered} dari {TOTAL_QUESTIONS} dipilih
          </span>
          <div className="progb">
            <i style={{ width: `${(answered / TOTAL_QUESTIONS) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((question) => (
            <QuestionBlock
              key={question.key}
              question={question}
              value={answers[question.key]}
              onChange={handleChange}
            />
          ))}

          <div className="p-act">
            <button className="btn dark" type="submit" disabled={answered < TOTAL_QUESTIONS}>
              Lihat rekomendasiku
            </button>
            <button className="link" type="button" onClick={handleReset}>
              Atur ulang pilihan
            </button>
            <span className="hint">
              {answered < TOTAL_QUESTIONS
                ? 'Lengkapi tiga pilihan untuk melanjutkan.'
                : 'Siap. Lihat hasilnya.'}
            </span>
          </div>
        </form>
      </div>
    </dialog>
  );
}
