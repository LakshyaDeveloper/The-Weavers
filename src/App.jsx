import { useState, useRef, useEffect } from "react";
import {
    X, UploadCloud, Send, CheckCircle2, Smartphone, Landmark,
    CreditCard, ArrowLeft, TrendingUp, TrendingDown, Minus, MapPin, Plus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock data — mirrors backend/app/seed.py                             */
/* ------------------------------------------------------------------ */

// Category & Hero Images (verified direct Unsplash CDN links)
const IMG_EMBROIDERY_HERO = "https://images.unsplash.com/photo-1476683874822-744764a2438f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_EMBROIDERY = "https://images.unsplash.com/photo-1622378158084-f2221260e688?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_WEAVING = "https://images.unsplash.com/photo-1597371140946-cfd3dd5a76b9?q=80&w=893&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_DRAPING = "https://images.unsplash.com/photo-1444362408440-274ecb6fc730?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_CROCHET = "https://images.unsplash.com/photo-1700171458554-46cfd3f2a87a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_FABRIC_ROLLS = "https://images.unsplash.com/photo-1705250466297-90035b3a2b26?q=80&w=777&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Unique Artist Profile Images (verified direct Unsplash CDN links)
const IMG_ARTIST_MEERA = "https://images.unsplash.com/photo-1592169138776-7c9211066fc8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_ARTIST_RAMESH = "https://images.unsplash.com/photo-1699413027553-031dc8586538?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_ARTIST_FATIMA = "https://images.unsplash.com/photo-1764874299178-a56feb233295?q=80&w=903&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Unique Blog Post Cover Images (verified direct Unsplash CDN links)
const IMG_BLOG_MEERA = "https://images.unsplash.com/photo-1571726528623-534cec3cb31e?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_BLOG_RAMESH = "https://images.unsplash.com/photo-1782232191600-6952e0044e60?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const IMG_BLOG_FATIMA = "https://images.unsplash.com/photo-1581345837522-cc359ece37a1?q=80&w=855&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const CATEGORIES = [
    { title: "Embroidery", desc: "Hand-stitched textile artistry from local artisans.", img: IMG_EMBROIDERY },
    { title: "Hand Loom Weaving", desc: "Traditional looms turning thread into fabric.", img: IMG_WEAVING },
    { title: "Draping", desc: "Fluid fabric styling shaped by skilled hands.", img: IMG_DRAPING },
    { title: "Crocheting", desc: "Looped yarn crafted into wearable art.", img: IMG_CROCHET },
];

const QUOTES = [
    { text: "Fashion should be a form of escapism, not a form of imprisonment.", author: "Alexander McQueen" },
    { text: "Fashion is not something that exists in dresses only.", author: "Coco Chanel" },
    { text: "Clothes mean nothing until someone lives in them.", author: "Marc Jacobs" },
];

const ARTISTS = [
    {
        id: 1, name: "Meera Nair", craft: "Embroidery Artisan, 15 years", location: "Lucknow, India",
        badge: "LXHG14kZq",
        img: IMG_ARTIST_MEERA, // Meera Nair (Embroidery)
        expertise: "Hand embroidery, Chikankari, and thread portraiture on cotton and silk.",
        fabricRequirement: "2 cotton shirts (or equivalent 1.5m fabric) for 1 embroidered scarf.",
        services: [
            { name: "Embroidery", min: 400, max: null, fabric: "1 cotton shirt (min)" },
            { name: "Tote Bag", min: 600, max: 700, fabric: "1m plain cotton fabric" },
            { name: "Chikankari Kurta", min: 1200, max: 1800, fabric: "2.5m cotton/muslin fabric" },
        ],
    },
    {
        id: 2, name: "Ramesh Koli", craft: "Handloom Weaver, Varanasi", location: "Varanasi, India",
        badge: "m2rxQdchf",
        img: IMG_ARTIST_RAMESH, // Ramesh Koli (Handloom Weaver)
        expertise: "Traditional pit-loom Banarasi weaving with silk and zari thread.",
        fabricRequirement: "3kg raw silk yarn for 1 Banarasi saree length.",
        services: [
            { name: "Banarasi Saree", min: 4500, max: 9000, fabric: "3kg raw silk yarn" },
            { name: "Silk Stole", min: 900, max: 1400, fabric: "500g raw silk yarn" },
        ],
    },
    {
        id: 3, name: "Fatima Sheikh", craft: "Draping Artist, Jaipur", location: "Jaipur, India",
        badge: "FJvkdNf6J",
        img: IMG_ARTIST_FATIMA, // Fatima Sheikh (Draping Artist)
        expertise: "Fluid drape styling and structural garment draping for occasion wear.",
        fabricRequirement: "1 saree-length fabric (5.5m) per draped garment.",
        services: [
            { name: "Draped Gown", min: 2000, max: 3500, fabric: "5.5m flowing fabric (georgette/chiffon)" },
            { name: "Saree Pre-draping", min: 500, max: 800, fabric: "1 saree (customer-provided)" },
        ],
    },
];

