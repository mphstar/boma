import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
} from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRecommendation } from '../../context/RecommendationContext';
import { QUESTIONS } from '../../data/options';
import type { ActivityLevel, PriceLevel, Selection, TouristType } from '../../types';
import { classify } from '../../utils/classify';
import { DIALOG_EXIT_MS } from '../../utils/motion';
import { QuestionBlock } from './QuestionBlock';

type Answers = Partial<Record<keyof Selection, string>>;
type Direction = 'next' | 'back';

const TOTAL_QUESTIONS = QUESTIONS.length;

export function PersonalizationDialog() {
  const { dialogOpen, closeDialog, setRecommendation } = useRecommendation();
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moveFocus = useRef(false);
  const advanceTimer = useRef<number | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<Direction>('next');

  const answered = QUESTIONS.filter((question) => answers[question.key]).length;
  const question = QUESTIONS[step];
  const isLast = step === TOTAL_QUESTIONS - 1;
  const currentAnswered = Boolean(answers[question.key]);
  const exitMs = reduce ? 0 : DIALOG_EXIT_MS;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogOpen) {
      // Batal tutup kalau pengguna membuka lagi saat animasi keluar berjalan.
      dialog.classList.remove('closing');
      dialog.scrollTop = 0;
      if (!dialog.open) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      }
      return;
    }

    if (!dialog.open) {
      dialog.classList.remove('closing');
      return;
    }

    // Panel keluar dulu, baru dialog benar-benar ditutup.
    dialog.classList.add('closing');
    const timer = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove('closing');
    }, exitMs);

    return () => window.clearTimeout(timer);
  }, [dialogOpen, exitMs]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeDialog();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [closeDialog]);

  useEffect(() => {
    if (dialogOpen) setStep(0);
  }, [dialogOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => closeDialog();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [closeDialog]);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const cancelAdvance = () => {
    if (advanceTimer.current === null) return;
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
  };

  useEffect(() => cancelAdvance, []);

  useEffect(() => {
    if (!dialogOpen) cancelAdvance();
  }, [dialogOpen]);

  const goToStep = (next: number) => {
    cancelAdvance();
    if (next === step) return;
    moveFocus.current = true;
    setDirection(next > step ? 'next' : 'back');
    setStep(next);
  };

  const handleAdvance = () => {
    if (isLast) return;
    cancelAdvance();
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      goToStep(step + 1);
    }, 220);
  };

  const handleChange = (key: keyof Selection, value: string) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
  };

  const handleNext = () => {
    if (!currentAnswered || isLast) return;
    goToStep(step + 1);
  };

  const handleReset = () => {
    cancelAdvance();
    setAnswers({});
    goToStep(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLast) {
      handleNext();
      return;
    }

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

  const hint = isLast
    ? answered < TOTAL_QUESTIONS
      ? 'Lengkapi pilihan yang masih kosong.'
      : 'Semua pilihan siap dihitung.'
    : currentAnswered
      ? 'Lanjut ke langkah berikutnya.'
      : 'Pilih satu untuk melanjutkan.';

  return (
    <dialog ref={dialogRef} aria-labelledby="dlgT" onClick={handleDialogClick}>
      <div className="dlg-in">
        <header className="dlg-head">
          <div>
            <p className="dlg-kicker">Rekomendasi personal</p>
            <h2 className="dlg-title" id="dlgT">
              Seperti apa perjalananmu?
            </h2>
          </div>
          <button className="x" type="button" aria-label="Tutup" onClick={closeDialog}>
            ×
          </button>
        </header>
        <p className="dlg-sub">
          Tiga pertanyaan singkat. Jawabanmu dihitung dengan Decision Tree ID3.
        </p>

        <div className="trail-wrap">
          <ol
            className="trail"
            style={
              {
                '--p': step / (TOTAL_QUESTIONS - 1),
                '--steps': TOTAL_QUESTIONS,
              } as CSSProperties
            }
          >
            {QUESTIONS.map((item, index) => {
              const value = answers[item.key];
              const state = index === step ? 'current' : value ? 'done' : 'todo';

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    className="stop"
                    data-state={state}
                    aria-current={index === step ? 'step' : undefined}
                    aria-label={`Langkah ${index + 1}: ${item.stepLabel}, ${
                      value ?? 'belum dipilih'
                    }`}
                    onClick={() => goToStep(index)}
                  >
                    <i aria-hidden="true">{value && index !== step ? '✓' : index + 1}</i>
                    <b>{item.stepLabel}</b>
                    <small>{value ?? ''}</small>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="q-stage">
          <form onSubmit={handleSubmit} noValidate>
            <div className="q-panel" key={question.key} data-dir={direction}>
              <p className="q-kicker">
                Langkah {step + 1} dari {TOTAL_QUESTIONS}
              </p>
              <QuestionBlock
                question={question}
                value={answers[question.key]}
                onChange={handleChange}
                onPointerSelect={handleAdvance}
                headingRef={headingRef}
              />
            </div>

            <div className="p-act">
              <button className="reset" type="button" onClick={handleReset} disabled={answered === 0}>
                Atur ulang
              </button>
              <span className="hint" id="dlgHint">
                {hint}
              </span>
              <button
                className="back"
                type="button"
                onClick={() => goToStep(step - 1)}
                disabled={step === 0}
              >
                ‹ Kembali
              </button>
              <button
                className={`btn ${isLast ? 'primary' : 'dark'}`}
                type="submit"
                disabled={isLast ? answered < TOTAL_QUESTIONS : !currentAnswered}
                aria-describedby="dlgHint"
              >
                {isLast ? 'Lihat rekomendasi' : 'Lanjut'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
