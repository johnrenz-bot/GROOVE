import React, { useEffect, useMemo, useState } from "react";

type FormState = {
  firstname: string;
  middlename: string;
  lastname: string;
  birth_year: string;
  birth_month: string;
  birth_day: string;
  contact: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
};

type ErrorKey = keyof FormState | "birthdate" | "id";

type Errors = Partial<Record<ErrorKey, string>>;

type PasswordRules = {
  len: boolean;
  upper: boolean;
  special: boolean;
};

type IdFileState = {
  file: File | null;
  name: string;
  ext: string;
  preview: string;
  kind: "" | "image" | "file";
};

const MIN_YEAR = 1900;
const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/u;
const usernameRegex = /^[A-Za-z0-9._-]{3,20}$/;
const gmailRegex = /^[A-Za-z0-9._%+\-]+@gmail\.com$/i;

const ClientRegistration: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const MAX_YEAR = currentYear - 13;

  const years = useMemo(
    () =>
      Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MAX_YEAR - i),
    [MAX_YEAR]
  );

  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const [form, setForm] = useState<FormState>({
    firstname: "",
    middlename: "",
    lastname: "",
    birth_year: "",
    birth_month: "",
    birth_day: "",
    contact: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<ErrorKey, boolean>>(
    {} as Record<ErrorKey, boolean>
  );
  const [passwordRules, setPasswordRules] = useState<PasswordRules>({
    len: false,
    upper: false,
    special: false,
  });
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [idFile, setIdFile] = useState<IdFileState>({
    file: null,
    name: "",
    ext: "",
    preview: "",
    kind: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const year = Number(form.birth_year);
    const month = Number(form.birth_month);

    if (!year || !month) {
      setDaysInMonth([]);
      return;
    }

    const totalDays = new Date(year, month, 0).getDate();
    setDaysInMonth(Array.from({ length: totalDays }, (_, i) => i + 1));

    if (Number(form.birth_day) > totalDays) {
      setForm((prev) => ({ ...prev, birth_day: "" }));
    }
  }, [form.birth_year, form.birth_month, form.birth_day]);

  useEffect(() => {
    const allRequiredFilled =
      form.firstname.trim() &&
      form.lastname.trim() &&
      form.birth_year &&
      form.birth_month &&
      form.birth_day &&
      form.contact.trim() &&
      form.email.trim() &&
      form.username.trim() &&
      form.password &&
      form.password_confirmation &&
      form.terms;

    const noErrors = Object.values(errors).every((e) => !e);
    const hasId = !!idFile.file || !!idFile.preview;

    setFormValid(Boolean(allRequiredFilled && noErrors && hasId));
  }, [form, errors, idFile]);

  const markTouched = (field: ErrorKey) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const updateField =
    (field: keyof FormState) =>
      (
        e:
          | React.ChangeEvent<HTMLInputElement>
          | React.ChangeEvent<HTMLSelectElement>
      ) => {
        const value =
          e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setForm((prev) => ({ ...prev, [field]: value as never }));
        markTouched(field);
        validateField(field, value as string | boolean);
      };

  const digitsOnly =
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = e.target.value.replace(/[^0-9]/g, "");
        setForm((prev) => ({ ...prev, [field]: cleaned as never }));
        markTouched(field);
        validateField(field, cleaned);
      };

  const inputBorderClass = (field: ErrorKey) => {
    if (errors[field]) return "border-red-500";
    if (touched[field]) return "border-black";
    return "border-gray-300";
  };

  const ruleClass = (ok: boolean) =>
    ok ? "text-black" : "text-gray-500";

  const validateBirthdate = (next: Errors) => {
    const y = Number(form.birth_year);
    const m = Number(form.birth_month);
    const d = Number(form.birth_day);

    if (!y || !m || !d) {
      next.birthdate = "Please select year, month, and day.";
      return;
    }

    const maxDay = new Date(y, m, 0).getDate();
    if (d > maxDay) {
      next.birthdate = "Invalid date for the selected month.";
      return;
    }

    const birth = new Date(y, m - 1, d);
    const age13 = new Date(y + 13, m - 1, d);

    if (birth > new Date()) {
      next.birthdate = "Birthdate cannot be in the future.";
    } else if (new Date() < age13) {
      next.birthdate = "You must be at least 13 years old to register.";
    } else {
      delete next.birthdate;
    }
  };

  const validateField = (field: ErrorKey, value?: string | boolean) => {
    setErrors((prev) => {
      const next: Errors = { ...prev };

      const currentValue =
        typeof value === "boolean" || typeof value === "string"
          ? value
          : (form as any)[field];

      if (field === "firstname" || field === "lastname" || field === "middlename") {
        const text = String(currentValue || "").trim();
        if (field !== "middlename" && !text) {
          next[field] = "This field is required.";
        } else if (text && !nameRegex.test(text)) {
          next[field] =
            "Only letters, spaces, apostrophes, and dashes are allowed.";
        } else {
          delete next[field];
        }
      }

      if (
        field === "birthdate" ||
        field === "birth_year" ||
        field === "birth_month" ||
        field === "birth_day"
      ) {
        validateBirthdate(next);
      }

      if (field === "contact") {
        const text = String(currentValue || "").trim();
        if (!text) next.contact = "Contact is required.";
        else if (!/^9\d{9}$/.test(text))
          next.contact = "Use PH mobile format: 9XXXXXXXXX (10 digits).";
        else delete next.contact;
      }

      if (field === "email") {
        const text = String(currentValue || "").trim();
        if (!text) next.email = "Email is required.";
        else if (!gmailRegex.test(text))
          next.email = "Email must be a valid @gmail.com address.";
        else delete next.email;
      }

      if (field === "username") {
        const text = String(currentValue || "").trim();
        if (!text) next.username = "Username is required.";
        else if (!usernameRegex.test(text))
          next.username =
            "3–20 chars: letters, numbers, dot, underscore, dash.";
        else delete next.username;
      }

      if (field === "password") {
        const text = String(currentValue || "");
        const len = text.length >= 8;
        const upper = /[A-Z]/.test(text);
        const special = /[!@#$%^&*()_\-+=\[\]{};:'",.<>\/?`~\\|]/.test(text);

        setPasswordRules({ len, upper, special });

        if (!text) next.password = "Password is required.";
        else if (!(len && upper && special))
          next.password =
            "Password should be at least 8 characters, with an uppercase letter and special character.";
        else delete next.password;

        if (touched.password_confirmation) {
          const confirmed = form.password_confirmation;
          if (!confirmed) {
            next.password_confirmation = "Please confirm your password.";
          } else if (confirmed !== text) {
            next.password_confirmation = "Passwords do not match.";
          } else {
            delete next.password_confirmation;
          }
        }
      }

      if (field === "password_confirmation") {
        const text = String(currentValue || "");
        if (!text) next.password_confirmation = "Please confirm your password.";
        else if (text !== form.password)
          next.password_confirmation = "Passwords do not match.";
        else delete next.password_confirmation;
      }

      if (field === "terms") {
        const checked = Boolean(currentValue);
        if (!checked) next.terms = "You must accept the terms.";
        else delete next.terms;
      }

      if (field === "id") {
        const hasId = !!idFile.file || !!idFile.preview;
        if (!hasId) next.id = "This ID is required.";
        else delete next.id;
      }

      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setIdFile({ file: null, name: "", ext: "", preview: "", kind: "" });
      validateField("id");
      return;
    }

    const ext = (file.name.split(".").pop() || "").toLowerCase();
    const isImage = ["jpg", "jpeg", "png"].includes(ext);
    const isPdf = ext === "pdf";

    if (!isImage && !isPdf) {
      setIdFile({ file: null, name: "", ext: "", preview: "", kind: "" });
      setErrors((prev) => ({
        ...prev,
        id: "Please upload a PDF or image (JPG/PNG).",
      }));
      return;
    }

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setIdFile({
          file,
          name: file.name,
          ext: ext.toUpperCase(),
          preview: String(ev.target?.result),
          kind: "image",
        });
        setErrors((prev) => {
          const next = { ...prev };
          delete next.id;
          return next;
        });
      };
      reader.readAsDataURL(file);
    } else {
      setIdFile({
        file,
        name: file.name,
        ext: ext.toUpperCase(),
        preview: "",
        kind: "file",
      });
      setErrors((prev) => {
        const next = { ...prev };
        delete next.id;
        return next;
      });
    }
  };

  const removeId = () => {
    setIdFile({ file: null, name: "", ext: "", preview: "", kind: "" });
    setErrors((prev) => ({ ...prev, id: "This ID is required." }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldsToValidate: ErrorKey[] = [
      "firstname",
      "middlename",
      "lastname",
      "birthdate",
      "contact",
      "email",
      "username",
      "password",
      "password_confirmation",
      "terms",
      "id",
    ];

    fieldsToValidate.forEach((f) => {
      markTouched(f);
      if (f === "birthdate" || f === "id") validateField(f);
      else validateField(f, (form as any)[f]);
    });

    const hasId = !!idFile.file || !!idFile.preview;
    if (!hasId) {
      setErrors((prev) => ({ ...prev, id: "This ID is required." }));
    }

    if (!formValid) {
      const firstErrorKey =
        (Object.keys(errors) as ErrorKey[]).find((k) => errors[k]) ||
        (!hasId ? ("id" as ErrorKey) : undefined);

      if (firstErrorKey) {
        const domKey = firstErrorKey === "id" ? "id_document" : firstErrorKey;
        const el =
          document.getElementById(domKey) ||
          document.querySelector(`[name="${domKey}"]`);

        if (el && "scrollIntoView" in el) {
          (el as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        if (el instanceof HTMLElement) el.focus();
      }

      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Client account created (mock). Hook this up to your API.");
    }, 1500);
  };

  const dropzoneClasses =
    "w-full border-2 border-dashed rounded-xl bg-gray-50 hover:bg-gray-100 transition p-4 cursor-pointer min-h-[120px] grid place-items-center text-center";

  return (
    <div className="min-h-screen w-full bg-white text-black font-[system-ui,ui-sans-serif] antialiased flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div className="max-w-4xl w-full mx-auto">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-700 hover:text-black mb-6 group"
        >
          <span className="text-2xl font-extrabold group-hover:-translate-x-1 transition-transform">
            &lt;
          </span>
          <span className="px-3 py-1 rounded-full border border-gray-300 bg-white text-[11px] sm:text-xs shadow-sm">
            Back to Login
          </span>
        </button>

        <main className="flex flex-col gap-6">
          <header className="w-full flex flex-col items-center text-center py-7 sm:py-8 rounded-2xl border border-gray-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gray-50 border border-gray-200 shadow-inner mb-3">
              <img
                src="/Image/bg/LOG.png"
                alt="Groove"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black">
              Client Registration
            </p>
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mt-2">
              Groove Community
            </p>
            <p className="mt-4 max-w-2xl px-4 text-xs sm:text-sm text-gray-600">
              Create your Groove client account to connect with coaches, book
              sessions, and explore top talents and studios in Bulacan.
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] px-4 sm:px-6 md:px-8 py-6 sm:py-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Firstname
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  value={form.firstname}
                  onChange={updateField("firstname")}
                  className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                    "firstname"
                  )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                  placeholder="Firstname"
                  required
                />
                {touched.firstname && errors.firstname && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.firstname}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="middlename"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Middlename (optional)
                </label>
                <input
                  id="middlename"
                  name="middlename"
                  value={form.middlename}
                  onChange={updateField("middlename")}
                  className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                    "middlename"
                  )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                  placeholder="Middlename"
                />
                {touched.middlename && errors.middlename && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.middlename}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastname"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Lastname
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  value={form.lastname}
                  onChange={updateField("lastname")}
                  className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                    "lastname"
                  )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                  placeholder="Lastname"
                  required
                />
                {touched.lastname && errors.lastname && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.lastname}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-2">
                Date of Birth
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  id="birth_year"
                  name="birth_year"
                  value={form.birth_year}
                  onChange={updateField("birth_year")}
                  className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                    "birthdate"
                  )} bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/70`}
                  required
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>

                <select
                  id="birth_month"
                  name="birth_month"
                  value={form.birth_month}
                  onChange={updateField("birth_month")}
                  className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                    "birthdate"
                  )} bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/70`}
                  required
                >
                  <option value="">Month</option>
                  {months.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>

                <select
                  id="birth_day"
                  name="birth_day"
                  value={form.birth_day}
                  onChange={updateField("birth_day")}
                  className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                    "birthdate"
                  )} bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/70`}
                  required
                >
                  <option value="">Day</option>
                  {daysInMonth.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              {touched.birthdate && errors.birthdate && (
                <p className="mt-1 text-[11px] text-red-600">
                  {errors.birthdate}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Contact
                </label>
                <div className="flex">
                  <span className="inline-flex items-center gap-2 px-3 min-w-[92px] h-10 sm:h-11 bg-gray-100 text-gray-800 border border-gray-300 rounded-l-lg border-r-0 text-xs">
                    <img
                      src="https://flagcdn.com/w40/ph.png"
                      alt="PH"
                      className="h-3.5 w-auto rounded-sm"
                    />
                    +63
                  </span>
                  <input
                    id="contact"
                    name="contact"
                    value={form.contact}
                    onChange={digitsOnly("contact")}
                    maxLength={10}
                    inputMode="numeric"
                    className={`flex-1 h-10 sm:h-11 px-3 rounded-r-lg border border-l-0 ${inputBorderClass(
                      "contact"
                    )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                    placeholder="9XXXXXXXXX"
                    required
                  />
                </div>
                {touched.contact && errors.contact && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                    @
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    className={`w-full h-10 sm:h-11 pl-7 pr-3 rounded-lg border ${inputBorderClass(
                      "email"
                    )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={updateField("username")}
                className={`w-full h-10 sm:h-11 px-3 rounded-lg border ${inputBorderClass(
                  "username"
                )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                placeholder="Username"
                required
              />
              {touched.username && errors.username && (
                <p className="mt-1 text-[11px] text-red-600">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={updateField("password")}
                  className={`w-full h-10 sm:h-11 pl-3 pr-9 rounded-lg border ${inputBorderClass(
                    "password"
                  )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                  placeholder="••••••••"
                  required
                />
                {touched.password && errors.password && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.password}
                  </p>
                )}
                <ul className="mt-2 space-y-0.5 text-[11px] text-gray-600">
                  <li className={ruleClass(passwordRules.len)}>8 characters</li>
                  <li className={ruleClass(passwordRules.upper)}>
                    At least 1 uppercase letter
                  </li>
                  <li className={ruleClass(passwordRules.special)}>
                    At least 1 special character
                  </li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={form.password_confirmation}
                  onChange={updateField("password_confirmation")}
                  className={`w-full h-10 sm:h-11 pl-3 pr-9 rounded-lg border ${inputBorderClass(
                    "password_confirmation"
                  )} bg-white text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/70`}
                  placeholder="••••••••"
                  required
                />
                {touched.password_confirmation &&
                  errors.password_confirmation && (
                    <p className="mt-1 text-[11px] text-red-600">
                      {errors.password_confirmation}
                    </p>
                  )}
              </div>
            </div>

            <div>
              <p className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                Upload any valid ID (PDF/JPG/PNG)
              </p>
              <div
                className={`${dropzoneClasses} ${idFile.file ? "border-black" : "border-gray-300"
                  }`}
                onClick={() => document.getElementById("id_document")?.click()}
              >
                {!idFile.file && !idFile.preview && (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl text-gray-400">🪪</span>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Click to upload (PDF / JPG / PNG)
                    </p>
                  </div>
                )}

                {idFile.preview && idFile.kind === "image" && (
                  <div className="w-full">
                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-white">
                      <div className="aspect-4/3 w-full">
                        <img
                          src={idFile.preview}
                          alt="ID preview"
                          className="w-full h-full object-contain bg-gray-50"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-2 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("id_document")?.click()
                        }
                        className="text-black font-medium"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={removeId}
                        className="text-black font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {idFile.file && idFile.kind === "file" && !idFile.preview && (
                  <div className="flex items-center justify-between w-full bg-gray-50 rounded px-3 py-2 border border-gray-200 text-xs">
                    <span className="truncate text-gray-900">
                      {idFile.name}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase">
                      {idFile.ext}
                    </span>
                  </div>
                )}

                <input
                  id="id_document"
                  name="id_document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {errors.id && (
                <p className="mt-1 text-[11px] text-red-600">{errors.id}</p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={form.terms}
                onChange={updateField("terms")}
                className="mt-0.5 h-4 w-4 rounded border-gray-400 bg-white text-black focus:ring-black focus:ring-offset-0"
              />
              <label
                htmlFor="terms"
                className="text-[11px] sm:text-xs text-gray-700"
              >
                I have read and accept the{" "}
                <span className="font-semibold underline cursor-pointer">
                  Terms and Conditions
                </span>
                .
              </label>
            </div>
            {touched.terms && errors.terms && (
              <p className="mt-1 text-[11px] text-red-600">{errors.terms}</p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={!formValid || isSubmitting}
                className="w-full sm:w-[40%] h-10 sm:h-11 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white text-xs sm:text-sm font-medium shadow-[0_14px_30px_rgba(0,0,0,0.35)] hover:bg-neutral-900 active:bg-neutral-950 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
              >
                {isSubmitting && (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      strokeWidth="4"
                      d="M4 12a8 8 0 018-8"
                    />
                  </svg>
                )}
                <span>{isSubmitting ? "Submitting…" : "Create Account"}</span>
              </button>
              <p className="mt-2 text-[11px] text-gray-500">
                By continuing, you agree to our Terms &amp; Privacy Policy.
              </p>
            </div>
          </form>

          <p className="mt-3 text-center text-[11px] text-gray-400">
            © {currentYear} Groove. All rights reserved.
          </p>
        </main>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #e5e7eb; border-radius: 8px; }
        ::-webkit-scrollbar-thumb { background-color: #9ca3af; border-radius: 8px; border: 2px solid #e5e7eb; }
        ::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
        * { scrollbar-width: thin; scrollbar-color: #9ca3af #e5e7eb; }
      `}</style>
    </div>
  );
};

export default ClientRegistration;
