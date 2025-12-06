import React, { useEffect, useMemo, useState } from "react";

type Step1Form = {
    firstname: string;
    middlename: string;
    lastname: string;
    suffix: string;
    birth_year: string;
    birth_month: string;
    birth_day: string;
    contact: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    about: string;
    address: string;
};

type Step2Form = {
    service_fee: string;
    duration: string;
    payment: "" | "cash" | "online";
    payment_provider: "" | "gcash" | "maya" | "paypal";
    payment_handle: string;
    notice_hours: string;
    notice_days: string;
    method: string;
    terms: boolean;
};

type Step1ErrorKey =
    | "firstname"
    | "lastname"
    | "birthdate"
    | "address"
    | "contact"
    | "email"
    | "username"
    | "password"
    | "password_confirmation"
    | "about"
    | "talents";

type Step2ErrorKey =
    | "service_fee"
    | "duration"
    | "payment"
    | "method"
    | "portfolio"
    | "valid_id"
    | "id_selfie"
    | "terms"
    | "notice_hours"
    | "notice_days"
    | "payment_provider"
    | "payment_handle";

type Step1Errors = Partial<Record<Step1ErrorKey, string>>;
type Step2Errors = Partial<Record<Step2ErrorKey, string>>;

type PasswordRules = {
    len: boolean;
    upper: boolean;
    special: boolean;
};

type FileField = {
    file: File | null;
    name: string;
    ext: string;
    preview: string;
    mode: "frame" | "edge" | "plain";
};

type TalentCatalog = Record<string, string[]>;

const onlyDigits = (v: string) => v.replace(/\D+/g, "");
const hasUpper = (v: string) => /[A-Z]/.test(v);
const hasSpecial = (v: string) => /[^A-Za-z0-9]/.test(v);
const isGmail = (v: string) => /^[A-Za-z0-9._%+\-]+@gmail\.com$/i.test(v.trim());

const talentCatalog: TalentCatalog = {
    Dance: [
        "Hip-hop",
        "Breaking",
        "Popping",
        "Locking",
        "Krump",
        "House",
        "Waacking",
        "Voguing",
        "Tutting",
        "Animation",
        "Litefeet",
        "Memphis Jookin",
        "Urban",
        "Street",
        "Choreography",
        "Lyrical",
        "Contemporary",
        "Modern",
        "Jazz",
        "Theatre Jazz",
        "Heels",
        "Commercial",
        "K-pop",
        "J-pop",
        "Ballet",
        "Classical Ballet",
        "Neoclassical",
        "Pointe",
        "Character",
        "Ballroom",
        "Waltz",
        "Tango",
        "Viennese Waltz",
        "Foxtrot",
        "Quickstep",
        "Latin Ballroom",
        "Cha-cha",
        "Rumba",
        "Samba",
        "Paso Doble",
        "Jive",
        "Swing",
        "Lindy Hop",
        "Charleston",
        "Balboa",
        "West Coast Swing",
        "East Coast Swing",
        "Salsa (On1)",
        "Salsa (On2)",
        "Bachata (Sensual)",
        "Bachata (Dominican)",
        "Kizomba",
        "Zouk",
        "Afrobeats",
        "Amapiano",
        "Azonto",
        "Dancehall",
        "Reggaeton",
        "Bollywood",
        "Bhangra",
        "Garba",
        "Kathak Fusion",
        "Tap",
        "Irish",
        "Flamenco",
        "Belly Dance (Raqs Sharqi)",
        "Hula",
        "Tahitian",
        "Cheer",
        "Pom",
        "Majorette",
        "Drill",
        "Freestyle",
        "Experimental",
        "Contact Improvisation",
        "Capoeira",
        "Folk/Traditional"
    ],
    Singing: [
        "Pop",
        "K-pop",
        "J-pop",
        "OPM",
        "R&B",
        "Contemporary R&B",
        "Neo-Soul",
        "Soul",
        "Funk",
        "Gospel",
        "Ballad",
        "Power Ballad",
        "Acoustic",
        "Singer-Songwriter",
        "Indie",
        "Alternative",
        "Rock",
        "Pop Rock",
        "Alt Rock",
        "Classic Rock",
        "Punk",
        "New Wave",
        "Metal",
        "Metalcore",
        "Hard Rock",
        "Hip-hop/Rap",
        "Trap",
        "Boom Bap",
        "Spoken Word",
        "EDM",
        "House",
        "Techno",
        "Trance",
        "Drum & Bass",
        "Dubstep",
        "Electropop",
        "Dance",
        "Country",
        "Bluegrass",
        "Folk",
        "Americana",
        "Blues",
        "Jazz",
        "Swing",
        "Big Band",
        "Bossa Nova",
        "Latin",
        "Reggaeton",
        "Salsa",
        "Bachata",
        "Bolero",
        "Mariachi",
        "Reggae",
        "Ska",
        "Afrobeats/Amapiano (Vocal)",
        "World",
        "Classical",
        "Opera",
        "Art Song",
        "Oratorio",
        "Musical Theater",
        "A Cappella",
        "Barbershop",
        "Choral",
        "Lullaby/Children",
        "Lo-fi",
        "Ambient",
        "Experimental",
        "Holiday"
    ],
    Theater: [
        "Stage Acting",
        "Musical",
        "Shakespearean",
        "Classical Greek/Roman",
        "Period/Farce",
        "Comedy",
        "Drama",
        "Melodrama",
        "Improvisation",
        "Devised Theater",
        "Physical Theatre",
        "Movement-Based",
        "Mask Work",
        "Pantomime",
        "Commedia dell’arte",
        "Absurdist",
        "Epic/Brechtian",
        "Realism/Naturalism",
        "Expressionism",
        "Site-Specific/Immersive",
        "Monologue",
        "Reader’s Theater",
        "Puppetry",
        "Shadow Play",
        "Children’s Theatre",
        "Experimental/Avant-garde"
    ],
    Acting: [
        "Film Acting",
        "TV Acting",
        "Web Series/Streaming",
        "Teleserye/Soap",
        "Commercial/Advert",
        "Hosting/Presenting",
        "Model/Print",
        "Comedy/Sketch",
        "Sitcom (Multi-cam)",
        "Single-cam Drama",
        "Action/Thriller",
        "Rom-com",
        "Period Piece",
        "Voice Acting",
        "Animation VO",
        "Video Game VO",
        "ADR/Dubbing",
        "Narration/Documentary",
        "Audiobook",
        "Green Screen",
        "Motion Capture/Performance Capture",
        "Stunt/Action Basics",
        "Audition Technique",
        "Cold Reading",
        "On-Camera Technique",
        "Method Acting",
        "Meisner Technique",
        "Chekhov Technique",
        "Classical Technique",
        "Improvisation for Actors"
    ]
};