const RETAILERS = [
    {
        id: 1, name: "Ganga Textile Traders", location: "Varanasi, India",
        description: "Bulk buyer of cotton and silk offcuts for recycled yarn production.",
        img: IMG_FABRIC_ROLLS, // Ganga Textile Traders
        materials: [
            { name: "Cotton offcuts", price: "₹35–45 / kg" },
            { name: "Silk scraps", price: "₹120–160 / kg" },
        ],
    },
    {
        id: 2, name: "Jaipur Fabric Co-op", location: "Jaipur, India",
        description: "Community co-operative trading surplus block-print and cotton fabric.",
        img: IMG_EMBROIDERY_HERO, // Jaipur Fabric Co-op
        materials: [
            { name: "Block-print surplus", price: "₹60–80 / kg" },
            { name: "Cotton offcuts", price: "₹30–40 / kg" },
        ],
    },
    {
        id: 3, name: "Surat Weave Exchange", location: "Surat, India",
        description: "Industrial-scale exchange for synthetic and blended fabric surplus.",
        img: IMG_WEAVING, // Surat Weave Exchange
        materials: [
            { name: "Polyester blends", price: "₹20–30 / kg" },
            { name: "Synthetic offcuts", price: "₹18–25 / kg" },
        ],
    },
];

const PRICE_CHART = [
    { material: "Cotton", price: 38, trend: "up" },
    { material: "Silk", price: 140, trend: "stable" },
    { material: "Wool", price: 95, trend: "down" },
    { material: "Polyester", price: 24, trend: "stable" },
    { material: "Linen", price: 110, trend: "up" },
    { material: "Block-print", price: 70, trend: "stable" },
];

const BLOG_POSTS = [
    {
        id: 1, author: "Meera Nair", role: "Embroidery Artisan, 15 years",
        img: IMG_BLOG_MEERA, // Meera Nair blog cover
        avatarImg: IMG_ARTIST_MEERA, // Meera Nair profile picture
        title: "Threads My Grandmother Left Behind",
        excerpt: "My grandmother wove until her last day, and every stitch I make still carries her hand.",
        content:
            "My grandmother wove until her last day. She used to say a needle remembers every hand that has ever held it, and I believe her. I learned Chikankari sitting cross-legged on her verandah, watching thread turn into flowers under fingers that never seemed to hurry.\n\nWhen she passed, I inherited her hoop, her thimble, and a half-finished dupatta with a single unfinished rose. I have never finished that rose. I don't think I ever will. Some things are more valuable left incomplete, a reminder of the hands that came before mine.\n\nEvery commission I take today is, in some small way, a continuation of her work. When a customer sends me a photograph and a story, I think of her asking: whose hands will hold this next?",
    },
    {
        id: 2, author: "Ramesh Koli", role: "Handloom Weaver, Varanasi",
        img: IMG_BLOG_RAMESH, // Ramesh Koli blog cover
        avatarImg: IMG_ARTIST_RAMESH, // Ramesh Koli profile picture
        title: "The Loom That Never Stops",
        excerpt: "My grandfather wove until his last day, and the loom in our courtyard has not gone quiet since.",
        content:
            "My grandfather wove until his last day. The pit loom in our courtyard has not gone quiet since the day it was built, three generations of Kolis have sat at its bench, throwing the same shuttle back and forth across the same warp.\n\nWeaving a Banarasi saree takes anywhere from two weeks to three months, depending on the complexity of the zari work. People ask me if it gets tedious. I tell them: watch a river for long enough and you will see it is never the same river twice. The loom is like that. Every saree is a different river.\n\nWhat worries me is not the tedium, but the silence that might come after us. Fewer young weavers sit at the bench each year. That is why platforms like this matter: they let someone in Delhi see the hands that made what they are wearing.",
    },
    {
        id: 3, author: "Fatima Sheikh", role: "Draping Artist, Jaipur",
        img: IMG_BLOG_FATIMA, // Fatima Sheikh blog cover
        avatarImg: IMG_ARTIST_FATIMA, // Fatima Sheikh profile picture
        title: "Draping as Language",
        excerpt: "A saree is six yards of possibility, and every fold is a sentence in a language older than words.",
        content:
            "A saree is six yards of possibility. Long before I had words for what I wanted to say, I was saying it in pleats. Draping is a language older than words, a Nivi drape says something different from a Bengali drape, and both say something different from the way my mother wore hers to weddings.\n\nPeople come to me holding fabric they inherited, unsure what to do with it. I ask them questions that have nothing to do with cloth: where are you going, who will be there, how do you want to feel when you walk in. The drape follows the answer.\n\nI studied structural draping for years, but the real education came from watching women in my family get ready for occasions, fast, practical, exact. Fashion should be a form of expression, never a performance you have to rehearse.",
    },
];

const CURRENT_USER = {
    username: "Kumar Lakshya", role: "Customer", email: "kumar.lakshya@example.com",
    phone: "+91 98765 43210", location: "Delhi, India",
};

