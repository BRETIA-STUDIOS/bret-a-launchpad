/**
 * Dati e logica di disponibilità del concept Studio Lume.
 *
 * Tutto ciò che riguarda orari, periodi occupati e calcolo delle finestre di
 * appuntamento vive qui, separato dall'interfaccia: domani questi dati possono
 * arrivare da un gestionale o da un backend senza toccare la UI.
 */

export type ServiceId = "taglio" | "colore" | "styling" | "trattamenti";

export type LumeService = {
  id: ServiceId;
  label: string;
  /** Durata minima realistica dell'appuntamento, in minuti. */
  minDuration: number;
  hint: string;
};

export const LUME_SERVICES: LumeService[] = [
  { id: "taglio", label: "Taglio", minDuration: 120, hint: "Circa due ore" },
  { id: "colore", label: "Colore", minDuration: 180, hint: "Da tre ore" },
  { id: "styling", label: "Styling", minDuration: 120, hint: "Circa due ore" },
  { id: "trattamenti", label: "Trattamenti", minDuration: 120, hint: "Da due ore" },
];

/** Periodo espresso in minuti dalla mezzanotte. */
export type Period = { start: number; end: number };

export type ProfessionalSchedule = {
  id: string;
  /** Orario di lavoro per giorno della settimana (0 = domenica … 6 = sabato). */
  working: Record<number, Period[]>;
  /** Periodi già occupati, per giorno della settimana. */
  occupied: Record<number, Period[]>;
};

export const minutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const formatTime = (value: number): string =>
  `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

const period = (start: string, end: string): Period => ({
  start: minutes(start),
  end: minutes(end),
});

const WEEKDAYS = [1, 2, 3, 4, 5];

const weekdayMap = (periods: (day: number) => Period[]): Record<number, Period[]> =>
  Object.fromEntries(WEEKDAYS.map((d) => [d, periods(d)]));

/**
 * Dati dimostrativi. Giuseppe ha una giornata già molto piena, Matteo ha
 * un'agenda regolare, Andrea in questo periodo non riceve prenotazioni online.
 */
export const LUME_SCHEDULES: Record<string, ProfessionalSchedule> = {
  giuseppe: {
    id: "giuseppe",
    working: weekdayMap(() => [period("09:00", "19:00")]),
    occupied: weekdayMap((day) =>
      day === 3
        ? [period("09:00", "13:00"), period("14:00", "19:00")]
        : [period("09:00", "10:00"), period("10:30", "11:30"), period("15:00", "16:30")],
    ),
  },
  matteo: {
    id: "matteo",
    working: weekdayMap(() => [period("09:00", "19:00")]),
    occupied: weekdayMap((day) =>
      day === 2
        ? [period("13:00", "14:00"), period("16:00", "17:00")]
        : [period("13:00", "14:00")],
    ),
  },
  andrea: {
    id: "andrea",
    working: {},
    occupied: {},
  },
};

/** Sottrae i periodi occupati dagli orari di lavoro e restituisce i varchi liberi. */
export function freeGaps(schedule: ProfessionalSchedule, weekday: number): Period[] {
  const working = schedule.working[weekday] ?? [];
  const busy = [...(schedule.occupied[weekday] ?? [])].sort((a, b) => a.start - b.start);

  const gaps: Period[] = [];
  for (const block of working) {
    let cursor = block.start;
    for (const b of busy) {
      if (b.end <= cursor || b.start >= block.end) continue;
      if (b.start > cursor) gaps.push({ start: cursor, end: Math.min(b.start, block.end) });
      cursor = Math.max(cursor, b.end);
    }
    if (cursor < block.end) gaps.push({ start: cursor, end: block.end });
  }
  return gaps.filter((g) => g.end > g.start);
}

export type Slot = { start: number; end: number; label: string };

const GRID_STEP = 30;

/**
 * Finestre di appuntamento valide: solo quelle che entrano per intero
 * in un varco libero, allineate a una griglia di mezz'ora.
 */
export function availableWindows(
  schedule: ProfessionalSchedule,
  date: Date,
  duration: number,
): Slot[] {
  const weekday = date.getDay();
  const slots: Slot[] = [];
  for (const gap of freeGaps(schedule, weekday)) {
    const first = Math.ceil(gap.start / GRID_STEP) * GRID_STEP;
    for (let start = first; start + duration <= gap.end; start += GRID_STEP) {
      const end = start + duration;
      slots.push({ start, end, label: `${formatTime(start)}–${formatTime(end)}` });
    }
  }
  return slots;
}

export const isWorkingDay = (date: Date): boolean => {
  const d = date.getDay();
  return d >= 1 && d <= 5;
};

export const isPast = (date: Date, today: Date): boolean =>
  date.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

export const MONTHS = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

const DAY_NAMES = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

export const formatLongDate = (date: Date): string =>
  `${DAY_NAMES[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

/** Griglia del mese con il lunedì come primo giorno; le celle vuote sono null. */
export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= days; d += 1) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
