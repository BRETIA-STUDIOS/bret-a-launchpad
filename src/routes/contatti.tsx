import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui-brand/Reveal";
import { BrandButton } from "@/components/ui-brand/BrandButton";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contatti")({
  head: () =>
    pageHead({
      path: "/contatti",
      title: "Contatti — BRETÌA Web Studio",
      description: "Hai un progetto? Raccontaci cosa hai in mente: scrivi a BRETÌA Web Studio.",
      ogDescription: "Hai un progetto? Raccontaci cosa hai in mente.",
    }),
  component: Contatti,
});

const CONTACT_EMAIL = "hello@bretia.studio";

/*
 * Destinazione del form (es. Formspree: https://formspree.io/f/xxxxxxx).
 * Se la variabile non è configurata il form ricade sul client di posta
 * dell'utente con i campi già compilati: nessun invio finisce nel vuoto.
 */
const CONTACT_ENDPOINT = import.meta.env["VITE_CONTACT_ENDPOINT"] as string | undefined;

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome: almeno 2 caratteri."),
  email: z.email("Inserisci un'email valida, ad esempio nome@esempio.it."),
  messaggio: z
    .string()
    .trim()
    .min(20, "Raccontaci qualcosa in più sul progetto: almeno 20 caratteri."),
});

type ContactValues = z.infer<typeof contactSchema>;
type Field = keyof ContactValues;
type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: Field[] = ["nome", "email", "messaggio"];
const EMPTY_VALUES: ContactValues = { nome: "", email: "", messaggio: "" };

const fieldClass =
  "mt-2 w-full rounded-[var(--radius-lg)] border border-input bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60";
const fieldInvalidClass = "border-destructive focus:border-destructive";

function validateField(field: Field, rawValue: string): string | undefined {
  const schema = contactSchema.shape[field] as z.ZodType<string>;
  const result = schema.safeParse(rawValue.trim());
  return result.success ? undefined : result.error.issues[0]?.message;
}

async function postToEndpoint(endpoint: string, values: ContactValues) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      nome: values.nome,
      email: values.email,
      messaggio: values.messaggio,
      _subject: `Nuova richiesta dal sito — ${values.nome}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Invio non riuscito (HTTP ${response.status})`);
  }
}

