import { useEffect, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  LUME_SCHEDULES,
  LUME_SERVICES,
  MONTHS,
  WEEKDAY_LABELS,
  availableWindows,
  formatLongDate,
  isPast,
  isWorkingDay,
  monthGrid,
  sameDay,
  type ServiceId,
  type Slot,
} from "@/lib/lume/booking";

export type BookingMember = {
  name: string;
  role: string;
  portrait: { url: string };
};

const STEPS = ["Professionista", "Servizio", "Data e ora", "Conferma"];

const customerSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome").max(60, "Nome troppo lungo"),
  cognome: z.string().trim().min(2, "Inserisci il tuo cognome").max(60, "Cognome troppo lungo"),
  telefono: z
    .string()
    .trim()
    .min(6, "Inserisci un numero di telefono valido")
    .max(24, "Numero troppo lungo")
    .regex(/^[+0-9 ().-]+$/, "Inserisci un numero di telefono valido"),
  email: z.string().trim().email("Inserisci un indirizzo email valido").max(120, "Email troppo lunga"),
  note: z.string().trim().max(500, "Massimo 500 caratteri").optional(),
});

type CustomerForm = z.infer<typeof customerSchema>;
type FieldKey = keyof CustomerForm;

const EMPTY_FORM: CustomerForm = { nome: "", cognome: "", telefono: "", email: "", note: "" };

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="sl-label opacity-55">{label}</p>
      <p className="sl-body mt-1.5 text-sm">{value}</p>
    </div>
  );
}