const INITIAL_ORDERS = [
    {
        id: 1, code: "10432", item: "Chikankari Kurta", seller: "Meera Nair",
        request: "Looking for a hand-embroidered kurta in off-white cotton, floral pattern along the collar and sleeves.",
        price: 1500, status: "in_progress", estDelivery: "July 22, 2026",
        messages: [
            { from: "customer", name: "You", text: "Hi Meera, just checking on progress for the kurta!" },
            { from: "seller", name: "Meera Nair", text: "Hello! The collar embroidery is done, working on the sleeves now. Should be ready in 5 days." },
        ],
    },
    {
        id: 2, code: "10401", item: "Banarasi Saree", seller: "Ramesh Koli",
        request: "Requesting a deep maroon Banarasi saree with gold zari border, for a wedding function.",
        price: 6500, status: "delivered", estDelivery: "June 30, 2026",
        messages: [
            { from: "customer", name: "You", text: "The saree arrived, it's beautiful! Thank you so much." },
            { from: "seller", name: "Ramesh Koli", text: "So glad you liked it! It was an honor weaving it." },
        ],
    },
];

const STATUS_STYLES = {
    pending: "bg-amber-200 text-stone-800",
    in_progress: "bg-amber-200 text-stone-800",
    delivered: "bg-amber-800 text-amber-50",
    paid: "bg-emerald-700 text-white",
};
const STATUS_LABELS = { pending: "Pending", in_progress: "In Progress", delivered: "Delivered", paid: "Paid" };
const TREND_ICON = { up: TrendingUp, down: TrendingDown, stable: Minus };

/* ------------------------------------------------------------------ */
/* Shared Modal shell                                                  */
/* ------------------------------------------------------------------ */