const CoachRegistration: React.FC = () => {
    const [step, setStep] = useState<1 | 2>(1);

    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - 13;
    const minYear = maxYear - 80;

    const years = useMemo(
        () =>
            Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i),
        [maxYear, minYear]
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
            "December"
        ],
        []
    );

    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

    const [form1, setForm1] = useState<Step1Form>({
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: "",
        birth_year: "",
        birth_month: "",
        birth_day: "",
        contact: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        about: "",
        address: ""
    });

    const [form2, setForm2] = useState<Step2Form>({
        service_fee: "",
        duration: "",
        payment: "",
        payment_provider: "",
        payment_handle: "",
        notice_hours: "",
        notice_days: "",
        method: "",
        terms: false
    });

    const [errors1, setErrors1] = useState<Step1Errors>({});
    const [errors2, setErrors2] = useState<Step2Errors>({});
    const [touched1, setTouched1] = useState<Record<Step1ErrorKey, boolean>>(
        {} as Record<Step1ErrorKey, boolean>
    );
    const [touched2, setTouched2] = useState<Record<Step2ErrorKey, boolean>>(
        {} as Record<Step2ErrorKey, boolean>
    );

    const [passwordRules, setPasswordRules] = useState<PasswordRules>({
        len: false,
        upper: false,
        special: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [portfolio, setPortfolio] = useState<FileField>({
        file: null,
        name: "",
        ext: "",
        preview: "",
        mode: "frame"
    });
    const [validId, setValidId] = useState<FileField>({
        file: null,
        name: "",
        ext: "",
        preview: "",
        mode: "frame"
    });
    const [idSelfie, setIdSelfie] = useState<FileField>({
        file: null,
        name: "",
        ext: "",
        preview: "",
        mode: "frame"
    });

    const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
    const [talentToAdd, setTalentToAdd] = useState("");
    const [finalGenres, setFinalGenres] = useState<Record<string, string[]>>({});
    const [draftGenres, setDraftGenres] = useState<Record<string, string[]>>({});
    const [customGenres, setCustomGenres] = useState<Record<string, string[]>>({});
    const [isEditingTalent, setIsEditingTalent] = useState<
        Record<string, boolean>
    >({});
    const [genreFilter, setGenreFilter] = useState<Record<string, string>>({});
    const [newGenreText, setNewGenreText] = useState<Record<string, string>>({});
    const maxTalents = 8;
    const maxGenresPerTalent = 12;

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const y = parseInt(form1.birth_year);
        const m = parseInt(form1.birth_month);
        let days = 31;
        if (m) {
            if ([4, 6, 9, 11].includes(m)) days = 30;
            else if (m === 2) {
                const leap =
                    y &&
                    ((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0));
                days = leap ? 29 : 28;
            }
        }
        const newDays = Array.from({ length: days }, (_, i) => i + 1);
        setDaysInMonth(newDays);
        const d = parseInt(form1.birth_day);
        if (d && d > days) {
            setForm1(prev => ({ ...prev, birth_day: String(days) }));
        }
    }, [form1.birth_year, form1.birth_month, form1.birth_day]);

    useEffect(() => {
        const p = form1.password || "";
        setPasswordRules({
            len: p.length >= 8,
            upper: hasUpper(p),
            special: hasSpecial(p)
        });
    }, [form1.password]);

    const markTouched1 = (field: Step1ErrorKey) => {
        setTouched1(prev => ({ ...prev, [field]: true }));
    };

    const markTouched2 = (field: Step2ErrorKey) => {
        setTouched2(prev => ({ ...prev, [field]: true }));
    };

    const inputBorderClass1 = (field: Step1ErrorKey) => {
        if (errors1[field]) return "border-red-500 bg-red-50";
        if (touched1[field]) return "border-black";
        return "border-gray-300";
    };

    const inputBorderClass2 = (field: Step2ErrorKey) => {
        if (errors2[field]) return "border-red-500 bg-red-50";
        if (touched2[field]) return "border-black";
        return "border-gray-300";
    };

    const ruleClass = (ok: boolean) =>
        ok ? "text-black" : "text-gray-500";

    const handleForm1Change =
        (field: keyof Step1Form) =>
            (
                e:
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                    | React.ChangeEvent<HTMLSelectElement>
            ) => {
                const value =
                    e.target.type === "checkbox"
                        ? (e.target as HTMLInputElement).checked
                        : e.target.value;
                setForm1(prev => ({ ...prev, [field]: value as never }));
            };

    const handleForm2Change =
        (field: keyof Step2Form) =>
            (
                e:
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLTextAreaElement>
                    | React.ChangeEvent<HTMLSelectElement>
            ) => {
                const value =
                    e.target.type === "checkbox"
                        ? (e.target as HTMLInputElement).checked
                        : e.target.value;
                setForm2(prev => ({ ...prev, [field]: value as never }));
            };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = onlyDigits(e.target.value).slice(0, 10);
        setForm1(prev => ({ ...prev, contact: digits }));
    };

    const handleServiceFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = onlyDigits(e.target.value).slice(0, 5);
        if (digits && digits !== "0") {
            digits = String(parseInt(digits, 10));
        }
        if (digits === "0") digits = "";
        setForm2(prev => ({ ...prev, service_fee: digits }));
    };

    const handleNoticeHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = onlyDigits(e.target.value).slice(0, 2);
        if (digits && digits !== "0") {
            digits = String(parseInt(digits, 10));
        }
        if (digits === "0") digits = "";
        setForm2(prev => ({ ...prev, notice_hours: digits }));
    };

    const handleNoticeDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = onlyDigits(e.target.value).slice(0, 2);
        if (digits && digits !== "0") {
            digits = String(parseInt(digits, 10));
        }
        if (digits === "0") digits = "";
        setForm2(prev => ({ ...prev, notice_days: digits }));
    };

    const validateBirthdate = (): string | "" => {
        const y = parseInt(form1.birth_year);
        const m = parseInt(form1.birth_month);
        const d = parseInt(form1.birth_day);
        if (!y || !m || !d) return "Please select year, month, and day.";
        const maxDay = new Date(y, m, 0).getDate();
        if (d > maxDay) return "Invalid date for the selected month.";
        const birth = new Date(y, m - 1, d);
        const today = new Date();
        if (birth > today) return "Birthdate cannot be in the future.";
        let age = today.getFullYear() - y;
        const mDiff = today.getMonth() + 1 - m;
        const dDiff = today.getDate() - d;
        if (mDiff < 0 || (mDiff === 0 && dDiff < 0)) age--;
        if (age < 13) return "You must be at least 13 years old to register.";
        return "";
    };

    const validateStep1Field = (field: Step1ErrorKey) => {
        setErrors1(prev => {
            const next: Step1Errors = { ...prev };
            switch (field) {
                case "firstname": {
                    const v = form1.firstname.trim();
                    if (!v) next.firstname = "Firstname is required.";
                    else next.firstname = "";
                    break;
                }
                case "lastname": {
                    const v = form1.lastname.trim();
                    if (!v) next.lastname = "Lastname is required.";
                    else next.lastname = "";
                    break;
                }
                case "birthdate": {
                    next.birthdate = validateBirthdate();
                    break;
                }
                case "address": {
                    const v = form1.address.trim();
                    next.address = v ? "" : "Address is required.";
                    break;
                }
                case "contact": {
                    const v = form1.contact.trim();
                    if (!v) next.contact = "Contact is required.";
                    else if (!/^9\d{9}$/.test(v))
                        next.contact = "Use PH mobile format: 9XXXXXXXXX (10 digits).";
                    else next.contact = "";
                    break;
                }
                case "email": {
                    const v = form1.email.trim();
                    if (!v) next.email = "Email is required.";
                    else if (!isGmail(v))
                        next.email = "Email must be a valid @gmail.com address.";
                    else next.email = "";
                    break;
                }
                case "username": {
                    const v = form1.username.trim();
                    if (!v) next.username = "Username is required.";
                    else if (v.length < 3)
                        next.username = "Username must be at least 3 characters.";
                    else next.username = "";
                    break;
                }
                case "password": {
                    const p = form1.password || "";
                    const ok =
                        p.length >= 8 && hasUpper(p) && hasSpecial(p);
                    if (!p) next.password = "Password is required.";
                    else if (!ok)
                        next.password =
                            "Password must be 8+ chars with 1 uppercase and 1 special character.";
                    else next.password = "";
                    if (form1.password_confirmation) {
                        if (form1.password_confirmation !== form1.password) {
                            next.password_confirmation = "Passwords must match.";
                        } else {
                            next.password_confirmation = "";
                        }
                    }
                    break;
                }
                case "password_confirmation": {
                    const v = form1.password_confirmation;
                    if (!v) next.password_confirmation = "Please confirm your password.";
                    else if (v !== form1.password)
                        next.password_confirmation = "Passwords must match.";
                    else next.password_confirmation = "";
                    break;
                }
                case "about": {
                    const v = form1.about.trim();
                    if (!v) next.about = "This field is required.";
                    else if (v.length < 10)
                        next.about = "Tell us a bit more (min 10 characters).";
                    else next.about = "";
                    break;
                }
                case "talents": {
                    if (!selectedTalents.length)
                        next.talents = "Add at least one talent and choose genres.";
                    else {
                        let ok = true;
                        for (const t of selectedTalents) {
                            if (!finalGenres[t] || !finalGenres[t].length) {
                                ok = false;
                                break;
                            }
                        }
                        next.talents = ok
                            ? ""
                            : "Each talent must have at least one genre.";
                    }
                    break;
                }
                default:
                    break;
            }
            return next;
        });
    };

    const validateStep2Field = (field: Step2ErrorKey) => {
        setErrors2(prev => {
            const next: Step2Errors = { ...prev };
            switch (field) {
                case "service_fee": {
                    const v = form2.service_fee.trim();
                    if (!v) next.service_fee = "Service fee is required.";
                    else {
                        const num = Number(v);
                        if (!Number.isFinite(num) || num < 1 || num > 10000)
                            next.service_fee = "Enter a fee between 1 and 10000.";
                        else next.service_fee = "";
                    }
                    break;
                }
                case "duration": {
                    const v = form2.duration.trim();
                    next.duration = v ? "" : "Please select a session duration.";
                    break;
                }
                case "payment": {
                    const v = form2.payment;
                    next.payment = v ? "" : "Please choose a payment method.";
                    break;
                }
                case "method": {
                    const v = form2.method.trim();
                    if (!v) next.method = "Cancellation email is required.";
                    else if (!isGmail(v))
                        next.method = "Please provide a valid @gmail.com address.";
                    else next.method = "";
                    break;
                }
                case "portfolio": {
                    const ok = !!(portfolio.file || portfolio.preview);
                    next.portfolio = ok
                        ? ""
                        : "Portfolio file is required (PDF/JPG/PNG).";
                    break;
                }
                case "valid_id": {
                    const ok = !!(validId.file || validId.preview);
                    next.valid_id = ok
                        ? ""
                        : "Government ID image is required.";
                    break;
                }
                case "id_selfie": {
                    const ok = !!(idSelfie.file || idSelfie.preview);
                    next.id_selfie = ok
                        ? ""
                        : "Selfie with ID is required.";
                    break;
                }
                case "terms": {
                    next.terms = form2.terms
                        ? ""
                        : "You must accept the terms.";
                    break;
                }
                case "notice_hours": {
                    if (!form2.notice_hours) {
                        next.notice_hours = "";
                    } else {
                        const num = Number(form2.notice_hours);
                        if (!Number.isFinite(num) || num < 1)
                            next.notice_hours = "Minimum is 1 hour.";
                        else if (num > 99)
                            next.notice_hours = "Maximum is 99 hours.";
                        else next.notice_hours = "";
                    }
                    break;
                }
                case "notice_days": {
                    if (!form2.notice_days) {
                        next.notice_days = "";
                    } else {
                        const num = Number(form2.notice_days);
                        if (!Number.isFinite(num) || num < 1)
                            next.notice_days = "Minimum is 1 day.";
                        else if (num > 30)
                            next.notice_days = "Maximum is 30 days.";
                        else next.notice_days = "";
                    }
                    break;
                }
                case "payment_provider": {
                    if (form2.payment !== "online") {
                        next.payment_provider = "";
                    } else {
                        const v = form2.payment_provider;
                        next.payment_provider = v ? "" : "Please choose a provider.";
                    }
                    break;
                }
                case "payment_handle": {
                    if (form2.payment !== "online") {
                        next.payment_handle = "";
                    } else if (!form2.payment_provider) {
                        next.payment_handle = "Choose a provider first.";
                    } else {
                        const v = form2.payment_handle.trim();
                        if (!v) {
                            next.payment_handle = "This field is required.";
                        } else if (
                            form2.payment_provider === "gcash" ||
                            form2.payment_provider === "maya"
                        ) {
                            const digits = onlyDigits(v);
                            if (!(digits.length === 11 && /^09/.test(digits))) {
                                next.payment_handle =
                                    "Enter a valid PH mobile number (09XXXXXXXXX).";
                            } else next.payment_handle = "";
                        } else if (form2.payment_provider === "paypal") {
                            if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(v)) {
                                next.payment_handle = "Enter a valid PayPal email.";
                            } else next.payment_handle = "";
                        } else {
                            next.payment_handle = "";
                        }
                    }
                    break;
                }
                default:
                    break;
            }
            return next;
        });
    };

    const isStep1Valid = useMemo(() => {
        if (!form1.firstname.trim()) return false;
        if (!form1.lastname.trim()) return false;
        if (validateBirthdate()) return false;
        if (!form1.address.trim()) return false;
        if (!/^9\d{9}$/.test(form1.contact.trim())) return false;
        if (!isGmail(form1.email.trim())) return false;
        if (!form1.username.trim() || form1.username.trim().length < 3)
            return false;
        const p = form1.password || "";
        if (!(p.length >= 8 && hasUpper(p) && hasSpecial(p))) return false;
        if (
            !form1.password_confirmation ||
            form1.password_confirmation !== form1.password
        )
            return false;
        if (!form1.about.trim() || form1.about.trim().length < 10) return false;
        if (!selectedTalents.length) return false;
        for (const t of selectedTalents) {
            if (!finalGenres[t] || !finalGenres[t].length) return false;
        }
        return true;
    }, [form1, selectedTalents, finalGenres]);

    const isStep2Valid = useMemo(() => {
        if (!form2.service_fee.trim()) return false;
        const fee = Number(form2.service_fee);
        if (!Number.isFinite(fee) || fee < 1 || fee > 10000) return false;
        if (!form2.duration.trim()) return false;
        if (!form2.payment) return false;
        if (!isGmail(form2.method.trim())) return false;
        if (!portfolio.file && !portfolio.preview) return false;
        if (!validId.file && !validId.preview) return false;
        if (!idSelfie.file && !idSelfie.preview) return false;
        if (!form2.terms) return false;
        if (form2.notice_hours) {
            const n = Number(form2.notice_hours);
            if (!Number.isFinite(n) || n < 1 || n > 99) return false;
        }
        if (form2.notice_days) {
            const n = Number(form2.notice_days);
            if (!Number.isFinite(n) || n < 1 || n > 30) return false;
        }
        if (form2.payment === "online") {
            if (!form2.payment_provider) return false;
            if (!form2.payment_handle.trim()) return false;
            if (
                form2.payment_provider === "gcash" ||
                form2.payment_provider === "maya"
            ) {
                const digits = onlyDigits(form2.payment_handle);
                if (!(digits.length === 11 && /^09/.test(digits))) return false;
            }
            if (form2.payment_provider === "paypal") {
                if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(form2.payment_handle))
                    return false;
            }
        }
        return true;
    }, [form2, portfolio, validId, idSelfie]);

    const dropzoneClasses = (hasFile: boolean) =>
        [
            "w-full border-2 border-dashed rounded-xl bg-white hover:bg-gray-50 transition p-4 cursor-pointer min-h-[120px] grid place-items-center text-center",
            hasFile ? "border-black" : "border-gray-300"
        ].join(" ");

    const handleFileChange =
        (field: "portfolio" | "validId" | "idSelfie", imageOnly: boolean) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                const setField =
                    field === "portfolio"
                        ? setPortfolio
                        : field === "validId"
                            ? setValidId
                            : setIdSelfie;
                const setErrorKey: Step2ErrorKey =
                    field === "portfolio"
                        ? "portfolio"
                        : field === "validId"
                            ? "valid_id"
                            : "id_selfie";
                if (!file) {
                    setField({
                        file: null,
                        name: "",
                        ext: "",
                        preview: "",
                        mode: "frame"
                    });
                    setErrors2(prev => ({
                        ...prev,
                        [setErrorKey]: "This file is required."
                    }));
                    return;
                }
                const ext = (file.name.split(".").pop() || "").toLowerCase();
                const isImage = ["jpg", "jpeg", "png"].includes(ext);
                const isPdf = ext === "pdf";
                if (imageOnly && !isImage) {
                    setField({
                        file: null,
                        name: "",
                        ext: "",
                        preview: "",
                        mode: "frame"
                    });
                    setErrors2(prev => ({
                        ...prev,
                        [setErrorKey]: "Please upload a JPG or PNG image."
                    }));
                    return;
                }
                if (!isImage && !isPdf) {
                    setField({
                        file: null,
                        name: "",
                        ext: "",
                        preview: "",
                        mode: "frame"
                    });
                    setErrors2(prev => ({
                        ...prev,
                        [setErrorKey]:
                            "Please upload a PDF or image (JPG/PNG)."
                    }));
                    return;
                }
                if (isImage) {
                    const reader = new FileReader();
                    reader.onload = ev => {
                        setField({
                            file,
                            name: file.name,
                            ext: ext.toUpperCase(),
                            preview: String(ev.target?.result || ""),
                            mode: "frame"
                        });
                        setErrors2(prev => ({
                            ...prev,
                            [setErrorKey]: ""
                        }));
                    };
                    reader.readAsDataURL(file);
                } else {
                    setField({
                        file,
                        name: file.name,
                        ext: ext.toUpperCase(),
                        preview: "",
                        mode: "frame"
                    });
                    setErrors2(prev => ({
                        ...prev,
                        [setErrorKey]: ""
                    }));
                }
            };

    const handleRemoveFile = (field: "portfolio" | "validId" | "idSelfie") => {
        const setField =
            field === "portfolio"
                ? setPortfolio
                : field === "validId"
                    ? setValidId
                    : setIdSelfie;
        const setErrorKey: Step2ErrorKey =
            field === "portfolio"
                ? "portfolio"
                : field === "validId"
                    ? "valid_id"
                    : "id_selfie";
        setField({
            file: null,
            name: "",
            ext: "",
            preview: "",
            mode: "frame"
        });
        setErrors2(prev => ({
            ...prev,
            [setErrorKey]: "This file is required."
        }));
    };

    const mergeGenres = (t: string, base: string[]): string[] => {
        const seen = new Set<string>();
        const out: string[] = [];
        for (const g of base || []) {
            const key = String(g || "").trim();
            if (!key) continue;
            if (!seen.has(key)) {
                seen.add(key);
                out.push(key);
            }
        }
        const custom = customGenres[t] || [];
        for (const g of custom) {
            if (!seen.has(g)) {
                seen.add(g);
                out.push(g);
            }
        }
        return out;
    };

    const filteredGenres = (t: string): string[] => {
        const base = talentCatalog[t] || [];
        const merged = mergeGenres(t, base);
        const q = (genreFilter[t] || "").trim().toLowerCase();
        if (!q) return merged;
        return merged.filter(g => g.toLowerCase().includes(q));
    };

    const handleAddTalent = () => {
        const t = talentToAdd;
        if (!t) return;
        if (selectedTalents.includes(t)) return;
        if (selectedTalents.length >= maxTalents) return;
        setSelectedTalents(prev => [...prev, t]);
        setFinalGenres(prev => ({
            ...prev,
            [t]: prev[t] || []
        }));
        setDraftGenres(prev => ({
            ...prev,
            [t]: prev[t] || []
        }));
        setCustomGenres(prev => ({
            ...prev,
            [t]: prev[t] || []
        }));
        setIsEditingTalent(prev => ({
            ...prev,
            [t]: true
        }));
        setGenreFilter(prev => ({
            ...prev,
            [t]: ""
        }));
        setNewGenreText(prev => ({
            ...prev,
            [t]: ""
        }));
        setTalentToAdd("");
        validateStep1Field("talents");
    };

    const handleRemoveTalent = (t: string) => {
        setSelectedTalents(prev => prev.filter(x => x !== t));
        setFinalGenres(prev => {
            const next = { ...prev };
            delete next[t];
            return next;
        });
        setDraftGenres(prev => {
            const next = { ...prev };
            delete next[t];
            return next;
        });
        setCustomGenres(prev => {
            const next = { ...prev };
            delete next[t];
            return next;
        });
        setIsEditingTalent(prev => {
            const next = { ...prev };
            delete next[t];
            return next;
        });
        setGenreFilter(prev => {
            const next = { ...prev };
            delete next[t];
            return next;
        });
        setNewGenreText(prev => {
            const next = { ...prev };
            delete next[t];
            return next;
        });
        validateStep1Field("talents");
    };

    const toggleEditTalent = (t: string) => {
        setIsEditingTalent(prev => {
            const next = { ...prev, [t]: !prev[t] };
            return next;
        });
        setDraftGenres(prev => {
            const currentFinal = finalGenres[t] || [];
            return {
                ...prev,
                [t]: [...currentFinal].slice(0, maxGenresPerTalent)
            };
        });
    };

    const isGenreChecked = (t: string, g: string) => {
        return (draftGenres[t] || []).includes(g);
    };

    const toggleDraftGenre = (
        t: string,
        g: string,
        checked: boolean
    ) => {
        setDraftGenres(prev => {
            const list = [...(prev[t] || [])];
            if (checked) {
                if (!list.includes(g) && list.length < maxGenresPerTalent) {
                    list.push(g);
                }
            } else {
                const idx = list.indexOf(g);
                if (idx > -1) list.splice(idx, 1);
            }
            return { ...prev, [t]: list };
        });
    };

    const clearDraftGenres = (t: string) => {
        setDraftGenres(prev => ({ ...prev, [t]: [] }));
    };

    const selectAllDraftGenres = (t: string) => {
        const all = mergeGenres(t, talentCatalog[t] || []);
        const capped = all.slice(0, maxGenresPerTalent);
        setDraftGenres(prev => ({ ...prev, [t]: capped }));
    };

    const confirmDraftGenres = (t: string) => {
        const chosen = (draftGenres[t] || []).slice(
            0,
            maxGenresPerTalent
        );
        setFinalGenres(prev => ({ ...prev, [t]: chosen }));
        setIsEditingTalent(prev => ({ ...prev, [t]: false }));
        validateStep1Field("talents");
    };

    const removeGenreChip = (t: string, g: string) => {
        setFinalGenres(prev => {
            const cur = [...(prev[t] || [])];
            const idx = cur.indexOf(g);
            if (idx > -1) cur.splice(idx, 1);
            return { ...prev, [t]: cur };
        });
        setDraftGenres(prev => ({
            ...prev,
            [t]: (prev[t] || []).filter(x => x !== g)
        }));
        validateStep1Field("talents");
    };

    const handleAddSuggestedGenre = (t: string) => {
        const raw = (newGenreText[t] || "").trim();
        if (!raw) return;
        const pretty = raw
            .replace(/\s+/g, " ")
            .replace(/\s*-\s*/g, "-");
        const existing = new Set(mergeGenres(t, talentCatalog[t] || []));
        if (!existing.has(pretty)) {
            setCustomGenres(prev => {
                const cur = prev[t] || [];
                if (cur.includes(pretty)) return prev;
                return { ...prev, [t]: [...cur, pretty] };
            });
        }
        setDraftGenres(prev => {
            const list = [...(prev[t] || [])];
            if (!list.includes(pretty) && list.length < maxGenresPerTalent) {
                list.push(pretty);
            }
            return { ...prev, [t]: list };
        });
        setNewGenreText(prev => ({ ...prev, [t]: "" }));
    };

    const paymentHandleLabel = (() => {
        switch (form2.payment_provider) {
            case "gcash":
                return "GCash Number (09XXXXXXXXX)";
            case "maya":
                return "Maya Number (09XXXXXXXXX)";
            case "paypal":
                return "PayPal Email";
            default:
                return "Account / Handle";
        }
    })();

    const paymentHandleHelp = (() => {
        switch (form2.payment_provider) {
            case "gcash":
            case "maya":
                return "Use your registered PH mobile number (09XXXXXXXXX).";
            case "paypal":
                return "Use the PayPal email where you receive payments.";
            default:
                return "";
        }
    })();

    const handleNext = () => {
        ([
            "firstname",
            "lastname",
            "birthdate",
            "address",
            "contact",
            "email",
            "username",
            "password",
            "password_confirmation",
            "about",
            "talents"
        ] as Step1ErrorKey[]).forEach(k => {
            markTouched1(k);
            validateStep1Field(k);
        });
        if (!isStep1Valid) return;
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        ([
            "firstname",
            "lastname",
            "birthdate",
            "address",
            "contact",
            "email",
            "username",
            "password",
            "password_confirmation",
            "about",
            "talents"
        ] as Step1ErrorKey[]).forEach(k => {
            markTouched1(k);
            validateStep1Field(k);
        });
        ([
            "service_fee",
            "duration",
            "payment",
            "method",
            "portfolio",
            "valid_id",
            "id_selfie",
            "terms",
            "notice_hours",
            "notice_days",
            "payment_provider",
            "payment_handle"
        ] as Step2ErrorKey[]).forEach(k => {
            markTouched2(k);
            validateStep2Field(k);
        });
        if (!isStep1Valid) {
            setStep(1);
            return;
        }
        if (!isStep2Valid) {
            setStep(2);
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            const payload = {
                role: "Choreographer/Coach",
                step1: form1,
                step2: form2,
                talents: selectedTalents,
                genres: finalGenres
            };
            console.log("Submit payload:", payload);
            alert("Coach registration submitted (mock). Connect this to your API.");
        }, 1200);
    };

    const todayLabel = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="min-h-screen w-full bg-linear-to-b from-white via-white to-gray-100 text-black antialiased flex items-center justify-center px-3 sm:px-4 py-8">
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
                    <header className="w-full flex flex-col justify-center items-center relative py-8 px-4 max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-linear-to-b from-white to-gray-50 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                        <img
                            src="/image/bg/LOG.png"
                            alt="Groove Logo"
                            className="mb-4 h-14 w-auto"
                        />
                        <p className="font-bold text-3xl sm:text-4xl tracking-tight text-black">
                            REGISTRATION
                        </p>
                        <p className="font-semibold text-xs sm:text-sm tracking-[0.35em] text-indigo-700 mt-1">
                            CHOREOGRAPHER / COACH
                        </p>
                        <p className="max-w-2xl text-center text-gray-600 text-xs sm:text-sm px-5 py-4 mx-auto border border-gray-200 rounded-xl bg-white shadow-sm mt-4">
                            Join Groove’s Coaches &amp; Choreographers Registration.
                            Connect with talented artists, share your expertise,
                            book sessions, and grow your network in Bulacan.
                        </p>
                    </header>

                    <div
                        className="flex items-center gap-3 justify-center mb-4"
                        aria-label="Progress"
                    >
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl grid place-items-center text-xs sm:text-sm font-semibold transition-colors ${step === 1
                                    ? "bg-black text-white shadow"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            1
                        </button>
                        <div
                            className={`h-1 w-16 rounded ${step >= 2 ? "bg-black" : "bg-gray-200"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => isStep1Valid && setStep(2)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl grid place-items-center text-xs sm:text-sm font-semibold transition-colors ${step === 2
                                    ? "bg-black text-white shadow"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                        >
                            2
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="w-full flex flex-col gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
                    >
                        {step === 1 && (
                            <section className="space-y-5" aria-label="Step 1">
                                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-4">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Firstname
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            placeholder="Firstname"
                                            value={form1.firstname}
                                            onChange={handleForm1Change("firstname")}
                                            onBlur={() => {
                                                markTouched1("firstname");
                                                validateStep1Field("firstname");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                "firstname"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        />
                                        {touched1.firstname && errors1.firstname && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors1.firstname}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Middlename
                                        </label>
                                        <input
                                            type="text"
                                            name="middlename"
                                            placeholder="Middlename"
                                            value={form1.middlename}
                                            onChange={handleForm1Change("middlename")}
                                            className="w-full h-11 px-3 bg-white text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/60"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Lastname
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            placeholder="Lastname"
                                            value={form1.lastname}
                                            onChange={handleForm1Change("lastname")}
                                            onBlur={() => {
                                                markTouched1("lastname");
                                                validateStep1Field("lastname");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                "lastname"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        />
                                        {touched1.lastname && errors1.lastname && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors1.lastname}
                                            </p>
                                        )}
                                    </div>

                                    <div className="max-w-10rem">
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Suffix
                                        </label>
                                        <div className="relative">
                                            <select
                                                name="suffix"
                                                value={form1.suffix}
                                                onChange={handleForm1Change("suffix")}
                                                className="w-full h-11 px-3 pr-9 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/60 appearance-none"
                                            >
                                                <option value="">Select suffix</option>
                                                <option value="Jr.">Jr.</option>
                                                <option value="Sr.">Sr.</option>
                                                <option value="II">II</option>
                                                <option value="III">III</option>
                                                <option value="IV">IV</option>
                                            </select>
                                            <svg
                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-2">
                                        Date of Birth
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <select
                                            name="birth_year"
                                            value={form1.birth_year}
                                            onChange={handleForm1Change("birth_year")}
                                            onBlur={() => {
                                                markTouched1("birthdate");
                                                validateStep1Field("birthdate");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                "birthdate"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        >
                                            <option value="">Year</option>
                                            {years.map(y => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            name="birth_month"
                                            value={form1.birth_month}
                                            onChange={handleForm1Change("birth_month")}
                                            onBlur={() => {
                                                markTouched1("birthdate");
                                                validateStep1Field("birthdate");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                "birthdate"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
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
                                            name="birth_day"
                                            value={form1.birth_day}
                                            onChange={handleForm1Change("birth_day")}
                                            onBlur={() => {
                                                markTouched1("birthdate");
                                                validateStep1Field("birthdate");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                "birthdate"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        >
                                            <option value="">Day</option>
                                            {daysInMonth.map(d => (
                                                <option key={d} value={d}>
                                                    {d}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {touched1.birthdate && errors1.birthdate && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors1.birthdate}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                        Address (Region, Province, City, Barangay)
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Region, Province, City/Municipality, Barangay"
                                        value={form1.address}
                                        onChange={handleForm1Change("address")}
                                        onBlur={() => {
                                            markTouched1("address");
                                            validateStep1Field("address");
                                        }}
                                        className={`w-full h-11 px-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                            "address"
                                        )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                        required
                                    />
                                    {touched1.address && errors1.address && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors1.address}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Contact
                                        </label>
                                        <div className="flex w-full">
                                            <span className="inline-flex items-center gap-2 px-3 min-w-[100px] h-11 bg-gray-50 text-gray-800 border border-gray-300 rounded-l-lg border-r-0 text-xs">
                                                <img
                                                    src="https://flagcdn.com/w40/ph.png"
                                                    alt="Philippine flag"
                                                    className="h-4 w-auto rounded-sm"
                                                />
                                                +63
                                            </span>
                                            <input
                                                type="text"
                                                name="contact"
                                                placeholder="9XXXXXXXXX"
                                                maxLength={10}
                                                inputMode="numeric"
                                                value={form1.contact}
                                                onChange={handleContactChange}
                                                onBlur={() => {
                                                    markTouched1("contact");
                                                    validateStep1Field("contact");
                                                }}
                                                className={`flex-1 h-11 px-3 bg-white text-black rounded-r-lg border border-l-0 ${inputBorderClass1(
                                                    "contact"
                                                )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                required
                                            />
                                        </div>
                                        {touched1.contact && errors1.contact && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors1.contact}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                                                @
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="example@gmail.com"
                                                value={form1.email}
                                                onChange={handleForm1Change("email")}
                                                onBlur={() => {
                                                    markTouched1("email");
                                                    validateStep1Field("email");
                                                }}
                                                className={`w-full h-11 pl-7 pr-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                    "email"
                                                )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                required
                                            />
                                        </div>
                                        {touched1.email && errors1.email && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors1.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                                            @
                                        </span>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={form1.username}
                                            onChange={handleForm1Change("username")}
                                            onBlur={() => {
                                                markTouched1("username");
                                                validateStep1Field("username");
                                            }}
                                            className={`w-full h-11 pl-7 pr-3 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                "username"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        />
                                    </div>
                                    {touched1.username && errors1.username && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors1.username}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                placeholder="••••••••"
                                                value={form1.password}
                                                onChange={handleForm1Change("password")}
                                                onBlur={() => {
                                                    markTouched1("password");
                                                    validateStep1Field("password");
                                                }}
                                                className={`w-full h-11 pl-3 pr-10 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                    "password"
                                                )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(p => !p)}
                                                className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                                                aria-label={
                                                    showPassword ? "Hide password" : "Show password"
                                                }
                                            >
                                                <span className="text-xs">
                                                    {showPassword ? "Hide" : "Show"}
                                                </span>
                                            </button>
                                        </div>
                                        {touched1.password && errors1.password && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors1.password}
                                            </p>
                                        )}
                                        <ul className="text-[11px] mt-2 space-y-1 text-gray-600">
                                            <li className={ruleClass(passwordRules.len)}>
                                                8 characters
                                            </li>
                                            <li className={ruleClass(passwordRules.upper)}>
                                                At least 1 uppercase letter
                                            </li>
                                            <li className={ruleClass(passwordRules.special)}>
                                                At least 1 special character
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword2 ? "text" : "password"}
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                placeholder="••••••••"
                                                value={form1.password_confirmation}
                                                onChange={handleForm1Change(
                                                    "password_confirmation"
                                                )}
                                                onBlur={() => {
                                                    markTouched1("password_confirmation");
                                                    validateStep1Field("password_confirmation");
                                                }}
                                                className={`w-full h-11 pl-3 pr-10 bg-white text-black rounded-lg border ${inputBorderClass1(
                                                    "password_confirmation"
                                                )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword2(p => !p)}
                                                className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                                                aria-label={
                                                    showPassword2
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >
                                                <span className="text-xs">
                                                    {showPassword2 ? "Hide" : "Show"}
                                                </span>
                                            </button>
                                        </div>
                                        {touched1.password_confirmation &&
                                            errors1.password_confirmation && (
                                                <p className="text-xs text-red-600 mt-1">
                                                    {errors1.password_confirmation}
                                                </p>
                                            )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                        About You (Bio)
                                    </label>
                                    <textarea
                                        name="about"
                                        rows={4}
                                        placeholder="Tell us about your background..."
                                        value={form1.about}
                                        onChange={handleForm1Change("about")}
                                        onBlur={() => {
                                            markTouched1("about");
                                            validateStep1Field("about");
                                        }}
                                        className={`w-full px-3 py-2 bg-white text-black border rounded-lg ${inputBorderClass1(
                                            "about"
                                        )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                        required
                                    />
                                    {touched1.about && errors1.about && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors1.about}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div className="border-b border-gray-200 pb-2">
                                        <h2 className="text-lg sm:text-xl font-bold text-indigo-700">
                                            Talents &amp; Genres
                                        </h2>
                                        <p className="text-gray-600 text-xs sm:text-sm">
                                            Select a talent, choose genres, then confirm. You can
                                            add multiple talents.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-gray-800 text-xs font-semibold">
                                            Select Talent
                                        </label>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                            <select
                                                value={talentToAdd}
                                                onChange={e => setTalentToAdd(e.target.value)}
                                                className="w-full sm:flex-1 h-10 border border-gray-300 rounded-lg px-3 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60"
                                            >
                                                <option value="">Select a talent</option>
                                                {Object.keys(talentCatalog).map(t => (
                                                    <option
                                                        key={t}
                                                        value={t}
                                                        disabled={
                                                            selectedTalents.includes(t) ||
                                                            selectedTalents.length >= maxTalents
                                                        }
                                                    >
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={handleAddTalent}
                                                disabled={
                                                    !talentToAdd ||
                                                    selectedTalents.includes(talentToAdd) ||
                                                    selectedTalents.length >= maxTalents
                                                }
                                                className="h-10 px-4 rounded-lg bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-gray-500 mt-1">
                                            Selected: {selectedTalents.length}/{maxTalents}
                                        </p>
                                        {errors1.talents && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors1.talents}
                                            </p>
                                        )}
                                    </div>

                                    {selectedTalents.map(t => (
                                        <div
                                            key={t}
                                            className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/40"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {t}
                                                    </h3>
                                                    <span
                                                        className={`text-[11px] px-2 py-0.5 rounded-full border ${(finalGenres[t] || []).length
                                                                ? "border-indigo-200 text-indigo-700 bg-indigo-50"
                                                                : "border-gray-200 text-gray-500 bg-gray-50"
                                                            }`}
                                                    >
                                                        {(finalGenres[t] || []).length}/
                                                        {maxGenresPerTalent} genres
                                                    </span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleEditTalent(t)}
                                                        className="text-xs sm:text-sm text-gray-800 font-semibold hover:underline"
                                                    >
                                                        {isEditingTalent[t]
                                                            ? "Cancel"
                                                            : (finalGenres[t] || []).length
                                                                ? "Edit"
                                                                : "Choose genres"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTalent(t)}
                                                        className="text-xs sm:text-sm text-red-600 font-semibold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Suggest a genre…"
                                                        value={newGenreText[t] || ""}
                                                        onChange={e =>
                                                            setNewGenreText(prev => ({
                                                                ...prev,
                                                                [t]: e.target.value
                                                            }))
                                                        }
                                                        onKeyDown={e => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                handleAddSuggestedGenre(t);
                                                            }
                                                        }}
                                                        className="h-9 w-full sm:max-w-xs px-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/60 text-xs sm:text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddSuggestedGenre(t)}
                                                        className="h-9 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm"
                                                    >
                                                        Add suggestion
                                                    </button>
                                                </div>
                                            </div>

                                            {!isEditingTalent[t] && (
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {(finalGenres[t] || []).length === 0 && (
                                                        <span className="text-xs text-gray-500">
                                                            No genres selected.
                                                        </span>
                                                    )}
                                                    {(finalGenres[t] || []).map(g => (
                                                        <button
                                                            key={g}
                                                            type="button"
                                                            onClick={() => removeGenreChip(t, g)}
                                                            className="inline-flex items-center gap-1 text-xs sm:text-sm px-2 py-1 rounded-full border border-gray-300 bg-white hover:bg-gray-100"
                                                        >
                                                            <span>{g}</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className="text-gray-500 text-[10px]"
                                                            >
                                                                ✕
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {isEditingTalent[t] && (
                                                <div className="space-y-3 mt-1">
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                                        <p className="text-xs sm:text-sm text-gray-600">
                                                            Select genres for{" "}
                                                            <strong>{t}</strong>
                                                        </p>
                                                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-600 bg-gray-50">
                                                            {(draftGenres[t] || []).length}/
                                                            {maxGenresPerTalent}
                                                        </span>
                                                        <div className="sm:ml-auto relative w-full sm:w-44">
                                                            <input
                                                                type="text"
                                                                placeholder="Search genres…"
                                                                value={genreFilter[t] || ""}
                                                                onChange={e =>
                                                                    setGenreFilter(prev => ({
                                                                        ...prev,
                                                                        [t]: e.target.value
                                                                    }))
                                                                }
                                                                className="h-9 w-full px-3 border border-gray-300 rounded-lg bg-white text-black text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                                                        {filteredGenres(t).map(g => (
                                                            <label
                                                                key={g}
                                                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs sm:text-sm cursor-pointer ${isGenreChecked(t, g)
                                                                        ? "bg-indigo-50 border-indigo-300 text-gray-900"
                                                                        : "bg-white border-gray-300 text-gray-700"
                                                                    }`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isGenreChecked(t, g)}
                                                                    disabled={
                                                                        !isGenreChecked(t, g) &&
                                                                        (draftGenres[t] || []).length >=
                                                                        maxGenresPerTalent
                                                                    }
                                                                    onChange={e =>
                                                                        toggleDraftGenre(
                                                                            t,
                                                                            g,
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-4 w-4 text-black border-gray-300 rounded"
                                                                />
                                                                <span>{g}</span>
                                                            </label>
                                                        ))}
                                                    </div>

                                                    <div className="flex flex-wrap items-center justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => clearDraftGenres(t)}
                                                            className="text-xs sm:text-sm px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
                                                        >
                                                            Clear
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => selectAllDraftGenres(t)}
                                                            className="text-xs sm:text-sm px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
                                                        >
                                                            Select all
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => confirmDraftGenres(t)}
                                                            disabled={
                                                                !(draftGenres[t] || []).length
                                                            }
                                                            className="text-xs sm:text-sm px-4 py-2 rounded-lg bg-black text-white font-semibold shadow-sm hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!isStep1Valid}
                                        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </section>
                        )}

                        {step === 2 && (
                            <section className="space-y-5" aria-label="Step 2">
                                <div className="border-b border-gray-200 pb-3">
                                    <h2 className="text-lg sm:text-2xl font-bold text-indigo-700">
                                        Create Your Agreement Form
                                    </h2>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Set terms and expectations before confirming
                                        appointments and processing transactions.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                        Role
                                    </label>
                                    <div className="w-full h-11 px-3 flex items-center bg-gray-50 text-gray-800 border border-gray-300 rounded-lg">
                                        Choreographer/Coach
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Service Fee
                                        </label>
                                        <p className="text-[11px] text-gray-500 mb-1">
                                            Standard rate per session.
                                        </p>
                                        <input
                                            type="text"
                                            name="service_fee"
                                            placeholder="e.g., 500"
                                            inputMode="numeric"
                                            value={form2.service_fee}
                                            onChange={handleServiceFeeChange}
                                            onBlur={() => {
                                                markTouched2("service_fee");
                                                validateStep2Field("service_fee");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                "service_fee"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        />
                                        {touched2.service_fee && errors2.service_fee && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.service_fee}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Session Duration
                                        </label>
                                        <p className="text-[11px] text-gray-500 mb-1">
                                            How long does one session usually take?
                                        </p>
                                        <select
                                            name="duration"
                                            value={form2.duration}
                                            onChange={handleForm2Change("duration")}
                                            onBlur={() => {
                                                markTouched2("duration");
                                                validateStep2Field("duration");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                "duration"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        >
                                            <option value="">Select duration</option>
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                                n => (
                                                    <option
                                                        key={n}
                                                        value={n === 1 ? "1 hour" : `${n} hours`}
                                                    >
                                                        {n === 1 ? "1 hour" : `${n} hours`}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {touched2.duration && errors2.duration && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.duration}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                        Payment Method
                                    </label>
                                    <p className="text-[11px] text-gray-500 mb-1">
                                        Select how clients can pay you.
                                    </p>
                                    <select
                                        name="payment"
                                        value={form2.payment}
                                        onChange={e => {
                                            handleForm2Change("payment")(e);
                                            setForm2(prev => ({
                                                ...prev,
                                                payment_provider: "",
                                                payment_handle: ""
                                            }));
                                        }}
                                        onBlur={() => {
                                            markTouched2("payment");
                                            validateStep2Field("payment");
                                        }}
                                        className={`w-full h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                            "payment"
                                        )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                        required
                                    >
                                        <option value="">Select payment method</option>
                                        <option value="cash">Cash</option>
                                        <option value="online">Online Payment</option>
                                    </select>
                                    {touched2.payment && errors2.payment && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors2.payment}
                                        </p>
                                    )}

                                    {form2.payment === "online" && (
                                        <div className="mt-3 space-y-3">
                                            <div>
                                                <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                                    Online Provider
                                                </label>
                                                <select
                                                    name="payment_provider"
                                                    value={form2.payment_provider}
                                                    onChange={handleForm2Change(
                                                        "payment_provider"
                                                    )}
                                                    onBlur={() => {
                                                        markTouched2("payment_provider");
                                                        validateStep2Field("payment_provider");
                                                    }}
                                                    className={`w-full h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                        "payment_provider"
                                                    )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                    required
                                                >
                                                    <option value="">Select provider</option>
                                                    <option value="gcash">GCash</option>
                                                    <option value="maya">Maya</option>
                                                    <option value="paypal">PayPal</option>
                                                </select>
                                                {touched2.payment_provider &&
                                                    errors2.payment_provider && (
                                                        <p className="text-xs text-red-600 mt-1">
                                                            {errors2.payment_provider}
                                                        </p>
                                                    )}
                                            </div>

                                            <div>
                                                <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                                    {paymentHandleLabel}
                                                </label>
                                                <input
                                                    type={
                                                        form2.payment_provider === "paypal"
                                                            ? "email"
                                                            : "text"
                                                    }
                                                    name="payment_handle"
                                                    placeholder={
                                                        form2.payment_provider === "paypal"
                                                            ? "your-email@example.com"
                                                            : "09XXXXXXXXX"
                                                    }
                                                    value={form2.payment_handle}
                                                    onChange={handleForm2Change(
                                                        "payment_handle"
                                                    )}
                                                    onBlur={() => {
                                                        markTouched2("payment_handle");
                                                        validateStep2Field("payment_handle");
                                                    }}
                                                    className={`w-full h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                        "payment_handle"
                                                    )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                    required
                                                />
                                                {paymentHandleHelp && (
                                                    <p className="text-[11px] text-gray-500 mt-1">
                                                        {paymentHandleHelp}
                                                    </p>
                                                )}
                                                {touched2.payment_handle &&
                                                    errors2.payment_handle && (
                                                        <p className="text-xs text-red-600 mt-1">
                                                            {errors2.payment_handle}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Minimum Notice Required
                                        </label>
                                        <p className="text-[11px] text-gray-500 mb-2">
                                            How far in advance should clients notify you?
                                        </p>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    name="notice_hours"
                                                    value={form2.notice_hours}
                                                    onChange={handleNoticeHoursChange}
                                                    onBlur={() => {
                                                        markTouched2("notice_hours");
                                                        validateStep2Field("notice_hours");
                                                    }}
                                                    className={`w-24 h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                        "notice_hours"
                                                    )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                    min={1}
                                                    max={99}
                                                />
                                                <span className="text-gray-600 text-sm">
                                                    Hours
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    name="notice_days"
                                                    value={form2.notice_days}
                                                    onChange={handleNoticeDaysChange}
                                                    onBlur={() => {
                                                        markTouched2("notice_days");
                                                        validateStep2Field("notice_days");
                                                    }}
                                                    className={`w-24 h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                        "notice_days"
                                                    )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                                    min={1}
                                                    max={30}
                                                />
                                                <span className="text-gray-600 text-sm">
                                                    Days
                                                </span>
                                            </div>
                                        </div>
                                        {touched2.notice_hours && errors2.notice_hours && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.notice_hours}
                                            </p>
                                        )}
                                        {touched2.notice_days && errors2.notice_days && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.notice_days}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Cancellation / Rescheduling Method
                                        </label>
                                        <input
                                            type="email"
                                            name="method"
                                            placeholder="@gmail.com"
                                            value={form2.method}
                                            onChange={handleForm2Change("method")}
                                            onBlur={() => {
                                                markTouched2("method");
                                                validateStep2Field("method");
                                            }}
                                            className={`w-full h-11 px-3 bg-white text-black border rounded-lg ${inputBorderClass2(
                                                "method"
                                            )} focus:outline-none focus:ring-2 focus:ring-black/60`}
                                            required
                                        />
                                        {touched2.method && errors2.method && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.method}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Upload Portfolio
                                        </label>
                                        <p className="text-[11px] text-gray-500">
                                            Accepted: PDF, JPG, PNG
                                        </p>
                                        <div
                                            className={dropzoneClasses(
                                                !!(portfolio.file || portfolio.preview)
                                            )}
                                            onClick={() =>
                                                document
                                                    .getElementById("portfolio_input")
                                                    ?.click()
                                            }
                                        >
                                            {!portfolio.name && !portfolio.preview && (
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl text-gray-400">
                                                        ⛅
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        Drag &amp; drop or click to upload
                                                    </p>
                                                </div>
                                            )}

                                            {portfolio.preview && (
                                                <div className="w-full">
                                                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-white">
                                                        <div className="aspect-4/3 w-full">
                                                            <img
                                                                src={portfolio.preview}
                                                                alt={portfolio.name}
                                                                className="w-full h-full object-contain bg-gray-50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-3 mt-2 text-xs">
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                document
                                                                    .getElementById("portfolio_input")
                                                                    ?.click();
                                                            }}
                                                            className="text-gray-900 font-semibold hover:underline"
                                                        >
                                                            Change
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleRemoveFile("portfolio");
                                                            }}
                                                            className="text-red-600 font-semibold hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {portfolio.file &&
                                                !portfolio.preview &&
                                                portfolio.name && (
                                                    <div className="flex items-center justify-between w-full bg-gray-50 rounded px-3 py-2 border border-gray-200 text-xs">
                                                        <span className="truncate text-gray-900">
                                                            {portfolio.name}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500 uppercase">
                                                            {portfolio.ext}
                                                        </span>
                                                    </div>
                                                )}

                                            <input
                                                id="portfolio_input"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                className="hidden"
                                                onChange={handleFileChange(
                                                    "portfolio",
                                                    false
                                                )}
                                            />
                                        </div>
                                        {touched2.portfolio && errors2.portfolio && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.portfolio}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Valid Government ID (image)
                                        </label>
                                        <div
                                            className={dropzoneClasses(
                                                !!(validId.file || validId.preview)
                                            )}
                                            onClick={() =>
                                                document
                                                    .getElementById("validid_input")
                                                    ?.click()
                                            }
                                        >
                                            {!validId.preview && (
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl text-gray-400">
                                                        🪪
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        Click to upload your ID (front)
                                                    </p>
                                                    <p className="text-[11px] text-gray-500">
                                                        Accepted: JPG, PNG
                                                    </p>
                                                </div>
                                            )}

                                            {validId.preview && (
                                                <div className="w-full">
                                                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-white">
                                                        <div className="aspect-4/3 w-full">
                                                            <img
                                                                src={validId.preview}
                                                                alt="ID preview"
                                                                className="w-full h-full object-contain bg-gray-50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-3 mt-2 text-xs">
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                document
                                                                    .getElementById("validid_input")
                                                                    ?.click();
                                                            }}
                                                            className="text-gray-900 font-semibold hover:underline"
                                                        >
                                                            Change
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleRemoveFile("validId");
                                                            }}
                                                            className="text-red-600 font-semibold hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <input
                                                id="validid_input"
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                className="hidden"
                                                onChange={handleFileChange("validId", true)}
                                            />
                                        </div>
                                        {touched2.valid_id && errors2.valid_id && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.valid_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[11px] sm:text-xs font-semibold text-gray-800 mb-1">
                                            Photo of You Holding the Same ID
                                        </label>
                                        <p className="text-[11px] text-gray-600">
                                            Take a selfie holding your ID and a paper with{" "}
                                            <span className="font-semibold">
                                                {todayLabel}
                                            </span>{" "}
                                            and your full name.
                                        </p>
                                        <div
                                            className={dropzoneClasses(
                                                !!(idSelfie.file || idSelfie.preview)
                                            )}
                                            onClick={() =>
                                                document
                                                    .getElementById("idselfie_input")
                                                    ?.click()
                                            }
                                        >
                                            {!idSelfie.preview && (
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-3xl text-gray-400">
                                                        📷
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        Click to upload your selfie with the ID
                                                    </p>
                                                    <p className="text-[11px] text-gray-500">
                                                        Accepted: JPG, PNG
                                                    </p>
                                                </div>
                                            )}

                                            {idSelfie.preview && (
                                                <div className="w-full">
                                                    <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-white">
                                                        <div className="aspect-4/3 w-full">
                                                            <img
                                                                src={idSelfie.preview}
                                                                alt="Selfie preview"
                                                                className="w-full h-full object-contain bg-gray-50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end gap-3 mt-2 text-xs">
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                document
                                                                    .getElementById("idselfie_input")
                                                                    ?.click();
                                                            }}
                                                            className="text-gray-900 font-semibold hover:underline"
                                                        >
                                                            Change
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleRemoveFile("idSelfie");
                                                            }}
                                                            className="text-red-600 font-semibold hover:underline"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <input
                                                id="idselfie_input"
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                className="hidden"
                                                onChange={handleFileChange("idSelfie", true)}
                                            />
                                        </div>
                                        {touched2.id_selfie && errors2.id_selfie && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors2.id_selfie}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        checked={form2.terms}
                                        onChange={handleForm2Change("terms")}
                                        onBlur={() => {
                                            markTouched2("terms");
                                            validateStep2Field("terms");
                                        }}
                                        className="mt-0.5 h-4 w-4 rounded border-gray-400 bg-white text-black focus:ring-black focus:ring-offset-0"
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-[11px] sm:text-xs text-gray-700"
                                    >
                                        I accept the{" "}
                                        <span className="font-semibold underline">
                                            Terms and Conditions
                                        </span>
                                        .
                                    </label>
                                </div>
                                {touched2.terms && errors2.terms && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors2.terms}
                                    </p>
                                )}

                                <div className="pt-1 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs sm:text-sm text-gray-800"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isStep2Valid || isSubmitting}
                                        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        <span>{isSubmitting ? "Submitting…" : "Submit"}</span>
                                    </button>
                                </div>
                            </section>
                        )}
                    </form>

                    <p className="mt-4 text-center text-[11px] text-gray-500">
                        © {currentYear} Groove. All rights reserved.
                    </p>
                </main>
            </div>
        </div>
    );
};

export default CoachRegistration;