export function BookingModule({ team }: { team: BookingMember[] }) {
  const today = useMemo(() => new Date(), []);

  const [proId, setProId] = useState<string>(team[0]?.name.toLowerCase() ?? "giuseppe");
  const [serviceId, setServiceId] = useState<ServiceId>("taglio");
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [confirmed, setConfirmed] = useState<null | {
    service: string;
    professional: string;
    date: string;
    slot: string;
  }>(null);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const professional = team.find((m) => m.name.toLowerCase() === proId) ?? team[0];
  const service = LUME_SERVICES.find((s) => s.id === serviceId)!;
  const schedule = LUME_SCHEDULES[proId];

  const slots = useMemo(() => {
    if (!date || !schedule) return [];
    return availableWindows(schedule, date, service.minDuration);
  }, [date, schedule, service.minDuration]);

  // Nessuna combinazione incoerente può restare selezionata.
  useEffect(() => {
    setSlot((current) => {
      if (!current) return null;
      return slots.some((s) => s.start === current.start && s.end === current.end) ? current : null;
    });
  }, [slots]);

  const cells = monthGrid(viewMonth.getFullYear(), viewMonth.getMonth());
  const canGoBack =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() > today.getMonth());

  const readyForDetails = Boolean(date && slot);
  const currentStep = confirmed ? 4 : slot ? 4 : date ? 3 : 2;

  const changePro = (id: string) => {
    setProId(id);
    setSlot(null);
  };
  const changeService = (id: ServiceId) => {
    setServiceId(id);
    setSlot(null);
  };
  const changeDate = (d: Date) => {
    setDate(d);
    setSlot(null);
  };

  const setField = (key: FieldKey, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const parsed = customerSchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<FieldKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldKey;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    if (!date || !slot) return;
    // Prototipo front-end: nessun invio reale, nessun appuntamento creato.
    setConfirmed({
      service: service.label,
      professional: professional?.name ?? "",
      date: formatLongDate(date),
      slot: slot.label,
    });
  };

  const reset = () => {
    setConfirmed(null);
    setDate(null);
    setSlot(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setServiceId("taglio");
    setProId(team[0]?.name.toLowerCase() ?? "giuseppe");
  };

  if (confirmed) {
    return (
      <div className="sl-panel sl-book">
        <p className="sl-label" style={{ color: "var(--sl-bronze)" }}>
          Prenotazione ricevuta
        </p>
        <h3 className="mt-4 text-2xl sm:text-3xl">Il tuo appuntamento è stato registrato correttamente.</h3>
        <div className="sl-rule mt-8 w-16" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <SummaryRow label="Servizio" value={confirmed.service} />
          <SummaryRow label="Professionista" value={confirmed.professional} />
          <SummaryRow label="Data" value={confirmed.date} />
          <SummaryRow label="Orario" value={confirmed.slot} />
        </div>
        <p className="sl-book-note mt-8">
          Questa è una dimostrazione: nessuna prenotazione reale è stata inviata al salone.
        </p>
        <button type="button" onClick={reset} className="sl-btn sl-btn-outline mt-8">
          Nuova prenotazione
        </button>
      </div>
    );
  }

  return (
    <div className="sl-panel sl-book">
      <ol className="sl-label flex flex-wrap items-center gap-x-4 gap-y-2 opacity-70">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className={cn("flex items-center gap-2", currentStep > i + 1 || currentStep === i + 1 ? "sl-book-step-on" : null)}
          >
            <span className="sl-step">{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>

      {/* 1 — PROFESSIONISTA */}
      <fieldset className="mt-8 border-0 p-0">
        <legend className="sl-label opacity-55">Professionista</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {team.map((m) => {
            const id = m.name.toLowerCase();
            const active = id === proId;
            return (
              <button
                key={m.name}
                type="button"
                onClick={() => changePro(id)}
                aria-pressed={active}
                className={cn("sl-book-pro", active && "is-active")}
              >
                <span className="sl-book-portrait">
                  <img src={m.portrait.url} alt="" loading="lazy" />
                </span>
                <span className="text-left">
                  <span className="sl-label block">{m.name}</span>
                  <span className="sl-label mt-1 block opacity-55">{m.role}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 2 — SERVIZIO */}
      <fieldset className="mt-10 border-0 p-0">
        <legend className="sl-label opacity-55">Servizio</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {LUME_SERVICES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => changeService(s.id)}
              aria-pressed={s.id === serviceId}
              className={cn("sl-book-chip", s.id === serviceId && "is-active")}
            >
              {s.label}
              <span className="sl-book-chip-hint">{s.hint}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* 3 — DATA E ORA */}
      <fieldset className="mt-10 border-0 p-0">
        <legend className="sl-label opacity-55">Data e ora</legend>
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="sl-book-cal">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="sl-book-nav"
                disabled={!canGoBack}
                aria-label="Mese precedente"
                onClick={() =>
                  setViewMonth((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))
                }
              >
                ←
              </button>
              <p className="sl-label">
                {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </p>
              <button
                type="button"
                className="sl-book-nav"
                aria-label="Mese successivo"
                onClick={() =>
                  setViewMonth((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))
                }
              >
                →
              </button>
            </div>
            <div className="sl-book-grid mt-5">
              {WEEKDAY_LABELS.map((w) => (
                <span key={w} className="sl-label sl-book-dow">
                  {w}
                </span>
              ))}
              {cells.map((cell, i) => {
                if (!cell) return <span key={`e${i}`} />;
                const disabled = !isWorkingDay(cell) || isPast(cell, today);
                const selected = date ? sameDay(cell, date) : false;
                return (
                  <button
                    key={cell.toISOString()}
                    type="button"
                    disabled={disabled}
                    aria-disabled={disabled}
                    aria-pressed={selected}
                    aria-label={formatLongDate(cell) + (disabled ? " — non disponibile" : "")}
                    onClick={() => changeDate(cell)}
                    className={cn("sl-book-day", selected && "is-active")}
                  >
                    {cell.getDate()}
                  </button>
                );
              })}
            </div>
            <p className="sl-book-note mt-4">Apertura su appuntamento dal lunedì al venerdì.</p>
          </div>

          <div>
            {!date ? (
              <p className="sl-body text-sm opacity-70">
                Scegli una data per vedere gli orari disponibili.
              </p>
            ) : slots.length === 0 ? (
              <div>
                <p className="sl-label">Nessun orario disponibile</p>
                <p className="sl-body mt-3 text-sm opacity-70">
                  {proId === "andrea"
                    ? "Prova a scegliere un altro professionista."
                    : "Prova a scegliere un altro giorno o un altro professionista."}
                </p>
              </div>
            ) : (
              <div>
                <p className="sl-label opacity-55">{formatLongDate(date)}</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {slots.map((s) => {
                    const active = slot?.start === s.start && slot?.end === s.end;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSlot(s)}
                        className={cn("sl-book-slot", active && "is-active")}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                <p className="sl-book-note mt-5">
                  L&apos;orario indicato è il tempo riservato al tuo appuntamento.
                </p>
              </div>
            )}
          </div>
        </div>
      </fieldset>

      {/* 4 — CONFERMA */}
      {readyForDetails ? (
        <div className="mt-10">
          <div className="sl-rule w-full" />
          <p className="sl-label mt-8 opacity-55">I tuoi dati</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {(
              [
                ["nome", "Nome", "text"],
                ["cognome", "Cognome", "text"],
                ["telefono", "Telefono", "tel"],
                ["email", "Email", "email"],
              ] as [FieldKey, string, string][]
            ).map(([key, label, type]) => (
              <div key={key}>
                <label className="sl-label opacity-55" htmlFor={`lume-${key}`}>
                  {label}
                </label>
                <input
                  id={`lume-${key}`}
                  type={type}
                  value={form[key] ?? ""}
                  onChange={(e) => setField(key, e.target.value)}
                  aria-invalid={Boolean(errors[key])}
                  aria-describedby={errors[key] ? `lume-${key}-err` : undefined}
                  className={cn("sl-book-input mt-2", errors[key] && "is-invalid")}
                />
                {errors[key] ? (
                  <p id={`lume-${key}-err`} className="sl-book-error mt-2">
                    {errors[key]}
                  </p>
                ) : null}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="sl-label opacity-55" htmlFor="lume-note">
                Note <span className="opacity-60">(facoltativo)</span>
              </label>
              <textarea
                id="lume-note"
                rows={3}
                value={form.note ?? ""}
                onChange={(e) => setField("note", e.target.value)}
                className="sl-book-input mt-2 resize-none"
              />
            </div>
          </div>

          <div className="sl-book-summary mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <SummaryRow label="Servizio" value={service.label} />
              <SummaryRow label="Professionista" value={professional?.name} />
              <SummaryRow label="Data" value={date ? formatLongDate(date) : ""} />
              <SummaryRow label="Orario" value={slot?.label} />
              <SummaryRow
                label="Cliente"
                value={[form.nome, form.cognome].filter(Boolean).join(" ") || "—"}
              />
              <SummaryRow label="Contatti" value={[form.telefono, form.email].filter(Boolean).join(" · ") || "—"} />
            </div>
          </div>

          <p className="sl-book-note mt-6 max-w-2xl">
            Eventuali trattamenti o servizi aggiuntivi che richiedano un tempo superiore a quello
            inizialmente previsto verranno valutati e concordati direttamente in salone, adattando
            l&apos;appuntamento alle esigenze della cliente.
          </p>

          <button type="button" onClick={submit} className="sl-btn sl-btn-solid mt-8">
            Conferma prenotazione <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