function Modal({ open, onClose, children, maxWidth = "max-w-xl" }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/50" onClick={onClose} />
            <div className={`relative w-full ${maxWidth} max-h-[92vh] overflow-y-auto overscroll-contain rounded-2xl bg-amber-50 shadow-2xl border border-amber-200`}>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-amber-100 text-stone-800 hover:bg-amber-800 hover:text-amber-50 transition-colors"
                >
                    <X size={18} />
                </button>
                {children}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Blog Modal                                                          */
/* ------------------------------------------------------------------ */

function BlogModal({ open, onClose, post }) {
    if (!post) return null;
    return (
        <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
            <div className="px-8 py-8">
                <h2 className="font-serif text-3xl font-semibold leading-tight text-stone-900">{post.title}</h2>
                <div className="mt-4 flex items-center gap-3">
                    <img src={post.avatarImg || post.img} alt={post.author} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                        <p className="text-sm font-medium text-stone-900">{post.author}</p>
                        <p className="text-xs text-stone-500">{post.role}</p>
                    </div>
                </div>
                <div className="mt-6 space-y-4 border-t border-amber-200 pt-6">
                    {post.content.split("\n\n").map((p, i) => (
                        <p key={i} className="text-[15px] leading-relaxed text-stone-800">{p}</p>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

/* ------------------------------------------------------------------ */
/* Artist Modal (order bracket)                                        */
/* ------------------------------------------------------------------ */

function ArtistModal({ open, onClose, artist, onOrderCreated }) {
    const [preview, setPreview] = useState(null);
    const [need, setNeed] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    if (!artist) return null;

    const reset = () => { setPreview(null); setNeed(""); setSent(false); setError(null); };
    const close = () => { reset(); onClose(); };

    const handleFile = (e) => {
        const f = e.target.files?.[0];
        if (f) setPreview(URL.createObjectURL(f));
    };

    const handleSend = () => {
        if (!need.trim()) { setError("Please describe what you need before sending."); return; }
        setError(null);
        onOrderCreated({
            item: `${artist.craft.split(",")[0]} request`, seller: artist.name, request: need,
        });
        setSent(true);
    };

    return (
        <Modal open={open} onClose={close} maxWidth="max-w-xl">
            <div className="p-8">
                <div className="flex items-center gap-4">
                    <img src={artist.img} alt={artist.name} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                    <div>
                        <h2 className="font-serif text-2xl font-semibold text-stone-900">{artist.name}</h2>
                        <p className="text-sm text-stone-500">{artist.craft}</p>
                        <p className="text-xs text-stone-400 flex items-center gap-1"><MapPin size={12} />{artist.location}</p>
                    </div>
                </div>

                <section className="mt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Expertise</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-700">{artist.expertise}</p>
                </section>

                <section className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Fabric Requirement</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-700">{artist.fabricRequirement}</p>
                </section>

                <section className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Service Price</h3>
                    <div className="mt-2 space-y-2">
                        {artist.services.map((svc) => (
                            <div key={svc.name} className="flex items-center justify-between rounded-xl bg-amber-100 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-stone-900">{svc.name}</p>
                                    <p className="text-xs text-stone-500">Required fabric: {svc.fabric}</p>
                                </div>
                                <p className="font-serif text-sm font-semibold text-amber-900">
                                    ₹{svc.min}{svc.max ? `–${svc.max}` : ""}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-100/60 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Order Bracket</h3>
                    {sent ? (
                        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-4 text-sm text-stone-800">
                            <CheckCircle2 size={18} className="text-amber-800 shrink-0" />
                            Your request was sent to {artist.name}. Check Your Profile to track it.
                        </div>
                    ) : (
                        <>
                            <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-6 text-center hover:border-amber-600 transition-colors">
                                {preview ? (
                                    <img src={preview} alt="Fabric preview" className="h-24 w-24 rounded-lg object-cover" />
                                ) : (
                                    <>
                                        <UploadCloud size={22} className="text-stone-400" />
                                        <span className="text-xs text-stone-500">Upload a picture of your fabric</span>
                                    </>
                                )}
                                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                            </label>
                            <textarea
                                value={need}
                                onChange={(e) => setNeed(e.target.value)}
                                placeholder="Describe what you'd like made, sizing, colors, or any specific request..."
                                rows={3}
                                className="mt-3 w-full resize-none rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                            />
                            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                            <button
                                onClick={handleSend}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800 px-4 py-3 text-sm font-medium text-amber-50 hover:bg-amber-900 transition-colors"
                            >
                                <Send size={16} /> Send to Artist
                            </button>
                        </>
                    )}
                </section>
            </div>
        </Modal>
    );
}

/* ------------------------------------------------------------------ */
/* Exchange Modal (retailer)                                           */
/* ------------------------------------------------------------------ */

function ExchangeModal({ open, onClose, retailer, onOrderCreated }) {
    const [preview, setPreview] = useState(null);
    const [need, setNeed] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    if (!retailer) return null;

    const reset = () => { setPreview(null); setNeed(""); setSent(false); setError(null); };
    const close = () => { reset(); onClose(); };

    const handleFile = (e) => {
        const f = e.target.files?.[0];
        if (f) setPreview(URL.createObjectURL(f));
    };

    const handleSend = () => {
        if (!need.trim()) { setError("Please describe your negotiation or need before sending."); return; }
        setError(null);
        onOrderCreated({
            item: `Fabric exchange with ${retailer.name}`, seller: retailer.name, request: need,
        });
        setSent(true);
    };

    return (
        <Modal open={open} onClose={close} maxWidth="max-w-xl">
            <div className="p-8">
                <div className="flex items-center gap-4">
                    <img src={retailer.img} alt={retailer.name} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                    <div>
                        <h2 className="font-serif text-2xl font-semibold text-stone-900">{retailer.name}</h2>
                        <p className="text-sm text-stone-500">{retailer.location}</p>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-stone-700">{retailer.description}</p>

                <section className="mt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Exchange Material</h3>
                    <div className="mt-2 space-y-2">
                        {retailer.materials.map((m) => (
                            <div key={m.name} className="flex items-center justify-between rounded-xl bg-amber-100 px-4 py-3">
                                <p className="text-sm font-medium text-stone-900">{m.name}</p>
                                <p className="font-serif text-sm font-semibold text-amber-900">{m.price}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-2 text-[11px] text-stone-400">Estimated Price reflects current market rate; final price confirmed after inspection.</p>
                </section>

                <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-100/60 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Exchange Bracket</h3>
                    {sent ? (
                        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-4 text-sm text-stone-800">
                            <CheckCircle2 size={18} className="text-amber-800 shrink-0" />
                            Your exchange request was sent to {retailer.name}. Check Your Profile to track it.
                        </div>
                    ) : (
                        <>
                            <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-6 text-center hover:border-amber-600 transition-colors">
                                {preview ? (
                                    <img src={preview} alt="Fabric preview" className="h-24 w-24 rounded-lg object-cover" />
                                ) : (
                                    <>
                                        <UploadCloud size={22} className="text-stone-400" />
                                        <span className="text-xs text-stone-500">Upload a picture of your fabric</span>
                                    </>
                                )}
                                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                            </label>
                            <textarea
                                value={need}
                                onChange={(e) => setNeed(e.target.value)}
                                placeholder="Describe the quantity, material, and price you're proposing..."
                                rows={3}
                                className="mt-3 w-full resize-none rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                            />
                            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
                            <button
                                onClick={handleSend}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800 px-4 py-3 text-sm font-medium text-amber-50 hover:bg-amber-900 transition-colors"
                            >
                                <Send size={16} /> Send
                            </button>
                        </>
                    )}
                </section>
            </div>
        </Modal>
    );
}

/* ------------------------------------------------------------------ */
/* Order Details Modal (chat + conditional pay -> checkout)            */
/* ------------------------------------------------------------------ */

function OrderDetailsModal({ open, onClose, order, onStatusChange }) {
    const [view, setView] = useState("details");
    const [messages, setMessages] = useState(order?.messages || []);
    const [draft, setDraft] = useState("");
    const [method, setMethod] = useState("upi");
    const [paying, setPaying] = useState(false);
    const chatEnd = useRef(null);

    useEffect(() => {
        if (open && order) { setMessages(order.messages || []); setView("details"); }
    }, [open, order]);

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, view]);

    if (!order) return null;
    const isDelivered = order.status === "delivered";
    const isPaid = order.status === "paid";

    const sendMsg = () => {
        if (!draft.trim()) return;
        setMessages((prev) => [...prev, { from: "customer", name: "You", text: draft }]);
        setDraft("");
    };

    const pay = () => {
        setPaying(true);
        setTimeout(() => {
            onStatusChange(order.id, "paid");
            setPaying(false);
            setView("paid");
        }, 700);
    };

    return (
        <Modal open={open} onClose={onClose} maxWidth="max-w-xl">
            <div className="p-8">
                {view === "details" && (
                    <>
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="font-serif text-2xl font-semibold text-stone-900">{order.item}</h2>
                                <p className="text-xs text-stone-400">Order #{order.code} · {order.seller}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}>
                                {STATUS_LABELS[order.status]}
                            </span>
                        </div>

                        <section className="mt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Order Request</h3>
                            <p className="mt-1 text-sm leading-relaxed text-stone-700">{order.request}</p>
                        </section>

                        <section className="mt-4">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Est. Delivery Date</h3>
                            <p className="mt-1 text-sm text-stone-700">{order.estDelivery || "To be confirmed"}</p>
                        </section>

                        <section className="mt-6">
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Seller Query (Chat)</h3>
                            <div className="mt-2 max-h-56 space-y-3 overflow-y-auto rounded-2xl border border-amber-200 bg-amber-100/60 p-4">
                                {messages.length === 0 && <p className="text-xs text-stone-400">No messages yet — say hello!</p>}
                                {messages.map((m, i) => (
                                    <div key={i} className={`flex ${m.from === "customer" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${m.from === "customer" ? "bg-amber-800 text-amber-50" : "bg-amber-50 text-stone-800 border border-amber-200"
                                            }`}>
                                            <p>{m.text}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEnd} />
                            </div>
                            <div className="mt-2 flex gap-2">
                                <input
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                                    placeholder="Type a message..."
                                    className="flex-1 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                                />
                                <button onClick={sendMsg} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-800 text-amber-50 hover:bg-amber-900">
                                    <Send size={16} />
                                </button>
                            </div>
                        </section>

                        <div className="mt-6">
                            {isPaid ? (
                                <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700/10 px-4 py-3 text-sm text-emerald-800">
                                    <CheckCircle2 size={16} /> Payment complete
                                </div>
                            ) : (
                                <button
                                    onClick={() => isDelivered && setView("checkout")}
                                    disabled={!isDelivered}
                                    title={!isDelivered ? "Available once your order is marked Delivered" : ""}
                                    className="w-full rounded-xl bg-amber-800 px-4 py-3 text-sm font-medium text-amber-50 transition-colors hover:bg-amber-900 disabled:cursor-not-allowed disabled:bg-amber-200 disabled:text-stone-400"
                                >
                                    {isDelivered ? `PAY ₹${order.price}` : "PAY (available after delivery)"}
                                </button>
                            )}
                        </div>
                    </>
                )}

                {view === "checkout" && (
                    <div>
                        <button onClick={() => setView("details")} className="flex items-center gap-1 text-xs text-stone-400 hover:text-amber-800">
                            <ArrowLeft size={14} /> Back to order
                        </button>
                        <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-900">Checkout</h2>
                        <p className="mt-1 text-sm text-stone-400">Order #{order.code} · {order.item}</p>

                        <div className="mt-6 rounded-xl bg-amber-100 px-4 py-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-stone-700">Amount due</span>
                                <span className="font-serif text-lg font-semibold text-amber-900">₹{order.price}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            {[
                                { id: "upi", label: "UPI", icon: Smartphone, hint: "Pay via any UPI app" },
                                { id: "netbanking", label: "Net Banking", icon: Landmark, hint: "Pay via your bank account" },
                                { id: "card", label: "Credit Card", icon: CreditCard, hint: "Visa, Mastercard, RuPay" },
                            ].map(({ id, label, icon: Icon, hint }) => (
                                <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${method === id ? "border-amber-700 bg-amber-100" : "border-amber-200 bg-amber-50 hover:bg-amber-100/60"
                                    }`}>
                                    <input type="radio" name="method" checked={method === id} onChange={() => setMethod(id)} className="accent-amber-800" />
                                    <Icon size={18} className="text-amber-900" />
                                    <div>
                                        <p className="text-sm font-medium text-stone-900">{label}</p>
                                        <p className="text-xs text-stone-400">{hint}</p>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={pay}
                            disabled={paying}
                            className="mt-6 w-full rounded-xl bg-amber-800 px-4 py-3 text-sm font-medium text-amber-50 hover:bg-amber-900 disabled:opacity-60"
                        >
                            {paying ? "Processing..." : `Pay ₹${order.price}`}
                        </button>
                    </div>
                )}

                {view === "paid" && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <CheckCircle2 size={48} className="text-emerald-600" />
                        <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-900">Payment successful</h2>
                        <p className="mt-2 text-sm text-stone-400">₹{order.price} paid for Order #{order.code}.</p>
                        <button onClick={onClose} className="mt-6 rounded-xl bg-amber-800 px-6 py-2.5 text-sm font-medium text-amber-50 hover:bg-amber-900">
                            Done
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
}

/* ------------------------------------------------------------------ */
/* Pages                                                                */
/* ------------------------------------------------------------------ */

function Navbar({ page, setPage, userRole, setUserRole }) {
    const links = [
        ["home", "Home"], ["blog", "The Untold Tales"], ["artists", "Artist Center"],
        ["exchange", "Exchange Center"], ["profile", "Your Profile"],
    ];
    return (
        <nav className="sticky top-0 z-40 flex items-center justify-between bg-amber-50 px-8 py-4 shadow-sm">
            <span className="font-cursive text-3xl text-stone-900">The Weavers</span>
            <div className="flex items-center gap-6">
                {links.map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setPage(key)}
                        className={`font-serif text-sm transition-colors ${page === key ? "text-amber-800 font-semibold" : "text-stone-600 hover:text-amber-800"}`}
                    >
                        {label}
                    </button>
                ))}
                <button
                    onClick={() => setUserRole((r) => (r === "Artist" ? "Customer" : "Artist"))}
                    title="Toggle role to preview Artist-only features"
                    className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 hover:bg-amber-200"
                >
                    Viewing as: {userRole}
                </button>
            </div>
        </nav>
    );
}

function QuoteCarousel() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % QUOTES.length);
                setVisible(true);
            }, 300);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const goTo = (i) => {
        if (i === index) return;
        setVisible(false);
        setTimeout(() => {
            setIndex(i);
            setVisible(true);
        }, 300);
    };

    const quote = QUOTES[index];

    return (
        <div className="border-b border-amber-200 bg-amber-100/70 px-8 py-6">
            <div className="mx-auto max-w-2xl overflow-hidden">
                <div
                    className="rounded-2xl bg-amber-50 px-8 py-6 text-center shadow-md transition-all duration-300 ease-in-out"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateX(0)" : "translateX(24px)",
                    }}
                >
                    <p className="font-serif text-xl italic text-stone-800">&ldquo;{quote.text}&rdquo;</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-amber-800">{quote.author}</p>
                </div>

                <div className="mt-3 flex justify-center gap-1.5">
                    {QUOTES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Show quote ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-amber-800" : "w-1.5 bg-amber-300"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-amber-950 px-8 pb-10 pt-14 text-amber-50">
            <p className="font-cursive text-center text-2xl text-amber-50/95 sm:text-3xl">
                Every Fabric reused counts as one more clear breath on Earth.
            </p>

            <div className="mx-auto mt-10 max-w-5xl border-t border-amber-100/20 pt-6">
                <p className="font-serif text-xl italic">The Weavers</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                    <div className="flex gap-6 text-amber-100/80">
                        <span>Home</span><span>The Untold Tales</span><span>Artist Center</span><span>Exchange Center</span>
                    </div>
                    <span className="text-amber-100/50">© 2026 The Weavers</span>
                </div>
            </div>
        </footer>
    );
}

function HomePage() {
    return (
        <div>
            <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
                <img
                    src={IMG_EMBROIDERY_HERO}
                    alt="Hand-stitched textured fabric"
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
                />
                <h1 className="relative font-cursive text-6xl text-white drop-shadow-lg sm:text-7xl">The Weavers</h1>
            </div>

            <QuoteCarousel />

            <section className="px-8 py-16 text-center">
                <h2 className="font-serif text-3xl italic font-semibold text-stone-900">What would you like to explore?</h2>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {CATEGORIES.map((c) => (
                        <div key={c.title} className="overflow-hidden rounded-2xl bg-amber-100 text-left shadow-md">
                            <img src={c.img} alt={c.title} className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <p className="font-serif font-bold text-xl text-stone-900">{c.title}</p>
                                <p className="mt-1 text-sm text-stone-500">{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

function BlogPage({ posts, onOpen, onNewBlog, isArtist }) {
    return (
        <div className="px-8 py-12">
            <div className="flex items-center justify-between">
                <h1 className="font-serif text-4xl italic text-stone-900">The Untold Tales</h1>
                <button
                    onClick={() => isArtist && onNewBlog()}
                    disabled={!isArtist}
                    title={!isArtist ? "Switch to the Artist role to publish a story" : ""}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${isArtist
                        ? "bg-amber-950 text-amber-50 hover:bg-amber-900"
                        : "cursor-not-allowed bg-amber-200 text-stone-400"
                        }`}
                >
                    New Blog
                </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <button key={post.id} onClick={() => onOpen(post)} className="overflow-hidden rounded-2xl bg-amber-100 text-left shadow-md transition-transform hover:-translate-y-1">
                        <img src={post.img} alt={post.title} className="h-40 w-full object-cover" />
                        <div className="p-5">
                            <div className="flex items-center gap-2">
                                <img src={post.avatarImg || post.img} alt={post.author} className="h-8 w-8 rounded-full object-cover" />
                                <div>
                                    <p className="text-sm font-medium text-stone-900">{post.author}</p>
                                    <p className="text-xs text-stone-400">{post.role}</p>
                                </div>
                            </div>
                            <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-stone-900">{post.title}</h3>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function NewBlogModal({ open, onClose, onPublish }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [expertise, setExpertise] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);

    const reset = () => { setTitle(""); setAuthor(""); setExpertise(""); setBody(""); setError(null); };
    const close = () => { reset(); onClose(); };

    const handlePublish = () => {
        if (!title.trim() || !author.trim() || !body.trim()) {
            setError("Please fill in at least the title, author name, and story.");
            return;
        }
        onPublish({
            id: Date.now(),
            author: author.trim(),
            role: expertise.trim() || "Guest Artisan",
            img: IMG_EMBROIDERY,
            avatarImg: IMG_EMBROIDERY,
            title: title.trim(),
            excerpt: body.trim().slice(0, 120) + (body.trim().length > 120 ? "…" : ""),
            content: body.trim(),
        });
        close();
    };

    return (
        <Modal open={open} onClose={close} maxWidth="max-w-xl">
            <div className="p-8">
                <h2 className="font-serif text-2xl italic font-semibold text-stone-900">Write a New Story</h2>
                <p className="mt-1 text-sm text-stone-500">Share your craft with the Untold Tales community.</p>

                <div className="mt-6 space-y-4">
                    <label className="block">
                        <span className="text-xs font-medium uppercase tracking-wide text-amber-800">Blog Title</span>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. The Thread That Remembers"
                            className="mt-1 w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs font-medium uppercase tracking-wide text-amber-800">Author Name</span>
                        <input
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Your name"
                            className="mt-1 w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs font-medium uppercase tracking-wide text-amber-800">Expertise Subheading</span>
                        <input
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            placeholder="e.g. Block-print Artisan, 8 years"
                            className="mt-1 w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs font-medium uppercase tracking-wide text-amber-800">Blog Body / Story</span>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Tell your story..."
                            rows={6}
                            className="mt-1 w-full resize-none rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
                        />
                    </label>

                    {error && <p className="text-xs text-red-600">{error}</p>}

                    <button
                        onClick={handlePublish}
                        className="w-full rounded-xl bg-amber-800 px-4 py-3 text-sm font-medium text-amber-50 hover:bg-amber-900 transition-colors"
                    >
                        Publish
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function ArtistPage({ onOpen }) {
    return (
        <div className="px-8 py-12">
            <h1 className="font-serif text-4xl italic text-stone-900">Artist Center</h1>
            <p className="mt-2 text-stone-500">Discover artisans across embroidery, handloom, draping and crochet.</p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {ARTISTS.map((a) => (
                    <button key={a.id} onClick={() => onOpen(a)} className="overflow-hidden rounded-2xl bg-amber-100 text-left shadow-md transition-transform hover:-translate-y-1">
                        <img src={a.img} alt={a.name} className="h-56 w-full object-cover" />
                        <div className="p-5">
                            <h3 className="font-serif text-xl font-semibold text-stone-900">{a.name}</h3>
                            <p className="mt-1 flex items-center gap-1 text-sm text-stone-500"><MapPin size={13} /> {a.location}</p>
                            <span className="mt-2 inline-block rounded-full bg-amber-950 px-3 py-1 text-xs text-amber-50">{a.badge}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function ExchangePage({ onOpen }) {
    return (
        <div className="px-8 py-12">
            <h1 className="font-serif text-4xl italic text-stone-900">Exchange Center</h1>
            <p className="mt-2 text-stone-500">Trade fabric offcuts and surplus material with verified retailers.</p>

            <div className="relative mt-8 overflow-hidden rounded-2xl shadow-md">
                <img
                    src={IMG_FABRIC_ROLLS}
                    alt="Stacked fabric rolls"
                    className="h-44 w-full object-cover"
                />
                <span className="absolute bottom-4 right-4 rounded-full bg-amber-950 px-4 py-2 text-xs font-medium text-amber-50">Live material price chart</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {PRICE_CHART.map((e) => {
                    const Icon = TREND_ICON[e.trend];
                    return (
                        <div key={e.material} className="rounded-xl bg-amber-100 p-4 shadow-md">
                            <p className="text-xs text-stone-400">{e.material}</p>
                            <div className="mt-1 flex items-center gap-1">
                                <p className="font-serif text-lg font-semibold text-stone-900">₹{e.price}</p>
                                <Icon size={14} className="text-amber-800" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {RETAILERS.map((r) => (
                    <button key={r.id} onClick={() => onOpen(r)} className="flex items-center gap-4 rounded-2xl bg-amber-100 p-5 text-left shadow-md transition-transform hover:-translate-y-1">
                        <img src={r.img} alt={r.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                        <div>
                            <h3 className="font-serif text-lg font-semibold text-stone-900">{r.name}</h3>
                            <p className="text-sm text-stone-500">{r.location}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function ProfilePage({ orders, onOpenOrder, userRole }) {
    const [form, setForm] = useState({
        username: CURRENT_USER.username,
        phone: CURRENT_USER.phone,
        email: CURRENT_USER.email,
        location: CURRENT_USER.location,
        password: "password123",
    });
    const [saved, setSaved] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const update = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setSaved(false);
    };

    const handleAvatarUpload = (e) => {
        const f = e.target.files?.[0];
        if (f) setAvatar(URL.createObjectURL(f));
    };

    return (
        <div className="px-8 py-12">
            <div className="flex items-center gap-5">
                <label
                    className="group relative h-20 w-20 shrink-0 cursor-pointer rounded-full bg-amber-200 overflow-hidden"
                    title="Upload a profile picture"
                >
                    {avatar ? (
                        <img src={avatar} alt="Your profile" className="h-full w-full object-cover" />
                    ) : (
                        <div className="grid h-full w-full place-items-center transition-colors group-hover:bg-amber-300">
                            <Plus size={24} className="text-amber-800" />
                        </div>
                    )}
                    <div className="absolute inset-0 grid place-items-center bg-stone-900/0 opacity-0 transition-all group-hover:bg-stone-900/30 group-hover:opacity-100">
                        {avatar && <Plus size={20} className="text-white drop-shadow" />}
                    </div>
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
                <div>
                    <h1 className="font-serif text-3xl italic font-semibold text-stone-900">{form.username || "Your name"}</h1>
                    <span className="mt-1 inline-block rounded-full bg-amber-950 px-3 py-1 text-xs text-amber-50">{userRole}</span>
                </div>
            </div>

            <div className="mt-6 rounded-2xl p-6 shadow-md sm:grid sm:grid-cols-2 sm:gap-4" style={{ backgroundColor: "#F5EBDD" }}>
                <EditableField label="Username" value={form.username} onChange={update("username")} />
                <EditableField label="Phone Number" value={form.phone} onChange={update("phone")} />
                <EditableField label="Email ID" value={form.email} onChange={update("email")} type="email" />
                <EditableField label="Location" value={form.location} onChange={update("location")} />
                <EditableField label="Password" value={form.password} onChange={update("password")} type="password" />

                <div className="mt-2 flex items-end sm:col-span-2">
                    <button
                        onClick={() => setSaved(true)}
                        className="rounded-xl px-5 py-2.5 text-sm font-medium text-amber-50 transition-colors"
                        style={{ backgroundColor: "#6B4226" }}
                    >
                        Save changes
                    </button>
                    {saved && <span className="ml-3 text-xs text-emerald-700">Saved for this preview session ✓</span>}
                </div>
            </div>

            <h2 className="mt-10 font-serif text-2xl italic font-semibold text-stone-900">Your Orders</h2>
            <div className="mt-4 space-y-3">
                {orders.map((o) => (
                    <button key={o.id} onClick={() => onOpenOrder(o)} className="flex w-full items-center justify-between rounded-2xl bg-amber-100 px-6 py-4 text-left shadow-md transition-transform hover:-translate-y-0.5">
                        <div>
                            <p className="font-medium text-stone-900">{o.item} — {o.seller}</p>
                            <p className="text-xs text-stone-400">Order #{o.code}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[o.status]}`}>{STATUS_LABELS[o.status]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

function EditableField({ label, value, onChange, type = "text" }) {
    return (
        <label className="mb-3 block sm:mb-4">
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "#6B4226" }}>{label}</span>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm text-stone-800 outline-none transition-colors"
                style={{
                    backgroundColor: "#FBF6EC",
                    borderColor: "#D9C3A3",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6B4226")}
                onBlur={(e) => (e.target.style.borderColor = "#D9C3A3")}
            />
        </label>
    );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */

export default function TheWeaversPreview() {
    const [page, setPage] = useState("home");
    const [orders, setOrders] = useState(INITIAL_ORDERS);
    const [userRole, setUserRole] = useState("Artist"); // toggle to "Customer" to see the New Blog gating

    const [blogPosts, setBlogPosts] = useState(BLOG_POSTS);
    const [blogPost, setBlogPost] = useState(null);
    const [blogOpen, setBlogOpen] = useState(false);
    const [newBlogOpen, setNewBlogOpen] = useState(false);

    const [artist, setArtist] = useState(null);
    const [artistOpen, setArtistOpen] = useState(false);

    const [retailer, setRetailer] = useState(null);
    const [retailerOpen, setRetailerOpen] = useState(false);

    const [order, setOrder] = useState(null);
    const [orderOpen, setOrderOpen] = useState(false);

    const publishBlog = (post) => {
        setBlogPosts((prev) => [post, ...prev]);
    };

    const addOrder = ({ item, seller, request }) => {
        setOrders((prev) => [
            { id: prev.length + 1, code: String(10000 + prev.length * 37), item, seller, request, price: null, status: "pending", estDelivery: "To be confirmed", messages: [] },
            ...prev,
        ]);
    };

    const updateStatus = (id, status) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
        setOrder((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
    };

    return (
        <div className="min-h-screen bg-amber-50">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Kaushan+Script&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-cursive { font-family: 'Kaushan Script', cursive; }
        body, .font-body { font-family: 'Lora', serif; }
      `}</style>

            <Navbar page={page} setPage={setPage} userRole={userRole} setUserRole={setUserRole} />

            {page === "home" && <HomePage />}
            {page === "blog" && (
                <BlogPage
                    posts={blogPosts}
                    onOpen={(p) => { setBlogPost(p); setBlogOpen(true); }}
                    onNewBlog={() => setNewBlogOpen(true)}
                    isArtist={userRole === "Artist"}
                />
            )}
            {page === "artists" && <ArtistPage onOpen={(a) => { setArtist(a); setArtistOpen(true); }} />}
            {page === "exchange" && <ExchangePage onOpen={(r) => { setRetailer(r); setRetailerOpen(true); }} />}
            {page === "profile" && <ProfilePage orders={orders} onOpenOrder={(o) => { setOrder(o); setOrderOpen(true); }} userRole={userRole} />}

            <BlogModal open={blogOpen} onClose={() => setBlogOpen(false)} post={blogPost} />
            <NewBlogModal open={newBlogOpen} onClose={() => setNewBlogOpen(false)} onPublish={publishBlog} />
            <ArtistModal open={artistOpen} onClose={() => setArtistOpen(false)} artist={artist} onOrderCreated={addOrder} />
            <ExchangeModal open={retailerOpen} onClose={() => setRetailerOpen(false)} retailer={retailer} onOrderCreated={addOrder} />
            <OrderDetailsModal open={orderOpen} onClose={() => setOrderOpen(false)} order={order} onStatusChange={updateStatus} />
        </div>
    );
}