function openMailClient(values: ContactValues) {
  const subject = encodeURIComponent(`Nuovo progetto — ${values.nome}`);
  const body = encodeURIComponent(`${values.messaggio}\n\n—\n${values.nome}\n${values.email}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

function Contatti() {
  const uid = useId();

  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [dirty, setDirty] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [deliveredVia, setDeliveredVia] = useState<"endpoint" | "mail">("endpoint");
  const [honeypot, setHoneypot] = useState("");

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messaggioRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const returningToForm = useRef(false);

  const isSubmitting = status === "submitting";

  function focusField(field: Field) {
    const target =
      field === "nome"
        ? nomeRef.current
        : field === "email"
          ? emailRef.current
          : messaggioRef.current;
    target?.focus();
  }

  /* Il focus segue l'informazione appena comparsa: conferma, avviso di
     errore, o primo campo quando si torna a un form ripulito. */
  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
      return;
    }
    if (status === "error") {
      errorRef.current?.focus();
      return;
    }
    if (returningToForm.current) {
      returningToForm.current = false;
      nomeRef.current?.focus();
    }
  }, [status]);

  function handleChange(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setDirty((prev) => ({ ...prev, [field]: true }));
    // L'errore sparisce appena il campo torna valido, senza attendere il blur.
    if (errors[field] && !validateField(field, value)) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: Field) {
    // Nessun errore su un campo mai toccato: si valida ciò che l'utente ha
    // davvero compilato, oppure tutto dopo un tentativo di invio.
    if (!dirty[field] && !attempted) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setDirty({});
    setAttempted(false);
    setHoneypot("");
    returningToForm.current = true;
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setAttempted(true);
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as Field | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      setStatus("idle");
      focusField(FIELD_ORDER.find((field) => nextErrors[field]) ?? "nome");
      return;
    }

    setErrors({});

    // Honeypot compilato = bot. Nessun invio e nessun indizio del rifiuto.
    if (honeypot.trim() !== "") {
      setDeliveredVia("endpoint");
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      if (CONTACT_ENDPOINT) {
        await postToEndpoint(CONTACT_ENDPOINT, parsed.data);
        setDeliveredVia("endpoint");
      } else {
        openMailClient(parsed.data);
        setDeliveredVia("mail");
      }
      setStatus("success");
    } catch (error) {
      console.error("[contatti] invio non riuscito", error);
      setStatus("error");
    }
  }

  function fieldProps(field: Field) {
    const invalid = Boolean(errors[field]);
    return {
      id: `${uid}-${field}`,
      name: field,
      value: values[field],
      required: true,
      disabled: isSubmitting,
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `${uid}-${field}-error` : undefined,
      onBlur: () => handleBlur(field),
      className: cn(fieldClass, invalid && fieldInvalidClass),
    };
  }

  function fieldError(field: Field) {
    if (!errors[field]) return null;
    return (
      <p
        id={`${uid}-${field}-error`}
        className="mt-2 flex items-start gap-2 text-sm text-destructive"
      >
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        <span>{errors[field]}</span>
      </p>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="CONTATTI"
        title="Hai un progetto?"
        description="Raccontaci cosa hai in mente. Ti rispondiamo con una proposta chiara e trasparente."
      />
      <section className="py-20 sm:py-28">
        <div className="container-brand grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-eyebrow">Scrivici</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 block font-display text-xl font-medium transition-colors duration-200 hover:text-brand sm:text-2xl"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Italia — lavoriamo da remoto con attività di tutta la penisola.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              {status === "success" ? (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="surface-card p-7 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring sm:p-9"
                >
                  <CircleCheck aria-hidden="true" className="size-8 text-foreground" />
                  <h2 className="mt-4 font-display text-xl font-medium sm:text-2xl">
                    {deliveredVia === "endpoint"
                      ? "Messaggio inviato"
                      : "Apri il tuo client di posta"}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {deliveredVia === "endpoint"
                      ? "Grazie: abbiamo ricevuto la tua richiesta e ti rispondiamo entro un giorno lavorativo."
                      : `Abbiamo preparato l'email con i tuoi dati: controlla che si sia aperta e premi invio. Se non succede nulla, scrivici direttamente a ${CONTACT_EMAIL}.`}
                  </p>
                  <div className="mt-7">
                    <BrandButton variant="secondary" onClick={resetForm}>
                      Scrivi un altro messaggio
                    </BrandButton>
                  </div>
                </div>
              ) : (
                <form
                  className="surface-card space-y-6 p-7 sm:p-9"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <p className="text-sm text-muted-foreground">Tutti i campi sono obbligatori.</p>

                  <div>
                    <label htmlFor={`${uid}-nome`} className="label-eyebrow">
                      Nome<span aria-hidden="true"> *</span>
                    </label>
                    <input
                      {...fieldProps("nome")}
                      ref={nomeRef}
                      type="text"
                      autoComplete="name"
                      placeholder="Il tuo nome"
                      onChange={(e) => handleChange("nome", e.target.value)}
                    />
                    {fieldError("nome")}
                  </div>

                  <div>
                    <label htmlFor={`${uid}-email`} className="label-eyebrow">
                      Email<span aria-hidden="true"> *</span>
                    </label>
                    <input
                      {...fieldProps("email")}
                      ref={emailRef}
                      type="email"
                      autoComplete="email"
                      placeholder="nome@esempio.it"
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {fieldError("email")}
                  </div>

                  <div>
                    <label htmlFor={`${uid}-messaggio`} className="label-eyebrow">
                      Messaggio<span aria-hidden="true"> *</span>
                    </label>
                    <textarea
                      {...fieldProps("messaggio")}
                      ref={messaggioRef}
                      rows={5}
                      placeholder="Raccontaci il tuo progetto"
                      onChange={(e) => handleChange("messaggio", e.target.value)}
                    />
                    {fieldError("messaggio")}
                  </div>

                  {/* Trappola anti-bot: fuori dal flusso visivo e dal tab order. */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor={`${uid}-azienda`}>Non compilare questo campo</label>
                    <input
                      id={`${uid}-azienda`}
                      name="azienda"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {status === "error" && (
                    <div
                      ref={errorRef}
                      tabIndex={-1}
                      role="alert"
                      className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-destructive/60 bg-destructive/10 p-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <TriangleAlert
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-destructive"
                      />
                      <p className="leading-relaxed">
                        Non siamo riusciti a inviare il messaggio. Riprova tra un istante oppure
                        scrivici direttamente a{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-medium underline underline-offset-4"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <BrandButton
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                    )}
                    {isSubmitting ? "Invio in corso…" : "Parliamone"}
                  </BrandButton>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
